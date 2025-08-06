"use client";
import React, { useState } from "react";
import {
  Box,
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
  TextField,
  Grid,
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  Add,
  Remove,
  LocalShipping,
  Security,
  Refresh,
} from "@mui/icons-material";
import { useSingleProductBySlugQuery } from "@/redux/features/product/product.Api";
import Loader from "@/utils/Loader";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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

export default function ProductDetails({ slug }: { slug: string }) {
  const { data: product, isLoading } = useSingleProductBySlugQuery(slug || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0]
  );
  const [tabValue, setTabValue] = useState(0);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    const maxQuantity =
      selectedVariant?.attributes?.[0]?.quantity ||
      product?.totalQuantity ||
      25;
    setQuantity(Math.max(1, Math.min(maxQuantity, newQuantity)));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading || !product) return <Loader />;

  // Combine main image with optional images for the gallery
  const allImages = [
    product.productImage.url,
    ...product.optionalImages.map((img) => img.photo.url),
  ];

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
                {/* <CardMedia
                  component="img"
                  height="400"
                  image={allImages[selectedImage]}
                  alt={product.title}
                  sx={{ objectFit: "cover" }}
                /> */}
              </Card>
              <Grid container spacing={1}>
                {allImages.map((image, index) => (
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
                      {/* <CardMedia
                        component="img"
                        height="80"
                        image={image}
                        alt={`${product.title} ${index + 1}`}
                        sx={{ objectFit: "cover" }}
                      /> */}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {/* Categories */}
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Chip
                  label={product.categories?.mainCategory?.name || "Men"}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={product.categories?.category?.name || "Clothing"}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={product.categories?.subCategory?.name || "Jeans"}
                  size="small"
                  variant="outlined"
                />
                {product.status === "in-stock" && (
                  <Chip label="In Stock" size="small" color="success" />
                )}
              </Stack>

              {/* Product Title */}
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                {product.title}
              </Typography>

              {/* Subtitle */}
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {product.subTitle}
              </Typography>

              {/* Rating */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Rating value={product.rating || 0} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {product.rating || 0} (0 reviews)
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
                {product.discount > 0 && (
                  <Chip
                    label={`${product.discount}% OFF`}
                    color="error"
                    size="small"
                  />
                )}
              </Stack>

              {/* Description */}
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {product.description}
              </Typography>

              {/* Variant Selection */}
              {product.variants?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Variants
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {product.variants.map((variant) => (
                      <Button
                        key={variant.name}
                        variant={
                          selectedVariant?.name === variant.name
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => {
                          setSelectedVariant(variant);
                          setQuantity(1); // Reset quantity when variant changes
                        }}
                        size="small"
                        sx={{ minWidth: 50, mb: 1 }}
                      >
                        {variant.name.toUpperCase()} (
                        {variant.attributes[0].value})
                      </Button>
                    ))}
                  </Stack>
                </Box>
              )}

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
                    disabled={
                      quantity >=
                      (selectedVariant?.attributes?.[0]?.quantity ||
                        product.totalQuantity)
                    }
                  >
                    <Add />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    (
                    {selectedVariant?.attributes?.[0]?.quantity ||
                      product.totalQuantity}{" "}
                    available)
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
                  disabled={product.status !== "in-stock"}
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
                <Grid ize={{ xs: 4 }}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Refresh color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2" fontWeight="bold">
                      30-Day Return
                    </Typography>
                    <Typography variant="caption">Easy returns</Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Product Code */}
              <Typography variant="body2" color="text.secondary">
                Product Code: {product.productCode}
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
              <Tab label="Details" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Product Description
              </Typography>
              <Typography variant="body1">
                {product.description || "No description available."}
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Product Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" fontWeight="medium">
                    Status
                  </Typography>
                  <Typography variant="body1" textTransform="capitalize">
                    {product.status}
                  </Typography>
                </Stack>
                <Divider sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" fontWeight="medium">
                    Main Category
                  </Typography>
                  <Typography variant="body1">
                    {product.categories?.mainCategory?.name || "N/A"}
                  </Typography>
                </Stack>
                <Divider sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" fontWeight="medium">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {product.categories?.category?.name || "N/A"}
                  </Typography>
                </Stack>
                <Divider sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" fontWeight="medium">
                    Subcategory
                  </Typography>
                  <Typography variant="body1">
                    {product.categories?.subCategory?.name || "N/A"}
                  </Typography>
                </Stack>
                <Divider sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" fontWeight="medium">
                    Product Placement
                  </Typography>
                  <Typography variant="body1" textTransform="capitalize">
                    {product.productPlace}
                  </Typography>
                </Stack>
                <Divider sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1" fontWeight="medium">
                    Created At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Divider sx={{ mt: 1 }} />
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
