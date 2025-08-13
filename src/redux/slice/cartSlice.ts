import { TCartItem } from "@/Types/ProductType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: TCartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const { productId, selectedVariant } = action.payload;

      const itemKey = selectedVariant
        ? `${productId}-${selectedVariant.name}-${selectedVariant.attribute.value}`
        : productId;

      const existingItemIndex = state.items.findIndex((item) => {
        const existingKey = item.selectedVariant
          ? `${item.productId}-${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`
          : item.productId;
        return existingKey === itemKey;
      });

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.selectedVariant && selectedVariant) {
          existingItem.selectedVariant.attribute.quantity +=
            selectedVariant.attribute.quantity;
        }
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        variantKey?: string;
      }>
    ) => {
      const { productId, variantKey } = action.payload;

      state.items = state.items.filter((item) => {
        if (item.productId !== productId) return true;

        if (variantKey && item.selectedVariant) {
          const itemVariantKey = `${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`;
          return itemVariantKey !== variantKey;
        }
        return variantKey !== undefined;
      });
    },

    removeMultipleFromCart: (
      state,
      action: PayloadAction<{ productId: string; variantKey?: string }[]>
    ) => {
      state.items = state.items.filter((item) => {
        const itemVariantKey = item.selectedVariant
          ? `${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`
          : undefined;
        return !action.payload.some(
          (p) =>
            p.productId === item.productId && p.variantKey === itemVariantKey
        );
      });
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        variantKey?: string;
      }>
    ) => {
      const { productId, quantity, variantKey } = action.payload;

      const item = state.items.find((item) => {
        if (item.productId !== productId) return false;

        if (variantKey && item.selectedVariant) {
          const itemVariantKey = `${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`;
          return itemVariantKey === variantKey;
        }

        return !variantKey && !item.selectedVariant;
      });

      if (item && item.selectedVariant) {
        item.selectedVariant.attribute.quantity = Math.max(1, quantity);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeMultipleFromCart,
  updateCartItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
