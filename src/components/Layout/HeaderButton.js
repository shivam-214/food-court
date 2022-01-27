import React, { useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";
import Button from "../UI/Button.js";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const HeaderButton = (props) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const btnIsHighlighted = useSelector((state) => state.ui.btnIsHighlighted);

  // const numberOfCartItems = items.reduce((currNumber, item) => {
  //   return currNumber + totalQuantity;
  // }, 0);

  const btnClasses = `${classes.button} && ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    dispatch(uiActions.toggleBtnHighlighted());

    const timer = setTimeout(() => {
      dispatch(uiActions.toggleBtnHighlighted());
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items, dispatch]);

  return (
    <Button className={btnClasses} onClick={props.onClick}>
      <span>
        <CartIcon className={classes.icon} />
      </span>
      <div className={classes.cartText}>
        <span>Your Cart</span>
      </div>
      <span className={classes.badge}>{totalQuantity}</span>
    </Button>
  );
};

export default HeaderButton;
