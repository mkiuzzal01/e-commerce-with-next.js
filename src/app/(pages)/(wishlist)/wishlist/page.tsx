"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { ShoppingCart, Trash2, Share2, Eye } from "lucide-react";

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating?: number;
  originalPrice?: number;
};

const initialWishlist: WishlistItem[] = [
  {
    id: "w1",
    name: "Men's Premium Cotton T-Shirt",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    inStock: true,
    rating: 4.5,
    originalPrice: 850,
  },
  {
    id: "w2",
    name: "Women's Denim Jacket",
    price: 1450,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
    category: "Outerwear",
    inStock: true,
    rating: 4.8,
  },
  {
    id: "w3",
    name: "Unisex Sunglasses",
    price: 1250,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Accessories",
    inStock: false,
    rating: 4.3,
    originalPrice: 1450,
  },
  {
    id: "w4",
    name: "Sports Running Shoes",
    price: 1780,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "Footwear",
    inStock: true,
    rating: 4.6,
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleAddToCart = (item: WishlistItem) => {
    setSnackbar({
      open: true,
      message: `${item.name} added to cart!`,
      severity: "success",
    });
  };

  const handleRemove = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    setSnackbar({
      open: true,
      message: "Removed from wishlist",
      severity: "info",
    });
  };

  return (
    <Box className="container m-auto">
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        color="primary"
        textAlign="center"
      >
        My Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography align="center" color="text.secondary">
          Your wishlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {wishlist.map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.id}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image}
                  alt={item.name}
                  sx={{ objectFit: "cover" }}
                />

                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Chip size="small" label={item.category} color="primary" />
                    {!item.inStock && (
                      <Chip size="small" label="Out of Stock" color="warning" />
                    )}
                  </Stack>

                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {item.name}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Typography variant="h6" color="primary">
                      ৳{item.price}
                    </Typography>
                    {item.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ৳{item.originalPrice}
                      </Typography>
                    )}
                  </Stack>

                  {item.rating && (
                    <Rating
                      name="rating"
                      value={item.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                  )}
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!item.inStock}
                    onClick={() => handleAddToCart(item)}
                    startIcon={<ShoppingCart size={16} />}
                  >
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardActions>

                <Box display="flex" justifyContent="space-around" pb={2}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                  <IconButton color="info">
                    <Share2 size={18} />
                  </IconButton>
                  <IconButton color="success">
                    <Eye size={18} />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
