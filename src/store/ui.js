import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  isShowCart: false,
  btnIsHighlighted: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggleBtnHighlighted(state) {
      state.btnIsHighlighted = !state.btnIsHighlighted;
    },
    showCart(state) {
      state.isShowCart = true;
    },
    closeCart(state) {
      state.isShowCart = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
