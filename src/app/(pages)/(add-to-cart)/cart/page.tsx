/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  LocalShipping,
  Security,
} from "@mui/icons-material";
import SectionHeader from "@/components/Shared/SectionHeader";
import { ShoppingCart } from "lucide-react";
import ReusablePagination from "@/components/Shared/ReusablePagination";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  size?: string;
  color?: string;
};

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Men's Premium Cotton T-Shirt",
    price: 650,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    size: "L",
    color: "Navy Blue",
  },
  {
    id: "2",
    name: "Women's Denim Jacket",
    price: 1450,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
    category: "Outerwear",
    size: "M",
    color: "Light Blue",
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    price: 2250,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    color: "Brown",
  },
];

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 2000 ? 0 : 100;
  const total = subtotal + tax + shipping;

  const increaseQty = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Proceeding to checkout...");
    }, 1500);
  };

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
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              {cartItems.length === 0 ? (
                <EmptyCartMessage />
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
          </Grid>

          {/* Order Summary Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <OrderSummaryCard
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              isLoading={isLoading}
              handleCheckout={handleCheckout}
              theme={theme}
            />
          </Grid>
        </Grid>
        <Box>
          <ReusablePagination currentPage={0} totalPages={10} />
        </Box>
      </Box>
    </Box>
  );
};

// Sub-components for better organization

const EmptyCartMessage = () => (
  <Paper
    sx={{
      p: 4,
      textAlign: "center",
      borderRadius: 3,
      backgroundColor: "background.paper",
    }}
  >
    <Typography variant="h6" gutterBottom>
      Your cart is empty
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      Start shopping to add items to your cart
    </Typography>
    <Button
      variant="contained"
      color="primary"
      href="/products"
      sx={{ borderRadius: 2 }}
    >
      Browse Products
    </Button>
  </Paper>
);

type CartItemCardProps = {
  item: CartItem;
  isMobile: boolean;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  theme: any;
};

const CartItemCard = ({
  item,
  isMobile,
  increaseQty,
  decreaseQty,
  removeItem,
  theme,
}: CartItemCardProps) => (
  <Box>
    <Card
      sx={{
        borderRadius: 3,
        overflow: "visible",
        position: "relative",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[8],
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 3,
          }}
        >
          {/* Product Image */}
          <Box sx={{ position: "relative", minWidth: isMobile ? "100%" : 160 }}>
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              sx={{
                width: "100%",
                height: isMobile ? 200 : 160,
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
            <IconButton
              onClick={() => removeItem(item.id)}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "error.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "error.dark",
                },
                width: 32,
                height: 32,
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "flex-start",
                gap: 2,
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                <Chip
                  label={item.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  {item.size && (
                    <Chip
                      label={`Size: ${item.size}`}
                      size="small"
                      variant="filled"
                      sx={{ backgroundColor: "grey.100" }}
                    />
                  )}
                  {item.color && (
                    <Chip
                      label={`Color: ${item.color}`}
                      size="small"
                      variant="filled"
                      sx={{ backgroundColor: "grey.100" }}
                    />
                  )}
                </Stack>
              </Box>

              <Box sx={{ textAlign: isMobile ? "left" : "right" }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  ৳{item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  per item
                </Typography>
              </Box>
            </Box>

            {/* Quantity Controls */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={() => decreaseQty(item.id)}
                  disabled={item.quantity <= 1}
                  color="primary"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    "&:disabled": { backgroundColor: "grey.300" },
                  }}
                >
                  <Remove />
                </IconButton>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ minWidth: 40, textAlign: "center" }}
                >
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => increaseQty(item.id)}
                  color="primary"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <Add />
                </IconButton>
              </Box>

              <Box sx={{ textAlign: isMobile ? "center" : "right" }}>
                <Typography variant="h5" fontWeight="bold" color="secondary">
                  ৳{(item.price * item.quantity).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  total
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

type OrderSummaryCardProps = {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  isLoading: boolean;
  handleCheckout: () => void;
  theme: any;
};

const OrderSummaryCard = ({
  subtotal,
  tax,
  shipping,
  total,
  isLoading,
  handleCheckout,
  theme,
}: OrderSummaryCardProps) => (
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
          <Typography variant="body2" color="success.main" fontWeight="medium">
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

export default ShoppingCartPage;
