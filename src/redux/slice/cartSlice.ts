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

      // Create a unique identifier for the cart item
      const itemKey = selectedVariant
        ? `${productId}-${selectedVariant.name}-${selectedVariant.attribute.value}`
        : productId;

      // Find existing item with same productId and variant combination
      const existingItemIndex = state.items.findIndex((item) => {
        const existingKey = item.selectedVariant
          ? `${item.productId}-${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`
          : item.productId;
        return existingKey === itemKey;
      });

      if (existingItemIndex !== -1) {
        // Update quantity for existing item
        const existingItem = state.items[existingItemIndex];
        if (existingItem.selectedVariant && selectedVariant) {
          existingItem.selectedVariant.attribute.quantity +=
            selectedVariant.attribute.quantity;
        }
      } else {
        // Add new item to cart
        state.items.push(action.payload);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        variantKey?: string; // Format: "variantName-colorValue"
      }>
    ) => {
      const { productId, variantKey } = action.payload;

      state.items = state.items.filter((item) => {
        if (item.productId !== productId) return true;

        if (variantKey && item.selectedVariant) {
          const itemVariantKey = `${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`;
          return itemVariantKey !== variantKey;
        }

        // If no variantKey provided, remove all items with this productId
        return variantKey !== undefined;
      });
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        variantKey?: string; // Format: "variantName-colorValue"
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

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
