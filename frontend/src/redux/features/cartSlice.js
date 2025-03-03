import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [], // Ensure cartItems is initialized as an array
};

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState, // Use the correct initialState
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        // ✅ Increase quantity by the selected amount, not just 1
        existingItem.quantity += item.quantity;
      } else {
        // ✅ Add new item with the specified quantity
        state.cartItems.push({ ...item });
      }

      // ✅ Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      console.log("Updated Cart Items:", state.cartItems);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);

      // ✅ Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      console.log("Updated cartItems after removal:", state.cartItems);
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
