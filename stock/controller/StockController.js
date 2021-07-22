import Stock from "../model/StockModel.js";
import StockView from "../view/StockView.js";
import {readFromLS, writeToLS} from "../utilities/ls.js";

const lsStockKey = "stock";
const lsCashKey = "cash";
const lsSpentKey = "spent";
const lsEarnedKey = "earned";

//Stock Controller
export default class StockController {
    constructor(parent, btnDiv, nav, account) {
        this.parent = parent;
        this.btnDiv = btnDiv;
        this.nav = nav;
        this.account = account
        this.navElement = null;
        this.accountElement = null;
        this.pageBtns = null;
        this.parentElement = null;

        this.stock = new Stock();
        this.stockView = new StockView();

        this.numberOfPages = 0;
        this.pageList = [];
        this.currentPage = 1;
        this.numberPerPage = 25;

        this.spent = null;
        this.earned = null;
        this.cash = null;
        this.heldStock = [];



    }

    async init() {
        this.parentElement = document.querySelector(this.parent);
        this.navElement = document.querySelector(this.nav);
        this.accountElement = document.querySelector(this.account);
        this.initAccount();

        this.updateAccountView();

        this.pageBtns = document.querySelector("#pageBtns");

        this.navElement.addEventListener("click", e => {
            if (e.target.tagName.toLowerCase() == "button") {
                if(e.target.id == "buyNav") {
                    this.toggleButtons();                    
                    this.getStockList();
                }
                if(e.target.id == "sellNav") {
                    this.toggleButtons();
                    this.getHeldStockList();
                }
            }
        });

        this.pageBtns.addEventListener("click", e => {
            if (e.target.tagName.toLowerCase() == "button") {
                console.log(e.target.id);
                if(e.target.id == "firstBtn") {
                    this.currentPage = 1;
                } else if (e.target.id == "prevBtn") {
                    this.currentPage -= 1;
                } else if (e.target.id == "nextBtn") {
                    this.currentPage += 1;
                } else if (e.target.id == "lastBtn") {
                    this.currentPage = this.numberOfPages;
                }
                this.getStockList();
            }
        });
        this.getStockList();
    }

    toggleButtons() {
        const buy = document.querySelector("#buyNav");
        const sell = document.querySelector("#sellNav");
        if (buy.classList.contains("active")) {
            buy.classList.remove("active");
            sell.classList.add("active");
        } else {
            sell.classList.remove("active");
            buy.classList.add("active");

        }
    }

    async getStockList () {
        this.parentElement.innerHTML = "Loading...";
        this.parentElement.removeEventListener('click', this.heldStockListClick);
        
        const stockList = await this.stock.getStockList();
        console.log(stockList);
        this.numberOfPages = Math.ceil(stockList.length / this.numberPerPage);
        console.log(this.numberOfPages);
        console.log((this.currentPage)*this.numberPerPage + ", " + (this.currentPage)*this.numberPerPage);
        const pageList = stockList.slice((this.currentPage-1)*this.numberPerPage, (this.currentPage)*this.numberPerPage);
        console.log(pageList);
        this.showButtons();
        // render the list to html
        this.stockView.renderStockList(pageList, this.parentElement);
        this.parentElement.addEventListener('click', this.stockListClick);
    }

    stockListClick = (e) => {
        console.log(e.target.tagName);
        if (e.target.tagName.toLowerCase() == 'li') {     
            console.log(e.target.tagName);
            this.getStockDetails(e.target.dataset.id);
        } else if (e.target.parentElement.tagName.toLowerCase() == 'li') { 
            console.log(e.target.parentElement.tagName);
            console.log(e.target);
            this.getStockDetails(e.target.parentElement.dataset.id);
        }

    }

    async getStockDetails(symbol) {
        console.log("symbol: " + symbol);
        this.hideButtons();
        const stock = await this.stock.getStockDetails(symbol);
        this.stockView.renderStock(stock, this.parentElement);
        const buyForm = document.querySelector("#buyForm");
        buyForm.addEventListener('submit', e => {
            e.preventDefault;

            const numShares = buyForm.getElementsByTagName("input")[0].value;
            console.log("Number of shares to buy: " + numShares );
            this.buyShares(buyForm.dataset.symbol, buyForm.dataset.price, numShares);
        });
        const backButton = document.querySelector('#backBtn');
        backButton.addEventListener('click', e => {
            this.getStockList();
        });
      }

      hideButtons() {
        let buttonList = this.pageBtns.children;
        this.pageBtns.style.visibility = "hidden";
        for(let i=0; i<buttonList.length; i++) {
            buttonList[i].style.visibility = "hidden";
        };

      }

      showButtons() {
        let buttonList = this.pageBtns.children;
        this.pageBtns.style.visibility = "visible";
        for(let i=0; i<buttonList.length; i++) {
            buttonList[i].style.visibility = "visible";
        };
        if(this.currentPage === 1) {
            buttonList[0].style.visibility = "hidden";
            buttonList[1].style.visibility = "hidden";
        }
        if (this.currentPage === this.numberOfPages) {
            buttonList[2].style.visibility = "hidden";
            buttonList[3].style.visibility = "hidden";
        }

      }
    


