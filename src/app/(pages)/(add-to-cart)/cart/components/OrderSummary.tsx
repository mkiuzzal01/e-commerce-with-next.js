import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { ShoppingCart, AlertTriangle } from "lucide-react";

type OrderSummaryProps = {
  subtotal: number;
  total: number;
  totalDiscount: number;
  isLoading: boolean;
  selectedCount: number;
  handleCheckout: () => void;
  validationErrors?: string[];
};

export default function OrderSummary({
  subtotal,
  total,
  totalDiscount,
  isLoading,
  selectedCount,
  handleCheckout,
  validationErrors = [],
}: OrderSummaryProps) {
  const hasErrors = validationErrors.length > 0;
  const isCheckoutDisabled = selectedCount === 0 || hasErrors || isLoading;

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
        position: "sticky",
        top: 20,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <ShoppingCart size={24} />
        <Typography variant="h6" fontWeight="bold">
          Order Summary
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Validation Errors */}
      {hasErrors && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error" icon={<AlertTriangle size={20} />}>
            <Typography variant="body2" fontWeight="bold">
              Please resolve the following issues:
            </Typography>
            <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
              {validationErrors.map((error, index) => (
                <li key={index}>
                  <Typography variant="body2">{error}</Typography>
                </li>
              ))}
            </ul>
          </Alert>
        </Box>
      )}

      {/* Order Details */}
      <Stack spacing={1.5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Items ({selectedCount})</Typography>
          <Typography fontWeight="medium">${subtotal.toFixed(2)}</Typography>
        </Box>

        {totalDiscount > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Discount</Typography>
            <Typography fontWeight="medium" color="success.main">
              - ৳ {totalDiscount.toFixed(2)}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 1 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            ৳ {total.toFixed(2)}
          </Typography>
        </Box>
      </Stack>

      {/* Checkout Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleCheckout}
        disabled={isCheckoutDisabled}
        sx={{
          mt: 3,
          height: 48,
          fontWeight: 600,
          bgcolor: isCheckoutDisabled ? "grey.300" : "primary.main",
          "&:hover": {
            bgcolor: isCheckoutDisabled ? "grey.300" : "primary.dark",
          },
        }}
        startIcon={
          isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <ShoppingCart size={20} />
          )
        }
      >
        {isLoading
          ? "Processing..."
          : selectedCount === 0
          ? "Select Items to Checkout"
          : hasErrors
          ? "Resolve Issues to Continue"
          : `Checkout (${selectedCount} items)`}
      </Button>

      {/* Additional Info */}
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* Delivery Charges */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                • Delivery charges:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • In city : ৳ 70
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Out of city ৳ 120
              </Typography>
            </Box>
          </Grid>

          {/* Service Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                • Customer support available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Fast delivery options
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Quality guaranteed
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
