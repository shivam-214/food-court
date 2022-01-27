import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { sendCartData } from "../../store/cart-actions";

const Cart = (props) => {
  const dispatch = useDispatch();

  const [isCheckOut, setIsCheckOut] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState(null);

  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalAmountRoundTo2digit = totalAmount.toFixed(2);
  const hasItems = items.length > 0;

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

  const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.remove(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.add({ ...item, quantity: 1 }));
  };

  const cartItems = (
    <ul
      style={{ height: isCheckOut ? "0px" : "auto" }}
      className={classes["cart-items"]}
    >
      {items.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const OrderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = (userData) => {
    setGeneratedOrderId(null);

    const recievedOrder = (recievedItemsObject) => {
      setGeneratedOrderId(recievedItemsObject.name);
      dispatch(cartActions.clearCart());
    };

    const newOrder = {
      user: userData,
      orders: items,
      totalAmount: totalAmountRoundTo2digit,
    };

    sendOrderRequest(
      {
        url: "https://react-food-order-17525-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: newOrder,
        headers: {
          "Content-Type": "application.json",
        },
      },
      recievedOrder
    );
  };

  let orderContent = <p></p>;
  if (error) {
    orderContent = (
      <p>There is an error occured while ordering. Please try again later</p>
    );
  }

  const modelActions = (
    <div className={classes.actions}>
      <Button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </Button>
      {hasItems && (
        <Button className={classes.button} onClick={OrderHandler}>
          Order
        </Button>
      )}
    </div>
  );

  const cartModelContent = (
    <React.Fragment>
      {!hasItems && <p>Cart is Empty!</p>}
      {hasItems && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹{totalAmountRoundTo2digit}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modelActions}
      {hasItems && orderContent}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!generatedOrderId && isLoading && (
        <p>Please wait until we are recieving your order...</p>
      )}
      {!generatedOrderId && !isLoading && cartModelContent}
      {generatedOrderId && (
        <div  style={{ display: "flex",flexDirection:"column" }}>
          <p>Ordered Successfull...</p>
          <p>
            Your order Id is "{generatedOrderId}"
          </p>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
