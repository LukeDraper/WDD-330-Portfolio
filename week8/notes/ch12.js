let canvas = document.getElementById("myCanvas1");
let context = canvas.getContext("2d");

context.strokeStyle = "red";
context.fillStyle = "rgba(0, 0, 255, 0.5)";
context.fillRect(10, 10, 100, 100);   
context.strokeRect(10, 10, 100, 100);

function drawPattern() {
    const canvas = document.getElementById("demo2");
    let context = canvas.getContext("2d");
    context.strokeStyle = "red";
    
    let img = new Image();
    img.src = "pikachu.jpg";
    img.onload = function() { 
        
    let pattern = context.createPattern(img, "repeat"); 
    context.fillStyle = pattern;                        
    context.fillRect(10, 10, 100, 100);                  
    context.strokeRect(10, 10, 100, 100);    
    };            
}
drawPattern();

function drawGradient() {
    const canvas = document.getElementById("demo3");
    const context = canvas.getContext("2d");
    context.strokeStyle = "red";
    let gradient = context.createLinearGradient(0, 0, 0, 200); 
    gradient.addColorStop(0, "blue"); 
    gradient.addColorStop(1, "white"); 
    context.fillStyle = gradient; 
    context.fillRect(10, 10, 100, 100); 
    context.strokeRect(10, 10, 100, 100); 
}

drawGradient();


canvas = document.getElementById("myCanvas2");

function drawCircle(canvas) {
    var context = canvas.getContext("2d");
    context.beginPath();
    context.arc(50, 50, 30, 0, Math.PI*2, true);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "blue";
    context.lineWidth = 3;
    context.fill(); 
    context.stroke(); 
}

drawCircle(canvas);

let canvas5 = document.getElementById("demo5");
drawCircle(canvas5);

function saveDrawing() {
    let canvas5 = document.getElementById("demo5");
    window.open(canvas5.toDataURL("image/png"));
}

function drawImageToCanvas() {
    var canvas = document.getElementById("demo6");
    var context = canvas.getContext("2d");
    var image = document.getElementById("myImageElem");
    context.drawImage(image, 0, 0); 
    
    var imageData = context.getImageData(0, 0, 1, 1);
    var pixelData = imageData.data;
    console.log(imageData);
    console.log(pixelData.length);
}

let button = document.getElementById("saveButton");
button.addEventListener("click", saveDrawing, false);

window.addEventListener("load", drawImageToCanvas, false);

function manipulateImage() {
    var canvas = document.getElementById("demo7");
    var context = canvas.getContext("2d");
    var image = document.getElementById("secondImage");
    context.drawImage(image, 60, 60);
    var imageData = context.getImageData(0, 0, 200, 200);
    
    for (var i = 0; i < imageData.data.length; i += 4) {
    var red = imageData.data[i];
    var green = imageData.data[i + 1];
    var blue = imageData.data[i + 2];
        
    var grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
        
    imageData.data[i] = grayscale;
    imageData.data[i + 1] = grayscale;
    imageData.data[i + 2] = grayscale;
    } 
    context.putImageData(imageData, 0, 0);
}

manipulateImage();


var mice = document.querySelectorAll("#mouseContainer img");
console.log(mice)
var mouse = null;
for (var i=0; i < mice.length; i++) {
    mouse = mice[i];
    mouse.addEventListener('dragstart', function (event) {
    // handle the dragstart event
        event.dataTransfer.setData("text/plain", this.id);
        console.log(event);
    });

}

var cat = document.getElementById("cat");
cat.addEventListener("dragover", function(event) {
    event.preventDefault();
});

cat.addEventListener("drop", function(event) {
    var mouseHash = {
    mouse1: 'NOMNOMNOM',
    mouse2: 'Meow',
    mouse3: 'Purrrrrr ...'
    };
    var catHeading = document.getElementById('catHeading');
    console.log(event);
    var mouseID = event.originalEvent.dataTransfer.getData("text/plain");
    catHeading.innerHTML = mouseHash[mouseID];
    var mousey = document.getElementById(item);
    mousey.parentNode.removeChild(mousey);
    event.preventDefault();
    });


