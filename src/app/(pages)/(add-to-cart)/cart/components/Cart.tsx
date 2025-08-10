"use client";
import { Box, Grid } from "@mui/material";
import SectionHeader from "@/components/Shared/SectionHeader";
import { ShoppingCart } from "lucide-react";
import ReusablePagination from "@/components/Shared/ReusablePagination";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TCartItem } from "@/Types/ProductType";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems: TCartItem[] = useAppSelector((state) => state.cart.items);

  console.log(cartItems);
  
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
        py: 4,
        minHeight: "100vh",
      }}
    >
      <Box className="container m-auto p-4">
        {/* Header Section */}
        <Box sx={{ py: 4 }}>
          <SectionHeader
            title="Your Shopping Cart"
            icon={<ShoppingCart size={32} />}
            description="Review and manage your items before checkout"
          />
        </Box>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Cart Items Column */}
          {/* <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              {cartItems.length === 0 ? (
               <Typography>
                Not found any items
               </Typography>
              ) : (
                cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    isMobile={isMobile}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    removeItem={removeItem}
                    theme={theme}
                  />
                ))
              )}
            </Stack>
          </Grid> */}

          {/* Order Summary Column */}
          {/* <Grid size={{ xs: 12, md: 4 }}>
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              isLoading={isLoading}
              handleCheckout={handleCheckout}
              theme={theme}
            />
          </Grid> */}
        </Grid>
        <Box>
          <ReusablePagination currentPage={0} totalPages={10} />
        </Box>
      </Box>
    </Box>
  );
}
