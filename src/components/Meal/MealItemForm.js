import React, { useState, useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";

const MealItemForm = (props) => {
  const [isQuantityValid, setIsQuantityValid] = useState(true);

  const quantityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredQuantity = quantityInputRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;

    if (
      enteredQuantity.trim().length === 0 ||
      enteredQuantityNumber < 1 ||
      enteredQuantityNumber > 5
    ) {
      setIsQuantityValid(false);
      return;
    }

    props.onAddToCart(enteredQuantityNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button type="submit">+Add</Button>
      {!isQuantityValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  );
};

export default MealItemForm;