      saveStock() {
        writeToLS(lsStockKey, this.heldStock);
        writeToLS(lsCashKey, this.cash);
        writeToLS(lsSpentKey, this.spent);
        writeToLS(lsEarnedKey, this.earned);
      }

      buyShares(symbol, purchasePrice, numSharesPurchase) {
        let existingStock = false;
        let cost = purchasePrice * numSharesPurchase;
        for(let i=0; i<this.heldStock.length; i++){
            if(this.heldStock[i].symbol == symbol) {
                existingStock = true;
                this.heldStock[i].numShares += numSharesPurchase;
                this.heldStock[i].totalCost += cost;
                break;
            }
        }
        if (!existingStock) {
            let newStock = {
                symbol: symbol,
                numShares: numSharesPurchase,
                totalCost: cost
            }
            this.heldStock.push(newStock);
        }
        this.spent += cost;
        this.cash -= cost;

        this.toggleButtons();
        this.updateAccountView();
        this.saveStock();
        this.getHeldStockList();
      }

      sellShares (symbol, sellPrice, numSharesSold) {
        console.log(this.heldStock);
        let profit = sellPrice * numSharesSold;
        let existingStock = false;
        for(let i=0; i<this.heldStock.length; i++){
            if(this.heldStock[i].symbol == symbol) {
                existingStock = true;
                if(this.heldStock[i].numShares <= numSharesSold) {
                    numSharesSold = this.heldStock[i].numShares;
                    profit = sellPrice * numSharesSold;
                    this.heldStock.splice(i, 1);
                    console.log("Splice result:" + this.heldStock);
                } else {
                this.heldStock[i].numShares -= numSharesSold;
                this.heldStock[i].totalCost -= profit;
                }
            }
        }

        if (existingStock) {
        this.earned += profit;
        this.cash += profit;
        }
        console.log(this.heldStock);

        this.updateAccountView();
        this.saveStock();
        this.getHeldStockList();
      }

      initAccount() {
        this.heldStock = readFromLS(lsStockKey);
        this.cash = readFromLS(lsCashKey);
        this.spent = readFromLS(lsSpentKey);
        this.earned = readFromLS(lsEarnedKey);
        if (this.heldStock == null) {
            this.heldStock = [];
        }
        if (this.cash === null) {
            this.cash = 10000.00;
        }
        if (this.spent === null) {
            this.spent = 0.00;
        }
        if (this.earned === null) {
            this.earned = 0.00;
        }
      }

      updateAccountView() {
        this.stockView.renderAccount(this.cash, this.earned - this.spent, this.accountElement);
      }

      //Methods For the Sell Portion of the Site
      async getHeldStockList() {
        this.parentElement.innerHTML = "Loading...";
        this.hideButtons();
        this.parentElement.removeEventListener('click', this.stockListClick);
        console.log(this.heldStock);
        let heldStockList = [];
        if (this.heldStock.length > 0) {
        heldStockList = await this.stock.getHeldStockList(this.heldStock);
        }
        console.log(heldStockList);
        // render the list to html
        this.stockView.renderHeldStockList(heldStockList, this.parentElement);
        this.parentElement.addEventListener('click', this.heldStockListClick);

      }

      heldStockListClick = (e) => {
        console.log(this.heldStock);
        if (e.target.tagName.toLowerCase() == 'li') {     
            console.log(e.target.tagName);
            this.getHeldStockDetails(e.target.dataset.id);
        } else if (e.target.parentElement.tagName.toLowerCase() == 'li') { 
            console.log(e.target.parentElement.tagName);
            console.log(e.target);
            this.getHeldStockDetails(e.target.parentElement.dataset.id);
        }

    }

    async getHeldStockDetails(symbol) {
        console.log("symbol: " + symbol);
        this.hideButtons();
        let storedStock = this.heldStock.find(element => element.symbol == symbol);
        console.log(storedStock);
        const stock = await this.stock.getStockDetails(symbol);
        const newPrice = stock[0].price;
        const purchasePrice = storedStock.totalCost / storedStock.numShares;
        const percentDifference = ((newPrice - purchasePrice) / purchasePrice) * 100;
        
        this.stockView.renderHeldStock(symbol, stock[0].name, newPrice, purchasePrice, percentDifference, storedStock.numShares, storedStock.numShares*purchasePrice, storedStock.numShares*newPrice, this.parentElement);
        const sellForm = document.querySelector("#sellForm");
        sellForm.addEventListener('submit', e => {
            e.preventDefault;

            const numShares = sellForm.getElementsByTagName("input")[0].value;
            console.log("Selling: " + sellForm.dataset.symbol + " at " + sellForm.dataset.price);

            console.log("Number of shares to sell: " + numShares );
            this.sellShares(sellForm.dataset.symbol, sellForm.dataset.price, numShares);
        });
        const backButton = document.querySelector('#backBtn');
        backButton.addEventListener('click', e => {
            this.getHeldStockList();
        });
      }

}