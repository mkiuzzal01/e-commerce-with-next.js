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
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "lucide-react";

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

type WishListCardProps = {
  item: WishlistItem;
  onAddToCart?: (item: WishlistItem) => void;
  onRemove?: (id: string) => void;
};

const WishListCard: React.FC<WishListCardProps> = ({ item, onAddToCart }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
          md: "row",
        },
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        sx={{
          width: { xs: "100%", sm: 180, md: 220 },
          height: { xs: 200, sm: 200, md: "100%" },
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1.2}
          >
            <Chip
              size="small"
              label={item.category}
              color="primary"
              variant="outlined"
            />
            {!item.inStock && (
              <Chip size="small" label="Out of Stock" color="warning" />
            )}
          </Stack>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            gutterBottom
            sx={{ lineHeight: 1.4 }}
          >
            {item.name}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
            mb={1}
          >
            <Typography variant="h6" color="primary">
              ৳{item.price}
            </Typography>
            {item.originalPrice && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                }}
              >
                ৳{item.originalPrice}
              </Typography>
            )}
          </Stack>

          {item.rating !== undefined && (
            <Rating
              name={`wishlist-rating-${item.id}`}
              value={item.rating}
              precision={0.1}
              size="small"
              readOnly
            />
          )}
        </CardContent>

        <CardActions
          sx={{
            px: { xs: 2, sm: 2.5, md: 3 },
            pb: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="small"
            disabled={!item.inStock}
            onClick={() => onAddToCart?.(item)}
            startIcon={<ShoppingCart size={16} />}
          >
            {item.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default WishListCard;
