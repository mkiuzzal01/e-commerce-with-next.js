"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { X, Minus, Plus } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Men's Premium T-Shirt",
    price: 650,
    quantity: 2,
    image: "/images/products/tshirt.jpg",
  },
  {
    id: "2",
    name: "Women's Denim Jacket",
    price: 1450,
    quantity: 1,
    image: "/images/products/jacket.jpg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

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

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        color="primary"
      >
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography align="center" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{ mb: 3, display: "flex", alignItems: "center", p: 2 }}
                elevation={2}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
                <Box flex={1} ml={3}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography color="text.secondary">
                    ৳{item.price} x {item.quantity}
                  </Typography>

                  <Box display="flex" alignItems="center" mt={1} gap={1}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => decreaseQty(item.id)}
                    >
                      <Minus size={16} />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => increaseQty(item.id)}
                    >
                      <Plus size={16} />
                    </IconButton>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography fontWeight="bold">
                    ৳{item.price * item.quantity}
                  </Typography>
                  <IconButton color="error" onClick={() => removeItem(item.id)}>
                    <X />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Order Summary
                </Typography>
                <Divider />
                <Box display="flex" justifyContent="space-between" my={2}>
                  <Typography>Subtotal</Typography>
                  <Typography fontWeight="bold">৳{subtotal}</Typography>
                </Box>
                <Divider />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
