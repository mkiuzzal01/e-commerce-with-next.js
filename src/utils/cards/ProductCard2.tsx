/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Box, Button, Card, Rating, Stack, Typography } from "@mui/material";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import AppLink from "../AppLink";

export type TProduct = {
  id?: string;
  name: string;
  image: any;
  price: number | string;
  rating?: number | string;
  showWishlist?: boolean;
};

type ProductCard2Props = {
  viewLink: string;
  product: TProduct;
  onAddToCart?: () => void;
  onWishlistToggle?: () => void;
};

const ProductCard2: React.FC<ProductCard2Props> = ({
  viewLink,
  product,
  onAddToCart,
  onWishlistToggle,
}) => {
  const { name, price, image, rating = 0, showWishlist = true } = product;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "var(--color-brand-background)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />

        {/* Glass Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            color: "#222",
            px: 3,
            py: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <AppLink href={viewLink || ""}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              noWrap
              sx={{
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
                ":hover": {
                  color: "orange",
                },
                mb: 1,
              }}
            >
              {name}
            </Typography>
          </AppLink>

          {/* Rating */}
          <Rating
            size="small"
            name="product-rating"
            value={rating}
            sx={{ color: "var(--color-brand-primary)" }}
          />

          {/* Price */}
          <Typography
            fontWeight="bold"
            sx={{
              color: "red",
            }}
          >
            ৳{price.toLocaleString()}
          </Typography>

          {/* Buttons */}
          <Stack direction="row" spacing={1} mt={1}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCart size={18} />}
              onClick={onAddToCart}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "var(--color-brand-primary)",
                color: "white",
                boxShadow: "0 2px 12px rgb(255 107 107 / 0.4)",
                "&:hover": {
                  bgcolor: "var(--color-brand-secondary)",
                  boxShadow: "0 4px 20px rgb(255 107 107 / 0.6)",
                },
              }}
            >
              Add to Cart
            </Button>

            {showWishlist && (
              <Button
                variant="outlined"
                onClick={onWishlistToggle}
                sx={{
                  minWidth: 40,
                  px: 1.5,
                  borderWidth: 2,
                  color: "var(--color-brand-secondary)",
                  borderColor: "var(--color-brand-secondary)",
                  "&:hover": {
                    bgcolor: "var(--color-brand-secondary)",
                    color: "white",
                  },
                }}
              >
                <Heart size={20} />
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard2;
