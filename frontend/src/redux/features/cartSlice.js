import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        // ✅ Increase quantity by the amount passed in action
        existingItem.quantity = item.quantity;
      } else {
        // ✅ Add new item if not already in cart
        state.cartItems.push({ ...item });
      }

      // ✅ Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // removeFromCart: (state, action) => {
    //   state.cartItems = state.cartItems.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    // },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
