/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { ShoppingCart, Trash2 } from "lucide-react";
import AppLink from "../AppLink";
import { useDiscount } from "@/lib/hooks/useDiscount";

type WishlistItemProps = {
  id: string;
  slug: string | undefined;
  title: string;
  discount: number;
  price: number;
  image: string;
  categories?: any;
  onRemove?: (id: string) => void;
};

const WishListCard = ({
  id,
  slug,
  title,
  price,
  discount,
  image,
  categories,
  onRemove,
}: WishlistItemProps) => {
  const { finalPrice } = useDiscount(price, discount);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "background.paper",
        height: "100%",
        border: "1px solid",
        borderColor: "grey.200",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          borderColor: "primary.main",
        },
      }}
    >
      {/* Remove Button - Positioned absolutely */}
      <IconButton
        onClick={() => onRemove && onRemove(id)}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          width: 36,
          height: 36,
          border: "1px solid",
          borderColor: "grey.200",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: "error.main",
            color: "white",
            transform: "scale(1.1)",
          },
        }}
      >
        <Trash2 size={18} />
      </IconButton>

      {/* Discount Badge */}
      {discount > 0 && (
        <Chip
          label={`${discount}% OFF`}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            bgcolor: "error.main",
            color: "white",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      )}

      {/* Product Image */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: "100%",
            height: { xs: 220, sm: 240, md: 260 },
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        {/* Image Overlay Gradient */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(transparent, rgba(0,0,0,0.1))",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 3, pb: 2 }}>
        {/* Category Tag */}
        {categories?.mainCategory?.name && (
          <Typography
            variant="caption"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontSize: "0.7rem",
              mb: 1,
              display: "block",
            }}
          >
            {categories.mainCategory.name}
          </Typography>
        )}

        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          sx={{
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            color: "text.primary",
          }}
        >
          {title}
        </Typography>

        {/* Price Section */}
        <Stack direction="row" alignItems="baseline" spacing={1} mb={2}>
          <Typography
            variant="h5"
            color="primary.main"
            fontWeight={700}
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            ৳{finalPrice.toLocaleString()}
          </Typography>
          {discount > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "line-through",
                fontSize: "0.9rem",
              }}
            >
              ৳{price.toLocaleString()}
            </Typography>
          )}
        </Stack>
      </CardContent>

      {/* Action Button */}
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Box style={{ width: "100%" }}>
          <AppLink href={`/${categories?.mainCategory?.name}/${slug}`}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShoppingCart size={20} />}
              sx={{
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
              View Details
            </Button>
          </AppLink>
        </Box>
      </CardActions>
    </Card>
  );
};

export default WishListCard;
