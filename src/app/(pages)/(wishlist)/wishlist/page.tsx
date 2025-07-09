"use client";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";

const wishlistItems = [
  {
    id: "1",
    name: "Men's Premium T-Shirt",
    price: 650,
    image: "/images/products/tshirt.jpg",
  },
  {
    id: "2",
    name: "Women's Denim Jacket",
    price: 1450,
    image: "/images/products/jacket.jpg",
  },
  {
    id: "3",
    name: "Unisex Sunglasses",
    price: 1250,
    image: "/images/products/sunglasses.jpg",
  },
  {
    id: "4",
    name: "Sports Shoes",
    price: 1780,
    image: "/images/products/shoes.jpg",
  },
];

export default function WishlistPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        align="center"
        color="primary"
      >
        Your Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Typography align="center" color="text.secondary">
          Your wishlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                elevation={3}
                sx={{
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ৳{item.price}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2,
                    pb: 2,
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCart size={18} />}
                  >
                    Add to Cart
                  </Button>
                  <IconButton color="error">
                    <Heart size={20} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
