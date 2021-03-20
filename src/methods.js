export function calculate(state) {
  const { firstValue, operator, secondValue } = state;
  return eval(`${firstValue}${operator}${secondValue}`);
}
export function refreshState() {
  return {
    firstValue: null,
    secondValue: null,
    operator: null,
    lastPressedButton: null
  };
}
export function deleteElement(value) {
  return value.slice(0, -1);
}
