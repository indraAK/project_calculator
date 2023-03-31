const numberKeys = document.querySelectorAll(".key--number");
const operatorKeys = document.querySelectorAll(".key--operator");
const display = document.querySelector(".display");
const clearBtn = document.querySelector("#clear");
const preview = document.querySelector(".preview");
const equalBtn = document.querySelector("#equal");
const resetBtn = document.querySelector("#reset");
const comaBtn = document.querySelector("#coma");
const toggleMinusBtn = document.querySelector("#minus");
const percentBtn = document.querySelector("#percent");

const SYMBOLS_OPERATOR = {
  add: "&plus;",
  subtract: "&minus;",
  multiply: "&times;",
  divide: "&divide",
};

let firstOperand = 0;
let secondOperand = null;
let selectedOperator = null;
let result = null;
let temp = null;

const CALC = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

resetBtn.addEventListener("click", handleReset);
clearBtn.addEventListener("click", () => (display.value = 0));
equalBtn.addEventListener("click", performMathOperation);

numberKeys.forEach((keyBtn) => {
  keyBtn.addEventListener("click", handleNumberClick);
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", handleOperatorClick);
});

comaBtn.addEventListener("click", () => {
  display.value.includes(".") ? display.value : (display.value += ".");
});

toggleMinusBtn.addEventListener("click", () => {
  if (display.value !== "0") {
    display.value = -display.value;
  }
});

percentBtn.addEventListener("click", () => {
  if (!display.value.includes("%")) {
    display.value += "%";
  } else {
    display.value = display.value.replace("%", "");
  }
});

function handleNumberClick() {
  if (!result) {
    if (display.value === "0" && !selectedOperator) {
      display.value = this.value;
    } else if (selectedOperator) {
      if (!secondOperand) {
        secondOperand = this.value;
        display.value = secondOperand;
      } else {
        display.value === "0"
          ? (display.value = this.value)
          : (display.value += this.value);
      }
    } else {
      display.value += this.value;
    }
  } else {
    display.value = this.value;
    result = null;
  }
}

function handleOperatorClick() {
  if (!selectedOperator) {
    selectedOperator = this.value;
    firstOperand = display.value.includes("%")
      ? parseFloat(display.value.replace("%", "")) / 100
      : parseFloat(display.value);
    temp = firstOperand;
    display.value = temp;
    preview.innerHTML = `${firstOperand} ${SYMBOLS_OPERATOR[selectedOperator]}`;
    preview.hidden = false;
    result = null;
  }
}

function performMathOperation() {
  if (!selectedOperator && display.value.includes("%")) {
    result = parseFloat(display.value.replace("%", "")) / 100;
    display.value = result;
    firstOperand = result;
  }

  if (selectedOperator) {
    secondOperand = display.value.includes("%")
      ? parseFloat(display.value.replace("%", "")) / 100
      : parseFloat(display.value);
    result = CALC[selectedOperator](firstOperand, secondOperand || temp);
    display.value = result;
    firstOperand = result;
    preview.innerHTML = "";
    preview.hidden = true;
    secondOperand = null;
    selectedOperator = null;
  }
}

function handleReset() {
  firstOperand = 0;
  secondOperand = null;
  selectedOperator = null;
  temp = null;
  result = null;
  display.value = 0;
  preview.innerHTML = "";
  preview.hidden = true;
}
