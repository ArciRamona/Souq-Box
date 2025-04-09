import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        state.cartItems.push({ ...item });
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state, action) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },

    // clearCart: (state) => {
    //   state.cartItems = [];
    // },

    loadCart: (state, action) => {
      state.cartItems = action.payload;
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;

      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  loadCart,
  saveShippingInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
