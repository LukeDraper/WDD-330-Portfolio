import StockController from "./controller/StockController.js";
const stockController = new StockController("#stockList","#pageBtns", "#nav", "#account-info");
stockController.init();
