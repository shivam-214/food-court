import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.changed = true;
    },

    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },

    add(state, action) {
      state.changed = true;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.quantity,
        };

        state.items[existingCartItemIndex] = updatedItem;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity+=action.payload.quantity;
      state.totalAmount += action.payload.price * action.payload.quantity;
    },

    remove(state, action) {
      state.changed = true;
      const existingItemIndex = state.items.findIndex((item) => {
        return item.id === action.payload;
      });

      const existingItem = state.items[existingItemIndex];

      if (existingItem.quantity > 1) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        state.items[existingItemIndex] = updatedItem;
      } else {
        state.items.splice(existingItemIndex, 1);
      }
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
