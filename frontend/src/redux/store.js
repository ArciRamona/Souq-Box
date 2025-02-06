import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer, // Add product API reducer
    [authApi.reducerPath]: authApi.reducer, // Add auth API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, authApi.middleware), // Corrected middleware
});
