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
import { productData } from "./NewArrivalsData";
import Image from "next/image";

const categories = ["All", "Women", "Men", "Kids", "Unisex"];

export default function NewArrivals() {
  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All"
      ? productData
      : productData.filter((p) => p.category === selected);

  return (
    <div className="container mx-auto pt-10">
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

            <div className="relative aspect-[3/4] transform transition-transform duration-500 hover:scale-105">
              <Image
                src={product?.image}
                alt={product?.name}
                placeholder="blur"
                className="object-cover"
                fill
              />
            </div>
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
    </div>
  );
}
