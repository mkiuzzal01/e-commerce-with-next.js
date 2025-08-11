/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCartItem, TProduct } from "@/Types/ProductType";
import { useAppDispatch } from "@/redux/hooks";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slice/cartSlice";

export const useCartOperations = () => {
  const dispatch = useAppDispatch();
  const createCartItemId = (productId: string, variant?: any) => {
    if (variant) {
      return `${productId}-${variant.name}-${variant.attribute.value}`;
    }
    return `${productId}-default-default`;
  };

  const removeItem = (productId: string, variantKey?: string) => {
    dispatch(removeFromCart({ productId, variantKey }));
  };

  const updateQuantity = (
    productId: string,
    newQuantity: number,
    variantKey?: string
  ) => {
    dispatch(
      updateCartItemQuantity({ productId, quantity: newQuantity, variantKey })
    );
  };

  const mergeCartData = (
    cartItems: TCartItem[],
    products: TProduct[],
    selectedItems: Record<string, boolean>
  ) => {
    return cartItems
      .map((cartItem) => {
        const product = products.find((p) => p._id === cartItem.productId);
        if (!product) return null;

        const cartItemId = createCartItemId(
          product._id,
          cartItem.selectedVariant
        );

        return {
          ...product,
          cartItem,
          cartItemId,
          isSelected: selectedItems[cartItemId] || false,
        };
      })
      .filter(Boolean);
  };

  return {
    createCartItemId,
    removeItem,
    updateQuantity,
    mergeCartData,
  };
};
