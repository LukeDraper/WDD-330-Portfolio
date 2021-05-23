import HikesController from "./HikesController.js";

const controller = new HikesController("hikes");
window.addEventListener("load", function (){
    controller.showHikeList();
    controller.addHikeListener();
});