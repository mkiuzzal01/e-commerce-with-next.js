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
  Stack,
  Typography,
} from "@mui/material";
import { ShoppingCart, Trash2 } from "lucide-react";
import AppLink from "../AppLink";
import { useDiscount } from "@/lib/useDiscount";

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
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        justifyItems: "center",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: { xs: "100%", sm: 120 },
          height: { xs: 100, sm: "auto" },
          objectFit: "cover",
        }}
      />

      <Box>
        <CardContent>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            gutterBottom
            sx={{
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          <Stack spacing={1} alignItems="center" mb={1.5}>
            <Typography variant="h6" color="primary" fontWeight={700}>
              ৳{finalPrice}
            </Typography>
          </Stack>
        </CardContent>

        {/* Actions */}
        <CardActions
          sx={{
            px: { xs: 2, sm: 2.5 },
            pb: { xs: 2, sm: 2.5 },
            gap: 1,
          }}
        >
          <AppLink href={`/${categories?.mainCategory?.name}/${slug}`}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ShoppingCart size={16} />}
            >
              View
            </Button>
          </AppLink>

          <Button
            onClick={() => onRemove && onRemove(id)}
            fullWidth
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Trash2 size={16} />}
          >
            Remove
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default WishListCard;
