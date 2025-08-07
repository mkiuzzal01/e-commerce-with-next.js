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
  IconButton,
  Paper,
  Stack,
  TextField,
  Grid,
  Divider,
  Alert,
  Snackbar,
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
  Favorite,
} from "@mui/icons-material";
import { useSingleProductBySlugQuery } from "@/redux/features/product/product.Api";
import Loader from "@/utils/Loader";
import { TProduct } from "@/Types/ProductType";
import ReusableForm from "./ReusableForm";
import { FieldValues } from "react-hook-form";

type CartFormData = {
  productId: string;
  variantName?: string;
  colorValue?: string;
  quantity: number;
  price: number;
};

type WishlistFormData = {
  productId: string;
};

export default function ProductDetails({ slug }: { slug: string }) {
  const { data, isLoading } = useSingleProductBySlugQuery(slug || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const product: TProduct = data?.data;

  if (isLoading) return <Loader />;

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Product not found
        </Typography>
      </Box>
    );
  }

  // Create array of all images (main + optional)
  const allImages = [
    product.productImage?.photo?.url,
    ...(product.optionalImages?.map((img) => img.photo?.url) || []),
  ].filter(Boolean);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (
      newQuantity >= 1 &&
      newQuantity <= (Number(product.totalQuantity) || 1)
    ) {
      setQuantity(newQuantity);
    }
  };

  const discountedPrice =
    Number(product.discount) > 0
      ? (Number(product.price) * (1 - Number(product.discount) / 100)).toFixed(
          2
        )
      : Number(product.price).toFixed(2);

  const getAvailableQuantity = () => {
    if (selectedVariant !== null && selectedColor !== null) {
      return (
        product.variants[selectedVariant]?.attributes[selectedColor]
          ?.quantity || 0
      );
    }
    return Number(product.totalQuantity) || 0;
  };

  const getSelectedVariantInfo = () => {
    if (selectedVariant !== null) {
      const variant = product.variants[selectedVariant];
      const color =
        selectedColor !== null ? variant?.attributes[selectedColor] : null;
      return {
        variantName: variant?.name,
        colorValue: color?.value,
        availableQuantity: color?.quantity || Number(product.totalQuantity),
      };
    }
    return {
      variantName: undefined,
      colorValue: undefined,
      availableQuantity: Number(product.totalQuantity),
    };
  };

  const handleAddToCart = (formData: FieldValues) => {
    const variantInfo = getSelectedVariantInfo();

    // Validate selection if variants exist
    if (product.variants && product.variants.length > 0) {
      if (selectedVariant === null) {
        setSnackbar({
          open: true,
          message: "Please select a size",
          severity: "error",
        });
        return;
      }

      if (selectedColor === null) {
        setSnackbar({
          open: true,
          message: "Please select a color",
          severity: "error",
        });
        return;
      }
    }

    // Check stock availability
    if (quantity > variantInfo.availableQuantity) {
      setSnackbar({
        open: true,
        message: "Selected quantity exceeds available stock",
        severity: "error",
      });
      return;
    }

    const cartData: CartFormData = {
      productId: product._id,
      variantName: variantInfo.variantName,
      colorValue: variantInfo.colorValue,
      quantity,
      price: Number(discountedPrice),
    };

    console.log("Adding to cart:", cartData);

    setSnackbar({
      open: true,
      message: "Product added to cart successfully!",
      severity: "success",
    });
  };

  const handleAddToWishlist = (formData: FieldValues) => {
    const wishlistData: WishlistFormData = {
      productId: product._id,
    };

    console.log("Adding to wishlist:", wishlistData);

    setIsWishlisted(!isWishlisted);
    setSnackbar({
      open: true,
      message: isWishlisted
        ? "Removed from wishlist"
        : "Added to wishlist successfully!",
      severity: "success",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setSnackbar({
        open: true,
        message: "Product link copied to clipboard!",
        severity: "success",
      });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box className="container" sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "sticky", top: 10 }}>
              {/* Main Image */}
              {allImages.length > 0 && (
                <Card sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="500"
                    image={allImages[selectedImage] || allImages[0]}
                    alt={product.title}
                    sx={{ objectFit: "cover" }}
                  />
                </Card>
              )}

              {/* Thumbnail Images */}
              {allImages.length > 1 && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ overflowX: "auto", pb: 1 }}
                >
                  {allImages.map((image, index) => (
                    <Card
                      key={index}
                      sx={{
                        minWidth: 80,
                        height: 80,
                        cursor: "pointer",
                        border: selectedImage === index ? 2 : 0,
                        borderColor: "primary.main",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <CardMedia
                        component="img"
                        height="80"
                        image={image}
                        alt={`${product.title} ${index + 1}`}
                        sx={{ objectFit: "cover" }}
                      />
                    </Card>
                  ))}
                </Stack>
              )}
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {/* Product Title */}
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                {product?.title}
              </Typography>

              {/* Subtitle */}
              {product?.subTitle && (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {product?.subTitle}
                </Typography>
              )}

              {/* Rating */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 3 }}
              >
                <Rating
                  value={Number(product?.rating) || 0}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary">
                  {Number(product?.rating) || 0} (24 reviews)
                </Typography>
              </Stack>

              <Divider sx={{ mb: 3 }} />

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
                  ${discountedPrice}
                </Typography>
                {Number(product?.discount) > 0 && (
                  <>
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      ${Number(product?.price).toFixed(2)}
                    </Typography>
                    <Chip
                      label={`${product?.discount}% OFF`}
                      color="error"
                      size="small"
                    />
                  </>
                )}
              </Stack>

              {/* Description */}
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                {product?.description}
              </Typography>

              {/* Variant Selection */}
              {product?.variants && product?.variants?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Size
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    {product.variants.map((variant, index) => (
                      <Button
                        key={index}
                        variant={
                          selectedVariant === index ? "contained" : "outlined"
                        }
                        onClick={() => {
                          setSelectedVariant(index);
                          setSelectedColor(null);
                        }}
                        sx={{ minWidth: 50 }}
                      >
                        {variant?.name?.toUpperCase()}
                      </Button>
                    ))}
                  </Stack>

                  {/* Color Selection */}
                  {selectedVariant !== null &&
                    product?.variants[selectedVariant]?.attributes && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Color
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          {product.variants[selectedVariant].attributes.map(
                            (attr, index) => (
                              <Button
                                style={{
                                  backgroundColor: attr?.value,
                                }}
                                key={index}
                                
                                variant="contained"
                                onClick={() => setSelectedColor(index)}
                                sx={{ textTransform: "capitalize" }}
                                disabled={attr.quantity === 0 }
                              >
                                {attr?.value}
                                {attr?.quantity === 0 && " (Out of Stock)"}
                              </Button>
                            )
                          )}
                        </Stack>
                        {selectedColor !== null && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            Available:{" "}
                            {product.variants[selectedVariant].attributes[
                              selectedColor
                            ]?.quantity || 0}{" "}
                            items
                          </Typography>
                        )}
                      </Box>
                    )}
                </Box>
              )}

              {/* Quantity Selector */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
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
                    inputProps={{
                      style: { textAlign: "center" },
                      min: 1,
                      max: getAvailableQuantity(),
                    }}
                    type="number"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= getAvailableQuantity()) {
                        setQuantity(value);
                      }
                    }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= getAvailableQuantity()}
                  >
                    <Add />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {getAvailableQuantity()} available
                  </Typography>
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                {/* Add to Cart Form */}
                <ReusableForm onSubmit={handleAddToCart}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCart />}
                    sx={{ flex: 1 }}
                    disabled={
                      product.status !== "in-stock" ||
                      getAvailableQuantity() === 0
                    }
                  >
                    Add to Cart
                  </Button>
                </ReusableForm>

                {/* Add to Wishlist Form */}
                <ReusableForm onSubmit={handleAddToWishlist}>
                  <IconButton
                    type="submit"
                    color="primary"
                    size="large"
                    sx={{
                      color: isWishlisted ? "error.main" : "primary.main",
                    }}
                  >
                    {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </ReusableForm>

                <IconButton color="primary" size="large" onClick={handleShare}>
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
            </Box>
          </Grid>
        </Grid>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
