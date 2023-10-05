/**
 * Author: Álvaro Fonseca Hernández
 * GitHub: Enlace proyecto de GitHub
 */

let outputPrev = document.getElementById("outputPrev");
let output = document.getElementById("output");

//Divide by one element you have introduced, show the result in the output and add it to the history
function oneByX() {
  const currentValue = outputPrev.textContent;
  if (currentValue === "") {
    currentValue = "";
  } else {
    deleteOutput();
    appendToOutput("1/" + parseFloat(currentValue));
    const result = 1 / parseFloat(currentValue);
    output.textContent = result.toFixed(10);
    addToHistory();
    updateResult(result);
  }
}

//Divide the element you have introduced by a hundered, preparing it to make percents
function percentage() {
  const currentValue = outputPrev.textContent;
  if (currentValue === "") {
    currentValue = "";
  } else {
    deleteOutput();
    appendToOutput(parseFloat(currentValue) + "/100");
    const result = parseFloat(currentValue) / 100;
    output.textContent = result.toFixed(10);
    addToHistory();
    updateResult(result);
  }
}

//Do the square of the number you have introduced, show the result in the output and add it to the history
function square() {
  const currentValue = outputPrev.textContent;
  if (currentValue === "") {
    currentValue = "";
  } else {
    appendToOutput("^2");
    const result = parseFloat(currentValue) * parseFloat(currentValue);
    output.textContent = result;
    addToHistory();
    updateResult(result);
  }
}

//Do the square root of the number you have introduced
function squareRoot() {
  const currentValue = outputPrev.textContent;
  if (currentValue === "") {
    currentValue = "";
  } else {
    deleteOutput();
    appendToOutput("sqrt(" + parseFloat(currentValue) + ")");
    const result = Math.sqrt(parseFloat(currentValue));
    output.textContent = result.toFixed(10);
    addToHistory();
    updateResult(result);
  }
}

//Convert pi to a number
function pi() {
  appendToOutput(Math.PI);
}

//Append to output the values you have entered
function appendToOutput(value) {
  if (value === "x") {
    outputPrev.textContent += "*";
  } else {
    outputPrev.textContent += value;
  }
}

//Toggle the sign of the output
function toggleSign() {
  const result = document.getElementById("outputPrev").textContent;
  if (result[0] === "-") {
    document.getElementById("outputPrev").textContent = result.slice(1);
  } else {
    document.getElementById("outputPrev").textContent = "-" + result;
  }
}

//Delete everything in the output
function deleteOutput() {
  outputPrev.textContent = "";
  output.textContent = "0";
}

//Delete the last element in the output
function deleteLast() {
  const prevTrim = outputPrev.textContent.trim();
  const prevFix = prevTrim.slice(0, -1);
  outputPrev.textContent = prevFix;
}

//Add the value you have introduced to the history
function addToHistory() {
  const hist = document.getElementById("operationHist");
  const elementHist = document.createElement("li");
  const op = outputPrev.textContent;
  const res = output.textContent;
  if (op !== "") {
    elementHist.innerHTML = `
      <div>
        <span>${op} = </span>
        <br> 
        <span>${res}</span>
      </div>
    `;
    if (hist.children.length >= 5) {
      hist.removeChild(hist.firstChild);
    }
    hist.appendChild(elementHist);
  }
}

//Delete all the elements in the history
function deleteHist() {
  const list = document.getElementById("operationHist");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

//update the result in the output when the operation is done
function updateResult(result) {
  outputPrev.textContent = result;
  //output.textContent = "";
}

//calculate the result of the operation you have in the output
function calculate() {
  const outputValue = outputPrev.textContent;
  const result = eval(outputValue);
  output.textContent = result;
  addToHistory();
  updateResult(result);
}

//Allows you to use the numpad and keyboard to interact with the calculator
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "1":
      appendToOutput("1");
      break;
    case "2":
      appendToOutput("2");
      break;
    case "3":
      appendToOutput("3");
      break;
    case "4":
      appendToOutput("4");
      break;
    case "5":
      appendToOutput("5");
      break;
    case "6":
      appendToOutput("6");
      break;
    case "7":
      appendToOutput("7");
      break;
    case "8":
      appendToOutput("8");
      break;
    case "9":
      appendToOutput("9");
      break;
    case "0":
      appendToOutput("0");
      break;
    case "+":
      appendToOutput(" + ");
      break;
    case "-":
      appendToOutput(" - ");
      break;
    case "*":
      appendToOutput(" * ");
      break;
    case "/":
      appendToOutput(" / ");
      break;
    case "Enter":
      calculate();
      break;
    case "Backspace":
      deleteLast();
      break;
  }
});
