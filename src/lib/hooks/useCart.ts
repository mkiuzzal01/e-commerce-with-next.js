/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  removeFromCart,
  removeMultipleFromCart,
  updateCartItemQuantity,
} from "@/redux/slice/cartSlice";
import { TCartItem, TProduct } from "@/Types/ProductType";
import { useOrderSummary } from "./useOrderSummary";
import { useSelectionManagement } from "./useSelectionManagement";
import { useCartValidation } from "./useInventoryValidation";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import { useCreateOrderMutation } from "@/redux/features/order/order.Api";
import { useUser } from "./useUser";
import { usePathname, useRouter } from "next/navigation";

export const useCart = (cartItems: TCartItem[], products: TProduct[]) => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const { userInfo, userComing } = useUser();
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  /** Create unique ID for cart item */
  const createCartItemId = (productId: string, variant?: any) =>
    variant
      ? `${productId}-${variant.name}-${variant.attribute.value}`
      : `${productId}-default-default`;

  /** Merge cart state with product data */
  const mergeCartData = (
    cartItems: TCartItem[],
    products: TProduct[],
    selectedItems: Record<string, boolean>
  ) =>
    cartItems
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

  /** Selection management */
  const {
    selectedItems,
    handleSelectItem,
    handleSelectAll: baseSelectAll,
  } = useSelectionManagement();

  const handleSelectAll = (selectAll: boolean) =>
    baseSelectAll(mergeCartData(cartItems, products, selectedItems), selectAll);

  /** Cart validation */
  const validation = useCartValidation(cartItems, products);

  /** Merged cart data memoized */
  const mergedCartData = useMemo(
    () => mergeCartData(cartItems, products, selectedItems),
    [cartItems, products, selectedItems]
  );

  /** Order summary */
  const orderSummary = useOrderSummary(mergedCartData);

  /** Remove an item from cart */
  const handleRemoveItem = (cartItemId: string) => {
    const item = mergedCartData.find((i) => i.cartItemId === cartItemId);
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

    handleSelectItem(cartItemId, false);

    showToast({ message: "Item removed from cart", type: "warning" });
  };

  /** Update cart item quantity */
  const handleQuantityUpdate = (
    cartItemId: string,
    newQuantity: number,
    maxAvailable: number
  ) => {
    const item = mergedCartData.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    if (newQuantity > maxAvailable) {
      return showToast({
        message: `Maximum ${maxAvailable} items available`,
        type: "error",
      });
    }

    if (newQuantity < 1) {
      return handleRemoveItem(cartItemId);
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

  /** Handle checkout */
  const handleCheckout = async () => {
    // Ensure address exists
    if (!userInfo) {
      showToast({ message: "Please login to checkout", type: "error" });
      return router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
    if (!userInfo?.address?.permanentAddress) {
      showToast({ message: "Please add your profile address", type: "error" });
      return router.replace(
        `/update-profile?redirect=${encodeURIComponent(pathname)}`
      );
    }

    // Validate cart
    if (!validation.isValid) {
      validation.errors.forEach((error) =>
        showToast({ message: error, type: "error" })
      );
      return;
    }

    // Ensure at least one selected item
    if (orderSummary.selectedCount === 0) {
      return showToast({
        message: "Please select items to checkout",
        type: "error",
      });
    }

    const selectedProducts = mergedCartData.filter((item) => item.isSelected);

    const orderData = {
      orderItems: selectedProducts.map((item) => ({
        productId: item._id,
        size: item.selectedVariant?.name,
        color: item.selectedVariant?.attribute?.value,
        quantity: item.selectedVariant?.attribute.quantity || 1,
      })),
      totalPrice: orderSummary.total,
      customerId: userInfo?._id,
      deliveryAddress: userInfo.address,
    };

    const { data } = await createOrder(orderData);
    if (data?.success) {
      showToast({
        message: "Order placed successfully",
        type: "success",
        duration: 3000,
      });
      dispatch(
        removeMultipleFromCart(
          selectedProducts.map((item) => ({
            productId: item._id,
            variantKey: item.selectedVariant
              ? `${item.selectedVariant.name}-${item.selectedVariant.attribute.value}`
              : undefined,
          }))
        )
      );

      router.push("/track-order");
    } else {
      showToast({
        message: "Failed to place order",
        type: "error",
      });
    }
  };

  return {
    mergedCartData,
    selectedItems,
    orderSummary,
    validation,
    isLoading,
    userComing,
    handleSelectItem,
    handleSelectAll,
    handleRemoveItem,
    handleQuantityUpdate,
    handleCheckout,
  };
};
