
var textInput = document.getElementById("textInput"),
    button = document.getElementById("button"),
    result = document.getElementById("result");


function getContents () {
    let contents = textInput.innerHTML;
    result.innerHTML = contents;
}

document.addEventListener(onclick, getContents());