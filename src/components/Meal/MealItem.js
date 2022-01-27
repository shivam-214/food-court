import React, { useEffect } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { sendCartData } from "../../store/cart-actions";

const MealItem = (props) => {
  const dispatch = useDispatch();

  const price = props.meal.price.toFixed(2);
  const cart = useSelector((state) => state.cart);

  useEffect(()=>{
    dispatch(sendCartData(cart));
  },[dispatch,cart]);

  const addToCartHandler = (quantity) => {
    dispatch(
      cartActions.add({
        id: props.meal.id,
        name: props.meal.name,
        quantity: quantity,
        price: props.meal.price,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>₹{price}</div>
      </div>

      <div>
        <MealItemForm meal={props.meal} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
