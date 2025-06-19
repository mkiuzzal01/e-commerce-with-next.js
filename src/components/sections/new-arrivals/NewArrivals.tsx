"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";

const productData = [
  {
    id: 1,
    name: "Linen Summer Dress",
    image: "/products/summer-dress.jpg",
    price: 1450,
    category: "Women",
  },
  {
    id: 2,
    name: "Men's Polo T-Shirt",
    image: "/products/polo.jpg",
    price: 990,
    category: "Men",
  },
  {
    id: 3,
    name: "Girls Denim Jacket",
    image: "/products/girls-jacket.jpg",
    price: 1190,
    category: "Kids",
  },
  {
    id: 4,
    name: "Unisex Hoodie",
    image: "/products/unisex-hoodie.jpg",
    price: 1750,
    category: "Unisex",
  },
];

const categories = ["All", "Women", "Men", "Kids", "Unisex"];

export default function NewArrivals() {
  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All"
      ? productData
      : productData.filter((p) => p.category === selected);

  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🆕 New Arrivals
      </Typography>

      <Tabs
        value={selected}
        onChange={(_, newVal) => setSelected(newVal)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{ mb: 3 }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} value={cat} />
        ))}
      </Tabs>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        flexWrap="wrap"
      >
        {filtered.map((product) => (
          <Card
            key={product.id}
            sx={{
              minWidth: 250,
              maxWidth: 320,
              flex: 1,
              position: "relative",
              borderRadius: 3,
              boxShadow: 4,
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <Chip
              label="Just In"
              color="success"
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 1,
                fontWeight: 600,
              }}
            />
            <CardMedia
              component="img"
              height="220"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {product.name}
              </Typography>
              <Typography fontWeight="medium" color="primary">
                ৳{product.price}
              </Typography>
              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCart size={18} />}
                  fullWidth
                >
                  Add to Cart
                </Button>   
                <Button
                  variant="text"
                  color="error"
                  sx={{ minWidth: 40, p: 1 }}
                >
                  <Heart size={20} />
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
