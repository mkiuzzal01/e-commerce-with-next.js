/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Box, Button, Card, Rating, Stack, Typography } from "@mui/material";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import AppLink from "../AppLink";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useToast } from "../tost-alert/ToastProvider";
import { addToWishlist, removeFromWishlist } from "@/redux/slice/wishlistSlice";

export type TProduct = {
  id: string;
  slug: string | any;
  name: string;
  image: any;
  price: number | string;
  rating?: number;
  showWishlist?: boolean;
};

type ProductCard2Props = {
  viewLink: string;
  product: TProduct;
};

const ProductCard2: React.FC<ProductCard2Props> = ({ viewLink, product }) => {
  const { name, price, image, rating, showWishlist = true, slug, id } = product;

  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item._id === id);
  const { showToast } = useToast();

  const numericPrice = typeof price === "string" ? Number(price) : price;

  const handleAddToWishlist = () => {
    if (!id) return;

    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
      showToast({ message: "Removed from wishlist", type: "warning" });
    } else {
      dispatch(addToWishlist({ _id: id }));
      showToast({
        message: "Added to wishlist successfully!",
        type: "success",
      });
    }
  };

  return (
    <Box>
      <Box component="a" href={viewLink} aria-label={`View details of ${name}`}>
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
          elevation={6}
          aria-label={`Product card for ${name}`}
        >
          <Box className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              sizes="(max-width: 600px) 100vw, 33vw"
              draggable={false}
            />

            {/* Glass Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(6px)",
                color: "text.primary",
                px: 3,
                py: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <AppLink href={viewLink} aria-label={`View details of ${name}`}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  noWrap
                  sx={{
                    color: "text.primary",
                    fontSize: 16,
                    textTransform: "uppercase",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "orange",
                    },
                    mb: 1,
                  }}
                  title={name}
                >
                  {name}
                </Typography>
              </AppLink>

              <Rating
                size="small"
                name="product-rating"
                value={rating}
                precision={0.5}
                readOnly
                sx={{ color: "var(--color-brand-primary)" }}
                aria-label={`Rating: ${rating} out of 5`}
              />

              <Typography
                fontWeight="bold"
                color="error.main"
                sx={{ fontSize: 18 }}
                aria-label={`Price: ৳${numericPrice.toLocaleString()}`}
              >
                ৳{numericPrice.toLocaleString()}
              </Typography>

              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Box width={"100%"}>
                  <AppLink href={`/check-out/${slug || " "}`}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart size={18} />}
                      sx={{
                        px: 3,
                        py: 1.5,
                        fontWeight: 600,
                        bgcolor: "var(--color-brand-primary)",
                        color: "white",
                        boxShadow: "0 2px 12px rgb(255 107 107 / 0.4)",
                        "&:hover": {
                          bgcolor: "var(--color-brand-secondary)",
                          boxShadow: "0 4px 20px rgb(255 107 107 / 0.6)",
                        },
                      }}
                      aria-label={`View product ${name}`}
                    >
                      Buy Now
                    </Button>
                  </AppLink>
                </Box>

                {showWishlist && (
                  <Button
                    variant={isWishlisted ? "contained" : "outlined"}
                    onClick={handleAddToWishlist}
                    disabled={!id}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderWidth: 2,
                      color: isWishlisted
                        ? "white"
                        : "var(--color-brand-secondary)",
                      borderColor: "var(--color-brand-secondary)",
                      bgcolor: isWishlisted
                        ? "var(--color-brand-secondary)"
                        : "transparent",
                      "&:hover": {
                        bgcolor: "var(--color-brand-secondary)",
                        color: "white",
                      },
                    }}
                    aria-pressed={isWishlisted}
                    aria-label={
                      isWishlisted
                        ? `Remove ${name} from wishlist`
                        : `Add ${name} to wishlist`
                    }
                  >
                    <Heart size={20} />
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductCard2;
