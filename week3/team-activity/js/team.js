
var input1 = document.getElementById("input1"),
    input2 = document.getElementById("input2"),
    btnSum = document.getElementById("btnSum"),
    btnAdd = document.getElementById("btnAdd"),
    btnSub = document.getElementById("btnSub"),
    btnMult = document.getElementById("btnMult"),
    result = document.getElementById("result");


function sendResults (results) {
    console.log("Sending result: ", results);
    result.innerHTML = results;
}


function sum() {
    var num = parseInt(input1.value);
    console.log("Input is: ", num)
    var sum = 0;
    for (i=num; i > 0; i--) {
        console.log(i);
        sum += i;

    }
    sendResults(sum);
}

function add() {
    var num1 = parseInt(input1.value),
        num2 = parseInt(input2.value);
    sendResults(num1 + num2);
}

var mult = function () {sendResults(input1.value * input2.value)};

btnSum.addEventListener("click", sum);
btnAdd.addEventListener("click", add);
btnSub.addEventListener("click", sub = () => sendResults(input1.value - input2.value));
btnMult.addEventListener("click", mult);

