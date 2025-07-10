"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Chip,
  Rating,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tabs,
  Tab,
  Avatar,
  TextField,
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  Add,
  Remove,
  Star,
  Verified,
  LocalShipping,
  Security,
  Refresh,
  Person,
} from "@mui/icons-material";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [tabValue, setTabValue] = useState(0);

  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "TechSound Pro",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 1247,
    inStock: true,
    stockCount: 15,
    category: "Electronics",
    sku: "TSP-WH-001",
    description:
      "Experience premium sound quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    ],
    colors: ["Black", "White", "Silver", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather comfort",
      "Bluetooth 5.0 connectivity",
      "Quick charge technology",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohms",
      Weight: "250g",
      "Bluetooth Version": "5.0",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
    },
  };

  const reviews = [
    {
      id: 1,
      user: "John Smith",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent sound quality and comfort. The noise cancellation is outstanding!",
      verified: true,
    },
    {
      id: 2,
      user: "Sarah Johnson",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great headphones overall. Battery life is as advertised. Highly recommend!",
      verified: true,
    },
    {
      id: 3,
      user: "Mike Davis",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Best purchase I've made this year. Perfect for long flights and work.",
      verified: false,
    },
  ];

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, Math.min(product.stockCount, quantity + change)));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "sticky", top: 20 }}>
              <Card sx={{ mb: 2, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={product.images[selectedImage]}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
              </Card>
              <Grid container spacing={1}>
                {product.images.map((image, index) => (
                  <Grid size={{ xs: 3 }} key={index}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        border: selectedImage === index ? 2 : 1,
                        borderColor:
                          selectedImage === index ? "primary.main" : "grey.300",
                        borderRadius: 1,
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <CardMedia
                        component="img"
                        height="80"
                        image={image}
                        alt={`${product.name} ${index + 1}`}
                        sx={{ objectFit: "cover" }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {/* Brand and Category */}
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Chip label={product.brand} size="small" variant="outlined" />
                <Chip
                  label={product.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                {product.inStock && (
                  <Chip label="In Stock" size="small" color="success" />
                )}
              </Stack>

              {/* Product Name */}
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                {product.name}
              </Typography>

              {/* Rating and Reviews */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {product.rating} ({product.reviewCount} reviews)
                </Typography>
              </Stack>

              {/* Price */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 3 }}
              >
                <Typography
                  variant="h3"
                  component="span"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  ${product.price}
                </Typography>
                <Typography
                  variant="h5"
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                  ${product.originalPrice}
                </Typography>
                <Chip
                  label={`${product.discount}% OFF`}
                  color="error"
                  size="small"
                />
              </Stack>

              {/* Description */}
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {product.description}
              </Typography>

              {/* Color Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Color
                </Typography>
                <Stack direction="row" spacing={1}>
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={
                        selectedColor === color ? "contained" : "outlined"
                      }
                      onClick={() => setSelectedColor(color)}
                      size="small"
                    >
                      {color}
                    </Button>
                  ))}
                </Stack>
              </Box>

              {/* Size Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Size
                </Typography>
                <Stack direction="row" spacing={1}>
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "contained" : "outlined"}
                      onClick={() => setSelectedSize(size)}
                      size="small"
                      sx={{ minWidth: 50 }}
                    >
                      {size}
                    </Button>
                  ))}
                </Stack>
              </Box>

              {/* Quantity Selector */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Quantity
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    size="small"
                    sx={{ width: 80 }}
                    inputProps={{ style: { textAlign: "center" } }}
                    disabled
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Add />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    ({product.stockCount} available)
                  </Typography>
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  sx={{ flex: 1 }}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <IconButton color="primary" size="large">
                  <FavoriteBorder />
                </IconButton>
                <IconButton color="primary" size="large">
                  <Share />
                </IconButton>
              </Stack>

              {/* Product Info Cards */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 4 }}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <LocalShipping color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      Free Shipping
                    </Typography>
                    <Typography variant="caption">
                      On orders over $50
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Security color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      Secure Payment
                    </Typography>
                    <Typography variant="caption">
                      100% secure payment
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Refresh color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      30-Day Return
                    </Typography>
                    <Typography variant="caption">Easy returns</Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* SKU and Additional Info */}
              <Typography variant="body2" color="text.secondary">
                SKU: {product.sku}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Box sx={{ mt: 6 }}>
          <Paper sx={{ borderRadius: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="product details tabs"
            >
              <Tab label="Description" />
              <Tab label="Specifications" />
              <Tab label="Reviews" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Key Features
              </Typography>
              <Grid container spacing={2}>
                {product.features.map((feature, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Star color="primary" fontSize="small" />
                      <Typography variant="body2">{feature}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Technical Specifications
              </Typography>
              {Object.entries(product.specifications).map(([key, value]) => (
                <Box key={key} sx={{ mb: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body1" fontWeight="medium">
                      {key}
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Stack>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Customer Reviews
              </Typography>
              {reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <Person />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 1 }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          {review.user}
                        </Typography>
                        {review.verified && (
                          <Verified color="primary" fontSize="small" />
                        )}
                        <Typography variant="caption" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Stack>
                      <Rating
                        value={review.rating}
                        size="small"
                        readOnly
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2">{review.comment}</Typography>
                    </Box>
                  </Stack>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </TabPanel>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
