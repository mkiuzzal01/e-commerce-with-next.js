import { useMemo } from "react";
import { TCartItem, TProduct } from "@/Types/ProductType";

export type TOrderSummary = {
  subtotal: number;
  total: number;
  totalDiscount: number;
  selectedCount: number;
  items: Array<{
    price: number;
    discount?: number;
    quantity: number;
    finalPrice: number;
    discountAmount: number;
  }>;
};

export const useOrderSummary = (
  mergedCartData: Array<
    {
      cartItem: TCartItem;
      isSelected: boolean;
      price: number;
      discount?: number;
    } & TProduct
  >
) => {
  return useMemo(() => {
    const selectedProducts = mergedCartData.filter((item) => item.isSelected);

    const items = selectedProducts.map((item) => {
      const quantity = item.cartItem.selectedVariant?.attribute.quantity || 1;
      const discountValue = item.discount || 0;
      const price = Number(item.price);

      // Calculate discount (moved from useDiscount hook)
      let discountAmount = 0;
      let finalPrice = price;

      if (discountValue > 0 && discountValue < 100) {
        // Percentage discount
        discountAmount = (price * discountValue) / 100;
        finalPrice = price - discountAmount;
      } else if (discountValue >= 100) {
        // Fixed amount discount
        discountAmount = discountValue;
        finalPrice = price - discountValue;
      }

      return {
        price,
        discount: item.discount,
        quantity,
        finalPrice: finalPrice > 0 ? finalPrice : 0,
        discountAmount,
      };
    });

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalDiscount = items.reduce(
      (sum, item) => sum + item.discountAmount * item.quantity,
      0
    );
    const total = subtotal - totalDiscount;
    const selectedCount = selectedProducts.length;

    return { subtotal, total, totalDiscount, selectedCount, items };
  }, [mergedCartData]);
};
