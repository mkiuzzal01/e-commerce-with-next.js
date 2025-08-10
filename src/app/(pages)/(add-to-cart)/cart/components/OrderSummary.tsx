/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalShipping } from "@mui/icons-material";
import { Box, Button, CircularProgress, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

type OrderSummaryCardProps = {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  isLoading: boolean;
  handleCheckout: () => void;
  theme: any;
};

export default function OrderSummary({
  subtotal,
  tax,
  shipping,
  total,
  isLoading,
  handleCheckout,
  theme,
}: OrderSummaryCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        position: "sticky",
        top: 200,
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        boxShadow: theme.shadows[4],
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Order Summary
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Subtotal</Typography>
          <Typography fontWeight="medium">৳{subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Tax (8%)</Typography>
          <Typography fontWeight="medium">৳{tax.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Shipping</Typography>
          <Typography fontWeight="medium">
            {shipping === 0 ? "Free" : `৳${shipping.toFixed(2)}`}
          </Typography>
        </Box>

        {shipping === 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 2,
              backgroundColor: "success.50",
              borderRadius: 2,
              border: 1,
              borderColor: "success.200",
            }}
          >
            <LocalShipping color="success" />
            <Typography
              variant="body2"
              color="success.main"
              fontWeight="medium"
            >
              Free shipping on orders over ৳2000
            </Typography>
          </Box>
        )}

        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            ৳{total.toFixed(2)}
          </Typography>
        </Box>
      </Stack>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleCheckout}
        disabled={isLoading || subtotal === 0}
        sx={{
          py: 2,
          borderRadius: 2,
          fontSize: "1.1rem",
          fontWeight: "bold",
          textTransform: "none",
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          "&:hover": {
            background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
          },
          mb: 2,
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            Processing...
          </Box>
        ) : (
          "Proceed to Checkout"
        )}
      </Button>
    </Paper>
  );
}
