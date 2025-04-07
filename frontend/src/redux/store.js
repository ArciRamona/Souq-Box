// import authReducer from "./authSlice.js";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// import authReducer from "./features/authSlice"; // this should contain token, user, loading, isAuthenticated
// import cartReducer from "./features/cartSlice"; //Import cart reducer

// import { productApi } from "./api/productsApi";
// import { authApi } from "./api/authApi";
// import { userApi } from "./api/userApi";
// import { orderApi } from "./api/orderApi";

// // Redux Persist Configuration
// const persistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ["auth"], // ✅ Only 'auth' should be persisted // Persist only auth state
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(persistConfig, authReducer), // ✅ wrap only auth
//   cart: cartReducer,
//   [productApi.reducerPath]: productApi.reducer,
//   [authApi.reducerPath]: authApi.reducer,
//   [userApi.reducerPath]: userApi.reducer,
//   [orderApi.reducerPath]: orderApi.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // ✅ important for Redux Persist // Required for Redux Persist
//     }).concat(
//       productApi.middleware,
//       authApi.middleware,
//       userApi.middleware,
//       orderApi.middleware
//     ),
// });
// // Persistor to manage state persistence
// export const persistor = persistStore(store);

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Your slices
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";

// RTK Query APIs
import { productApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { orderApi } from "./api/orderApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ✅ only auth
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
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
      orderApi.middleware
    ),
});

export const persistor = persistStore(store);
