import { TWishlistItem } from "@/Types/ProductType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistState = {
  items: TWishlistItem[];
};

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<TWishlistItem>) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
