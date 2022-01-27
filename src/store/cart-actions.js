import { cartActions } from "./cart-slice";

const FIREBASE_DOMAIN = "https://react-food-order-17525-default-rtdb.firebaseio.com/";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/cart.json`, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Sending Cart data Failed!");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/cart.json`);

      if (!response.ok) {
        throw new Error("Fetching cart data Failed!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchRequest();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
          totalAmount: cartData.totalAmount,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
