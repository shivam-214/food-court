import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouch;

  const inputValueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouch(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouch(false);
  };

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    inputValueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
