import { numbers, operators, input } from "./components";
import { calculate, deleteElement, refreshState } from "./methods";

let state = {
  lastPressedButton: null,
  firstValue: null,
  secondValue: null,
  operator: null
};

// ------------

for (const key in numbers) {
  document.getElementById(key).addEventListener("click", () => {
    const buttonValue = numbers[key].toString();
    console.warn("prev state", state);
    switch (state.lastPressedButton) {
      case null:
      case "dot":
      case "number": {
        const value = input.value + buttonValue;
        input.value = value;
        state.lastPressedButton = state.operator
          ? (state.secondValue = value)
          : (state.firstValue = value);
        break;
      }
      case "operator": {
        input.value = buttonValue;
        if (state.operator) {
          state.secondValue = buttonValue;
        } else {
          state.firstValue = buttonValue;
        }
        break;
      }
      case "equally": {
        input.value = buttonValue;
        state.firstValue = buttonValue;
        // if (state.firstValue && state.operator) {
        //   state.secondValue = state.firstValue;
        //   const calculated = calculate();
        //   input.value = calculated;
        // }
        break;
      }
      default: {
        break;
      }
    }
    state.lastPressedButton = "number";
    console.warn("current state", state);
    console.warn("===================================");
  });
}

for (const key in operators) {
  document.getElementById(key).addEventListener("click", () => {
    console.warn("prev state", state);
    const operator = operators[key].toString();
    // Least number/operator
    switch (state.lastPressedButton) {
      case "dot": {
        input.value = input.value.replace(".", "");
        break;
      }
      case "number": {
        if (state.secondValue) {
          const calculated = calculate(state);
          input.value = calculated;
          state.firstValue = calculated;
          // state.secondValue = null;
        }
        break;
      }
      default: {
        break;
      }
    }
    state.operator = operator;
    state.lastPressedButton = "operator";
    console.warn("current state", state);
    console.warn("===================================");
  });
}

document.getElementById("dot").addEventListener("click", () => {
  console.warn("prev state", state);
  if (!input.value.includes(".")) {
    input.value += ".";
  }
  state.lastPressedButton = "dot";
  console.warn("current state", state);
  console.warn("===================================");
});

document.getElementById("equally").addEventListener("click", () => {
  console.warn("prev state", state);
  if (state.secondValue) {
    const calculated = calculate(state);
    input.value = calculated;
    state.firstValue = calculated;
  } else {
    state.secondValue = state.firstValue;
    const calculated = calculate(state);
    input.value = calculated;
    state.firstValue = calculated;
  }
  state.lastPressedButton = "equally";
  // state.secondValue = null;
  // state.operator = null;
  console.warn("current state", state);
  console.warn("===================================");
});

document.getElementById("clear").addEventListener("click", () => {
  input.value = "";
  state = refreshState();
});

document.getElementById("deleteEl").addEventListener("click", () => {
  input.value = deleteElement(input.value);
  console.warn(input.value);
});
