import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./features/userSlice";
import { productApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

// Redux Persist Configuration
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth", "user"], // Persist only auth state
};

// Persist user authentication state
const persistedAuthReducer = persistReducer(persistConfig, userReducer);

// Combine reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }).concat(productApi.middleware, authApi.middleware, userApi.middleware),
});

// Persistor to manage state persistence
export const persistor = persistStore(store);
