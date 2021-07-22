import { getJSON } from "../utilities/utilities.js";
import * as ls from "../utilities/ls.js";

const apiKey = "65ddbc072eaceb6beb94be961dac95d1";
const baseURL = "https://financialmodelingprep.com";
const quotePath = "/api/v3/quote/";
const listPath = "/api/v3/available-traded/list";


export default class Stock {
    constructor() {
        this.listURL = baseURL + listPath + "?apikey=" + apiKey;
        this.listRequest = new Request(this.listURL,  {
            method: 'GET',
        });
        this._stockList = [];
    }

    async getStockList() {
        if (this._stockList.length) {
            console.log("Reusing previous stock list")
            console.log(this._stockList);
            return this._stockList;
        }
        this._stockList = await getJSON(this.listURL);
        console.log("Fetching new stock list");
        return this._stockList;
    }

    getStockDetails(symbol) {
        const stockURL = baseURL + quotePath + symbol + "?apikey=" + apiKey;
        const stock = getJSON(stockURL);
        console.log(stock);
        return stock; 
    }

    async getHeldStockList(heldStocks) {
        let stockURL = baseURL + quotePath;
        let stock = null
        if (heldStocks.length <= 1) {
            if(heldStocks.length <= 0) {
                return [];
            }
            stockURL += heldStocks[0].symbol;
        } else {
            for(let i=0; i<heldStocks.length; i++) {
                if (i === heldStocks.length - 1) {
                    stockURL += heldStocks[i].symbol;
                } else {
                    stockURL += heldStocks[i].symbol + ",";
                }
            }
        }
        stockURL += "?apikey=" + apiKey;
        stock = getJSON(stockURL);
        console.log(stock);
        return stock; 
    }


}