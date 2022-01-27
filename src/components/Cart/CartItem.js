import React from "react";
import Button from "../UI/Button";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `₹${props.item.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.item.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <Button onClick={props.onRemove}>-</Button>
        <Button onClick={props.onAdd}>+</Button>
      </div>
    </li>
  );
};

export default CartItem;
