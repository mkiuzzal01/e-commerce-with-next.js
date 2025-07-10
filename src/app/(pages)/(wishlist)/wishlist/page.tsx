"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Grid,
  Container,
} from "@mui/material";
import { List } from "lucide-react";
import SectionHeader from "@/components/Shared/SectionHeader";
import WishListCard from "@/utils/cards/WishListCard";
import ReusablePagination from "@/components/Shared/ReusablePagination";

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
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = (item: WishlistItem) => {
    // Add-to-cart logic here
    console.log("Added to cart:", item);
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container mx-auto px-4">
        <Box className="py-8">
          <SectionHeader
            icon={<List />}
            title="Your Wishlist"
            description="View, manage, and shop your saved favorites — all in one place."
          />
        </Box>

        <Grid container spacing={4}>
          {wishlist.map((item) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.id}>
              <WishListCard item={item} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
            Product added to cart!
          </Alert>
        </Snackbar>
        <Box textAlign="center" py={4}>
          <ReusablePagination currentPage={1} totalPages={10} />
        </Box>
      </Box>
    </Box>
  );
}
