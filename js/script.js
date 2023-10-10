/**
 * @author Álvaro Fonseca Hernández
 * @GitHub https://github.com/AF0ns3ca/calculadoraAvanzada3.0.git
 */

let outputPrev = document.getElementById("outputPrev");
let output = document.getElementById("output");
let performedOperation = false;

//Returns true if the value is empty or is not a number
const emptyValue = (value) => {
  if (value === "") {
    return true;
  } else return false;
};

//If value's length is greater than 10, it will be fixed to 10
const fixDecimal = (value) => {
  if (value.toString().length > 10) {
    return value.toFixed(10);
  } else return value;
};

//Divide by one element you have introduced, show the result in the output and add it to the history
const oneByX = () => {
  //if the element shown in output is not 0, outputPrev changes to the value shown in output to do the operation square in teh new value
  if (output.textContent !== "0" && performedOperation) {
    outputPrev.textContent = output.textContent;
  }
  const currentValue = outputPrev.textContent;
  if (!emptyValue(currentValue)) {
    deleteOutput();
    appendToOutput("1/" + currentValue);
    const result = 1 / parseFloat(currentValue);
    output.textContent = fixDecimal(result);
    addToHistory();
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
    output.textContent = fixDecimal(result);
    addToHistory();
  }
  performedOperation = true;
};

//Do the square of the number you have introduced, show the result in the output and add it to the history
const square = () => {
  //if the element shown in output is not 0, outputPrev changes to the value shown in output to do the operation square in teh new value
  if (performedOperation) {
    outputPrev.textContent = output.textContent;
  }
  const currentValue = outputPrev.textContent;
  if (!emptyValue(currentValue)) {
    appendToOutput("²");
    console.log(currentValue);
    const result = parseFloat(currentValue) ** 2;
    output.textContent = fixDecimal(result);
    addToHistory();
  }
  performedOperation = true;
};

//Do the square root of the number you have introduced
const squareRoot = () => {
  //if the element shown in output is not 0, outputPrev changes to the value shown in output to do the operation square in teh new value
  if (output.textContent !== "0" && performedOperation) {
    outputPrev.textContent = output.textContent;
  }
  const currentValue = outputPrev.textContent;
  if (!emptyValue(currentValue)) {
    /*outputPrev.textContent = ""
    appendToOutput("√" + currentValue);*/
    outputPrev.textContent = "√" + currentValue;
    console.log(currentValue);
    const result = Math.sqrt(parseFloat(currentValue));
    output.textContent = fixDecimal(result);
    addToHistory();
  }
  performedOperation = true;
};

//Convert pi to a number
const pi = () => {
  appendToOutput(Math.PI);
  output.textContent = Math.PI;
  performedOperation = true;
};

//Append to output the values you have entered
const appendToOutput = (value) => {
  //If you introduce a number after an operation is made the output goes empty and a new operation can be performed
  if (performedOperation) {
    //parse the value which is introduced and use it for the condition
    if (parseInt(value) >= 1 && parseInt(value) <= 9) {
      //The flag turns false and a new operation can be made with the new input
      performedOperation = false;
      outputPrev.textContent = "";
      outputPrev.textContent += value;
    } else {
      performedOperation = false;
      outputPrev.textContent = output.textContent;
      outputPrev.textContent += value;
    }
  } else {
    outputPrev.textContent += value;
  }
};

//Toggle the sign of the output
const changeSign = () => {
  if (outputPrev.textContent.length !== 0) {
    if (!performedOperation) {
      const result = outputPrev.textContent;
      if (result[0] === "-") {
        outputPrev.textContent = result.slice(1);
      } else {
        outputPrev.textContent = "-" + result;
      }
    } else {
      const result = output.textContent;
      if (result[0] === "-") {
        output.textContent = result.slice(1);
      } else {
        output.textContent = "-" + result;
      }
    }
  }
};

//Delete everything in the output
const deleteOutput = () => {
  outputPrev.textContent = "";
  output.textContent = "0";
  performedOperation = false;
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
        <span>→ ${op} = ${res}</span>
        <br> 
        <br> 
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
const updateResult = () => {
  outputPrev.textContent = result;
  //output.textContent = "";
};

//calculate the result of the operation you have in the output
const calculate = () => {
  const outputValue = outputPrev.textContent;
  console.log(outputValue);
  const result = eval(outputValue);
  console.log(eval(outputValue));
  output.textContent = fixDecimal(result);
  addToHistory();
  //updateResult(result);
  performedOperation = true;
};

//When the icon hist is clicked, it will show the history or it will hide it
const hideHist = () => {
  const hist = document.getElementById("hist");
  const btnhist = document.getElementById("btnHist");
  if (hist.style.visibility === "hidden") {
    btnhist.style.visibility = "visible";
    hist.style.visibility = "visible";
  } else {
    btnhist.style.visibility = "hidden";
    hist.style.visibility = "hidden";
  }
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
