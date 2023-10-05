/**
 * Author: Álvaro Fonseca Hernández
 * GitHub: Enlace proyecto de GitHub
 */

let outputPrev = document.getElementById("outputPrev");
let output = document.getElementById("output");
let performedOperation = false;

//Divide by one element you have introduced, show the result in the output and add it to the history
const oneByX = () => {
  const currentValue = outputPrev.textContent;
  if (currentValue === "") {
    currentValue = "";
  } else {
    deleteOutput();
    //outputPrev.textContent = "1/" + parseFloat(currentValue);
    //appendToOutput("1/" + parseFloat(currentValue));
    const result = 1 / parseFloat(currentValue);
    if (result < 1) {
      output.textContent = result.toFixed(10);
    } else {
      output.textContent = result;
    }
    addToHistory();
    updateResult(result);
  }
  performedOperation = true;
};

//Divide the element you have introduced by a hundered, preparing it to make percents
const percentage = () => {
  const currentValue = outputPrev.textContent;
  if (currentValue === "") {
    currentValue = "";
  } else {
    deleteOutput();
    appendToOutput(parseFloat(currentValue) + "/100");
    const result = parseFloat(currentValue) / 100;
    if (result < 1) {
      output.textContent = result.toFixed(10);
    } else {
      output.textContent = result;
    }
    addToHistory();
    updateResult(result);
  }
  performedOperation = true;
};

//Do the square of the number you have introduced, show the result in the output and add it to the history
const square = () => {
  const currentValue = outputPrev.textContent;
  if (currentValue === "") {
    currentValue = "";
  } else {
    appendToOutput("^2");
    const result = parseFloat(currentValue) * parseFloat(currentValue);
    if (result < 1) {
      output.textContent = result.toFixed(10);
    } else {
      output.textContent = result;
    }
    addToHistory();
    updateResult(result);
  }
  performedOperation = true;
}

//Do the square root of the number you have introduced
const squareRoot = () => {
  const currentValue = outputPrev.textContent;
  if (currentValue === "") {
    currentValue = "";
  } else {
    deleteOutput();
    appendToOutput("sqrt(" + parseFloat(currentValue) + ")");
    const result = Math.sqrt(parseFloat(currentValue));
    if (result < 1) {
      output.textContent = result.toFixed(10);
    } else {
      output.textContent = result;
    }

    addToHistory();
    updateResult(result);
  }
  performedOperation = true;
};

//Convert pi to a number
const pi = () => {
  deleteOutput();
  appendToOutput(Math.PI);
  performedOperation = true;
};

//Append to output the values you have entered
const appendToOutput = (value) => {
  if (performedOperation) {
    if (
      value == "1" ||
      value == "2" ||
      value == "3" ||
      value == "4" ||
      value == "5" ||
      value == "6" ||
      value == "7" ||
      value == "8" ||
      value == "9"
    ) {
      performedOperation = false;
      
      outputPrev.textContent = "";
      if (value === "x") {
        outputPrev.textContent += "*";
      } else {
        outputPrev.textContent += value;
      }
    } else {
      performedOperation = false;
      outputPrev.textContent = output.textContent;
      if (value === "x") {
        outputPrev.textContent += "*";
      } else {
        outputPrev.textContent += value;
      }
    }
  } else {
    if (value === "x") {
      outputPrev.textContent += "*";
    } else {
      outputPrev.textContent += value;
    }
  }
};

//Toggle the sign of the output
const toggleSign = () => {
  const result = document.getElementById("outputPrev").textContent;
  if (result[0] === "-") {
    document.getElementById("outputPrev").textContent = result.slice(1);
  } else {
    document.getElementById("outputPrev").textContent = "-" + result;
  }
};

//Delete everything in the output
const deleteOutput = () => {
  outputPrev.textContent = "";
  output.textContent = "0";
};

//Delete the last element in the output
const deleteLast = () => {
  const prevTrim = outputPrev.textContent.trim();
  const prevFix = prevTrim.slice(0, -1);
  outputPrev.textContent = prevFix;
};

//Add the value you have introduced to the history
const addToHistory = () => {
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
};

//Delete all the elements in the history
const deleteHist = () => {
  const list = document.getElementById("operationHist");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
};

//update the result in the output when the operation is done
const updateResult = (result) => {
  outputPrev.textContent = result;
  //output.textContent = "";
};

//calculate the result of the operation you have in the output
const calculate = () => {
  const outputValue = outputPrev.textContent;
  const result = eval(outputValue);
  output.textContent = result;
  addToHistory();
  //updateResult(result);
  performedOperation = true;
};

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
