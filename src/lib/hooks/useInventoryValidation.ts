import { TCartItem, TProduct } from "@/Types/ProductType";
import { useMemo } from "react";

export type TValidationResult = {
  isValid: boolean;
  errors: string[];
  invalidItems: string[];
  updatedItems: Array<{
    productId: string;
    variantKey?: string;
    newQuantity: number;
  }>;
};

export const useCartValidation = (
  cartItems: TCartItem[],
  products: TProduct[]
) => {
  return useMemo(() => {
    const result: TValidationResult = {
      isValid: true,
      errors: [],
      invalidItems: [],
      updatedItems: [],
    };

    cartItems.forEach((cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      if (!product) {
        result.errors.push(`Product not found: ${cartItem.productId}`);
        result.invalidItems.push(cartItem.productId);
        result.isValid = false;
        return;
      }

      // Check product status
      if (product.status !== "in-stock") {
        result.errors.push(`${product.title} is no longer in stock`);
        result.invalidItems.push(cartItem.productId);
        result.isValid = false;
        return;
      }

      // Handle variant validation
      if (cartItem.selectedVariant) {
        const variant = product.variants?.find(
          (v) => v.name === cartItem.selectedVariant?.name
        );

        if (!variant) {
          result.errors.push(
            `${product.title} variant "${cartItem.selectedVariant.name}" is no longer available`
          );
          result.invalidItems.push(cartItem.productId);
          result.isValid = false;
          return;
        }

        const attribute = variant.attributes.find(
          (attr) => attr.value === cartItem.selectedVariant?.attribute.value
        );

        if (!attribute) {
          result.errors.push(
            `${product.title} color "${cartItem.selectedVariant.attribute.value}" is no longer available`
          );
          result.invalidItems.push(cartItem.productId);
          result.isValid = false;
          return;
        }

        const requestedQuantity = cartItem.selectedVariant.attribute.quantity;
        const availableQuantity = attribute.quantity;

        if (requestedQuantity > availableQuantity) {
          if (availableQuantity === 0) {
            result.errors.push(
              `${product.title} (${cartItem.selectedVariant.name}, ${cartItem.selectedVariant.attribute.value}) is out of stock`
            );
            result.invalidItems.push(cartItem.productId);
            result.isValid = false;
          } else {
            result.errors.push(
              `${product.title} quantity reduced to ${availableQuantity} (was ${requestedQuantity})`
            );
            result.updatedItems.push({
              productId: product._id,
              variantKey: `${cartItem.selectedVariant.name}-${cartItem.selectedVariant.attribute.value}`,
              newQuantity: availableQuantity,
            });
          }
        }
      } else {
        // Non-variant product validation
        const requestedQuantity = 1; // Default quantity for non-variant items
        const availableQuantity = product.totalQuantity;

        if (requestedQuantity > availableQuantity) {
          if (availableQuantity === 0) {
            result.errors.push(`${product.title} is out of stock`);
            result.invalidItems.push(cartItem.productId);
            result.isValid = false;
          } else {
            result.errors.push(
              `${product.title} quantity reduced to ${availableQuantity}`
            );
            result.updatedItems.push({
              productId: product._id,
              newQuantity: availableQuantity,
            });
          }
        }
      }
    });

    return result;
  }, [cartItems, products]);
};
