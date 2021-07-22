//Stock view handler
export default class StockView {
    
    renderStockList(stockList, listElement) {
        listElement.innerHTML = "";
        stockList.forEach(stock => {
            const li = document.createElement('li')
            const symbol = document.createElement('h3');
            const name = document.createElement('h4');
            const price = document.createElement('p');
            const exchange = document.createElement('p');
            symbol.textContent = stock.symbol;
            name.textContent = stock.name;
            price.textContent = stock.price;
            price.classList.add("price");
            exchange.textContent = stock.exchange;
            li.setAttribute('data-id', stock.symbol);
            li.appendChild(symbol);
            li.appendChild(name);
            li.appendChild(price);
            li.appendChild(exchange);
            listElement.appendChild(li); 
        });
    }

    renderStock(stockArray, element) {
        element.innerHTML = "";
        const stock = stockArray[0];
        const li = document.createElement('li')
        const symbol = document.createElement('h3');
        const name = document.createElement('h4');
        const price = document.createElement('h5');
        const time = document.createElement('p');
        const date = new Date(stock.timestamp * 1000);

        symbol.textContent = stock.symbol;
        name.textContent = "Company Name: " + stock.name;
        price.textContent = "Share Price: $" + stock.price;
        price.classList.add("price");
        time.textContent = "Current Time: " +(date.getMonth()+1)+
                                        "/"+date.getDate()+
                                        "/"+date.getFullYear()+
                                        " "+date.getHours()+
                                        ":"+date.getMinutes()+
                                        ":"+date.getSeconds();
        li.setAttribute('data-id', stock.symbol);
        li.appendChild(symbol);
        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(time);
        li.appendChild(this.createPurchaseForm(stock.symbol, stock.price));
        element.appendChild(li); 
        const backButton = document.createElement('button')
        backButton.id = "backBtn";
        backButton.innerText = "Back to Stock List"
        element.appendChild(backButton);
      }

    createPurchaseForm(symbol, price) {
        const form = document.createElement('form');
        const numLabel = document.createElement('label');
        const numInput = document.createElement('input');
        const submit = document.createElement('input');
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Buy Shares");
        numInput.setAttribute("type", "number");
        numInput.setAttribute("id", "numShares");
        numInput.setAttribute("step", "0.5");
        numInput.setAttribute("min", "0.0");
        numInput.required = true;
        numLabel.setAttribute("for", "numShares");
        numLabel.innerHTML = "Number of Shares to Buy: ";
        form.setAttribute("id", "buyForm");
        form.setAttribute('data-symbol', symbol);
        form.setAttribute('data-price', price);
        form.appendChild(numLabel);
        form.appendChild(numInput);
        form.appendChild(submit);
        return form;
    }

    createSellForm(symbol, price, numShares) {
        const form = document.createElement('form');
        const numLabel = document.createElement('label');
        const numInput = document.createElement('input');
        const submit = document.createElement('input');
        submit.setAttribute("type", "submit");
        submit.setAttribute("value", "Sell Shares");
        numInput.setAttribute("type", "number");
        numInput.setAttribute("id", "numShares");
        numInput.setAttribute("step", "0.5");
        numInput.setAttribute("max", numShares);
        numInput.setAttribute("min", "0.0");
        numInput.required = true;
        numLabel.setAttribute("for", "numShares");
        numLabel.innerHTML = "Number of Shares to Sell: ";
        form.setAttribute("id", "sellForm");
        form.setAttribute('data-symbol', symbol);
        form.setAttribute('data-price', price);
        form.appendChild(numLabel);
        form.appendChild(numInput);
        form.appendChild(submit);
        return form;

    }

    renderAccount(cash, profit, element) {
        element.innerHTML = "";
        const h2 = document.createElement('h2')
        h2.innerHTML = "Account:";
        const cashElement = document.createElement('p')
        const profitElement = document.createElement('p');
        if (cash >= 0){
            cashElement.innerHTML = "Cash: $" + Math.abs(cash).toFixed(2);
        } else {
            cashElement.innerHTML = "Cash: -$" + Math.abs(cash).toFixed(2);
            cashElement.classList.add("negative");
        }
        if (profit >= 0){
            profitElement.innerHTML = "Profit: $" + Math.abs(profit).toFixed(2);
        } else {
            profitElement.innerHTML = "Profit: -$" + Math.abs(profit).toFixed(2);
            cashElement.classList.add("negative");
        }
        element.appendChild(h2);
        element.appendChild(cashElement);
        element.appendChild(profitElement);

    }

    renderHeldStockList(heldStockList, listElement) {
        listElement.innerHTML = "";
        if(heldStockList.length === 0) {
            const p = document.createElement('p');
            p.innerHTML = "You have no stocks. Go buy some.";
            listElement.appendChild(p);
            return;
        }
        heldStockList.forEach(stock => {
            const li = document.createElement('li')
            const symbol = document.createElement('h3');
            const name = document.createElement('h4');
            const price = document.createElement('p');
            symbol.textContent = stock.symbol;
            name.textContent = stock.name;
            price.textContent = stock.price;
            price.classList.add("price");
            li.setAttribute('data-id', stock.symbol);
            li.appendChild(symbol);
            li.appendChild(name);
            li.appendChild(price);
            listElement.appendChild(li); 
        });
    }

    renderHeldStock(symbol, companyName, newPrice, purchasePrice, percentDifference, numShares, totalCost, totalProfit, element) {
        element.innerHTML = "";
        const li = document.createElement('li')
        const symbolEl = document.createElement('h3');
        const nameEl = document.createElement('h4');
        const priceEl = document.createElement('h5');
        const oldPriceEl = document.createElement('h5');
        const percentEl = document.createElement('p');
        const numEl = document.createElement('p');
        if (percentDifference < 0) {
            percentEl.classList.add("negative");
        }
        percentEl.textContent = "Percent Difference: " + percentDifference +"%";
        symbolEl.textContent = symbol;
        nameEl.textContent = "Company Name: " + companyName;
        priceEl.textContent = "Sell Price Per Share: $" + newPrice;
        priceEl.classList.add("price");
        oldPriceEl.textContent = "Cost Per Owned Share: $" + purchasePrice;
        oldPriceEl.classList.add("price");
        const costEl = document.createElement('p');
        const profitEl = document.createElement('p');
        costEl.textContent = "Total Cost of Shares: $" + totalCost;
        profitEl.textContent = "Total Sell Price of Shares: $" + totalProfit;
        numEl.textContent = "Total Shares Owned: " + numShares;

        li.setAttribute('data-id', symbol);
        li.appendChild(symbolEl);
        li.appendChild(nameEl);
        li.appendChild(priceEl);
        li.appendChild(oldPriceEl);
        li.appendChild(percentEl);
        li.appendChild(costEl);
        li.appendChild(profitEl);
        li.appendChild(numEl);
        li.appendChild(this.createSellForm(symbol, newPrice, numShares));
        element.appendChild(li); 
        const backButton = document.createElement('button')
        backButton.id = "backBtn";
        backButton.innerText = "Back to Stock List"
        element.appendChild(backButton);
        console.log(element);

    }
}