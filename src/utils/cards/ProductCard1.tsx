/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const ProductCard1: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "var(--color-brand-background)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
        },
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
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            p: 2,
          }}
        >
          <Link href={`/men/${product?.id}`}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{
                color: "var(--color-brand-heading)",
                lineHeight: 1.3,
                mb: 0.5,
                ":hover":"blue"
              }}
              noWrap
            >
              {product?.name}
            </Typography>
          </Link>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              fontWeight="bold"
              sx={{ color: "var(--color-brand-heading)" }}
            >
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

          <Stack direction="row" spacing={1} mt={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ShoppingCart size={18} />}
              sx={{
                color: "white",
                borderColor: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(4px)",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              variant="contained"
              className="btn-primary"
              sx={{
                whiteSpace: "nowrap",
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1.5,
              }}
            >
              Buy Now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard1;
