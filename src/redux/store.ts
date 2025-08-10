import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import selectedIdReducer from "./slice/selectedIdSlice";
import wishlistReducer from "./slice/wishlistSlice";
import cartReducer from "./slice/cartSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configs for each reducer
const authPersistConfig = {
  key: "auth",
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

// Wrap reducers with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    selectedId: selectedIdReducer,
    wishlist: persistedWishlistReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NEXT_MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
