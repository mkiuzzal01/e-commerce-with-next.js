/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDiscount } from "@/lib/useDiscount";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import AppLink from "../AppLink";

export type TProduct = {
  id?: string;
  name: string;
  image?: any;
  price: number | string;
  discount: number | string;
};

type ProductCardProps = {
  viewLink?: string;
  product: TProduct;
};

const ProductCard1: React.FC<ProductCardProps> = ({ viewLink, product }) => {
  const { originalPrice, finalPrice, discountAmount, isDiscounted } =
    useDiscount(product.price, product.discount);

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
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Discount badge */}
        {isDiscounted && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "linear-gradient(45deg, #ef4444, #f97316)",
              color: "white",
              fontWeight: "bold",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: "0.85rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            {product.discount < 100
              ? `-${product.discount}%`
              : `Save ৳${discountAmount.toLocaleString()}`}
          </Box>
        )}

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
          <AppLink href={viewLink || ""}>
            <Typography
              sx={{
                color: "var(--color-brand-heading)",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
                ":hover": { color: "orange" },
                mb: 1,
              }}
            >
              {product?.name}
            </Typography>
          </AppLink>

          {/* Price display */}
          <Stack direction="row" spacing={1} alignItems="center">
            {isDiscounted && (
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "line-through",
                  fontSize: "14px",
                }}
              >
                ৳{originalPrice.toLocaleString()}
              </Typography>
            )}
            <Typography
              fontWeight="bold"
              sx={{ color: "var(--color-brand-heading)" }}
            >
              ৳{finalPrice.toLocaleString()}
            </Typography>
          </Stack>

          {/* Buttons */}
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
            <AppLink href={viewLink || ""}>
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
                View
              </Button>
            </AppLink>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard1;
