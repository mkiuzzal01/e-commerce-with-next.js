import { useMemo } from "react";

export function useDiscount(price: number | string, discount: number | string) {
  return useMemo(() => {
    const p = Number(price);
    const d = Number(discount);

    if (!p || d <= 0) {
      return {
        originalPrice: p,
        finalPrice: p,
        discountAmount: 0,
        isDiscounted: false,
      };
    }

    let finalPrice = p;
    let discountAmount = 0;

    // Percentage discount
    if (d > 0 && d < 100) {
      discountAmount = (p * d) / 100;
      finalPrice = p - discountAmount;
    }
    // Fixed amount discount
    else if (d >= 100) {
      discountAmount = d;
      finalPrice = p - d;
    }

    return {
      originalPrice: p,
      finalPrice: finalPrice > 0 ? finalPrice : 0,
      discountAmount,
      isDiscounted: finalPrice < p,
    };
  }, [price, discount]);
}
