/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slice/cartSlice";
import { TCartItem, TProduct } from "@/Types/ProductType";
import { useOrderSummary } from "./useOrderSummary";
import { useSelectionManagement } from "./useSelectionManagement";
import { useCartValidation } from "./useInventoryValidation";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import { useCreateOrderMutation } from "@/redux/features/order/order.Api";

export const useCart = (cartItems: TCartItem[], products: TProduct[]) => {
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  // Create cart item ID
  const createCartItemId = (productId: string, variant?: any) => {
    if (variant) {
      return `${productId}-${variant.name}-${variant.attribute.value}`;
    }
    return `${productId}-default-default`;
  };

  // Merge cart data with product info
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
          selectedVariant: cartItem.selectedVariant,
        };
      })
      .filter(Boolean) as Array<
      TProduct & {
        cartItem: TCartItem;
        cartItemId: string;
        isSelected: boolean;
        selectedVariant?: TCartItem["selectedVariant"];
      }
    >;
  };

  // Selection management
  const {
    selectedItems,
    handleSelectItem,
    handleSelectAll: baseHandleSelectAll,
  } = useSelectionManagement();

  const handleSelectAll = (selectAll: boolean) => {
    baseHandleSelectAll(
      mergeCartData(cartItems, products, selectedItems),
      selectAll
    );
  };

  // Cart validation
  const validation = useCartValidation(cartItems, products);

  // Order summary
  const mergedCartData = useMemo(
    () => mergeCartData(cartItems, products, selectedItems),
    [cartItems, products, selectedItems]
  );

  const orderSummary = useOrderSummary(mergedCartData);

  // Remove item from cart
  const handleRemoveItem = (cartItemId: string) => {
    const item = mergedCartData.find((item) => item.cartItemId === cartItemId);
    if (!item) return;

    const variantKey = item.selectedVariant
      ? `${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`
      : undefined;

    dispatch(
      removeFromCart({
        productId: item._id,
        variantKey,
      })
    );

    // Remove from selected items
    const newSelectedItems = { ...selectedItems };
    delete newSelectedItems[cartItemId];
    handleSelectItem(cartItemId, false);

    showToast({
      message: "Item removed from cart",
      type: "warning",
    });
  };

  // Update item quantity
  const handleQuantityUpdate = (
    cartItemId: string,
    newQuantity: number,
    maxAvailable: number
  ) => {
    const item = mergedCartData.find((item) => item.cartItemId === cartItemId);
    if (!item) return;

    if (newQuantity > maxAvailable) {
      showToast({
        message: `Maximum ${maxAvailable} items available`,
        type: "error",
      });
      return;
    }

    if (newQuantity < 1) {
      handleRemoveItem(cartItemId);
      return;
    }

    const variantKey = item.selectedVariant
      ? `${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`
      : undefined;

    dispatch(
      updateCartItemQuantity({
        productId: item._id,
        quantity: newQuantity,
        variantKey,
      })
    );
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!validation.isValid) {
      validation.errors.forEach((error) => {
        showToast({ message: error, type: "error" });
      });
      return;
    }

    if (orderSummary.selectedCount === 0) {
      showToast({ message: "Please select items to checkout", type: "error" });
      return;
    }

    const selectedProducts = mergedCartData.filter((item) => item.isSelected);
    const orderData = {
      ...selectedProducts.map((item) => ({
        productId: item._id,
        size: item.selectedVariant?.name,
        color: item.selectedVariant?.attribute?.value,
        quantity: item.selectedVariant?.attribute.quantity || 1,
      })),
      totalPrice: orderSummary.total,
    };

    console.log("Proceeding to checkout with:", orderData);
    showToast({
      message: "Proceeding to checkout...",
      type: "success",
    });

    return orderData;
  };

  return {
    mergedCartData,
    selectedItems,
    orderSummary,
    validation,
    handleSelectItem,
    handleSelectAll,
    handleRemoveItem,
    handleQuantityUpdate,
    handleCheckout,
  };
};
