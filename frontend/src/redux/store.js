// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// RTK Query APIs
import { productApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { orderApi } from "./api/orderApi";
import { statsApi } from "./api/statsApi";

// Slices
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ✅ Only auth state persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [statsApi.reducerPath]: statsApi.reducer, // ✅ Add statsApi reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      statsApi.middleware //
    ),
});

export const persistor = persistStore(store);
