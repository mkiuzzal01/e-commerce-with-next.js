/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import SectionHeader from "@/components/Shared/SectionHeader";
import { ShoppingCart } from "lucide-react";
import ReusablePagination from "@/components/Shared/ReusablePagination";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/Types/ProductType";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import Loader from "@/utils/Loader";
import { useState } from "react";
import CartItemCard from "@/utils/cards/CartItemCard";
import OrderSummary from "./OrderSummary";
import { useCart } from "@/lib/useCart";

export default function Cart() {
  const [page, setPage] = useState(1);
  const cartItems = useAppSelector((state) => state.cart.items);
  const productIds = cartItems.map((item) => item.productId);
  const { data, isLoading: isProduct } = useAllProductByKeyWordQuery({
    queryParams: { page, limit: 12 },
    headerParams: { params: { _id: { $in: productIds } } },
  });

  const products: TProduct[] = data?.data?.result || [];
  const totalPages = data?.data?.meta?.totalPages || 1;

  const {
    isLoading,
    userComing,
    mergedCartData,
    orderSummary,
    validation,
    handleSelectItem,
    handleSelectAll,
    handleRemoveItem,
    handleQuantityUpdate,
    handleCheckout,
  } = useCart(cartItems, products);

  if (isProduct || userComing) return <Loader />;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
        py: 4,
        minHeight: "100vh",
      }}
    >
      <Box className="container m-auto p-4">
        {/* Header */}
        <Box sx={{ py: 4 }}>
          <SectionHeader
            title="Your Shopping Cart"
            icon={<ShoppingCart size={32} />}
            description="Review and manage your items before checkout"
          />
        </Box>

        {/* Validation Errors */}
        {!validation.isValid && validation.errors.length > 0 && (
          <Box sx={{ mb: 3 }}>
            {validation.errors.map((error, index) => (
              <Alert key={index} severity="warning" sx={{ mb: 1 }}>
                {error}
              </Alert>
            ))}
          </Box>
        )}

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {mergedCartData.length > 0 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        mergedCartData.length > 0 &&
                        mergedCartData.every((item) => item?.isSelected)
                      }
                      indeterminate={
                        mergedCartData.some((item) => item?.isSelected) &&
                        !mergedCartData.every((item) => item?.isSelected)
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  }
                  label={`Select all items (${mergedCartData.length})`}
                />
              )}

              <Stack spacing={3}>
                {mergedCartData.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 6,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                  >
                    <ShoppingCart
                      size={48}
                      style={{ marginBottom: 16, opacity: 0.5 }}
                    />
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      gutterBottom
                    >
                      Your cart is empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Add some products to get started
                    </Typography>
                  </Box>
                ) : (
                  mergedCartData.map((item: any) => {
                    if (!item) return null;

                    const maxAvailable = item.selectedVariant
                      ? item.variants
                          ?.find(
                            (v: any) => v?.name === item.selectedVariant?.name
                          )
                          ?.attributes.find(
                            (attr: any) =>
                              attr?.value ===
                              item?.selectedVariant?.attribute.value
                          )?.quantity || 0
                      : item?.totalQuantity;

                    return (
                      <CartItemCard
                        key={item.cartItemId}
                        id={item.cartItemId}
                        viewLink={`/${item?.categories?.mainCategory?.name}/${item?.slug}`}
                        title={item?.title}
                        image={item?.productImage?.photo?.url}
                        price={item?.price}
                        discount={item?.discount}
                        variant={item?.selectedVariant}
                        onRemove={handleRemoveItem}
                        isSelected={item?.isSelected}
                        onSelect={handleSelectItem}
                        onQuantityUpdate={handleQuantityUpdate}
                        maxAvailable={maxAvailable}
                        currentQuantity={
                          item.selectedVariant?.attribute?.quantity || 1
                        }
                      />
                    );
                  })
                )}
              </Stack>
            </Stack>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <OrderSummary
              subtotal={orderSummary.subtotal}
              total={orderSummary.total}
              totalDiscount={orderSummary.totalDiscount}
              isLoading={isLoading}
              selectedCount={orderSummary.selectedCount}
              handleCheckout={handleCheckout}
              validationErrors={validation.errors}
            />
          </Grid>
        </Grid>

        {totalPages > 1 && (
          <Box textAlign="center" mt={4}>
            <ReusablePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
