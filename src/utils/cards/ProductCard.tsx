/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export type TProduct = {
  id?: string;
  name: string;
  image?: any;
  price: number;
  originalPrice: number;
};

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: 3,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <Box className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          placeholder="blur"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="600" noWrap>
            {product.name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight="bold" sx={{ color: "white" }}>
              ৳{product.price.toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              ৳{product.originalPrice.toLocaleString()}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} mt={1}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<ShoppingCart size={18} />}
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",
                borderColor: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ whiteSpace: "nowrap" }}
            >
              Buy Now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
