import { createSlice } from "@reduxjs/toolkit"; // Import createSlice

// Define the initial state
const initialState = {
  cartItems: localStorage.getItem("carItems")
    ? JSON.parse(localStorage.getItem("carItems"))
    : [], // Ensure cartItems is initialized as an array
};

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState, // Use the correct initialState
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.id === isItemExist.id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Log the item to inspect its structure
      console.log("Received item:", item);

      // Check if the item has a valid structure before adding
      if (item && item.id) {
        // Ensure it's using 'id'
        state.cartItems.push(item);
        console.log("Added to cart:", state.cartItems);
      } else {
        console.error("Invalid item:", item); // Log error if the item is invalid
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      console.log("Updated cartItems after removal:", state.cartItems);
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
