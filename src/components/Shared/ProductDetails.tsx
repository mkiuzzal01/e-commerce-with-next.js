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
  Stack,
  TextField,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  Add,
  Remove,
  AccessTime,
  Check,
  Favorite,
  Person,
} from "@mui/icons-material";
import { useSingleProductBySlugQuery } from "@/redux/features/product/product.Api";
import Loader from "@/utils/Loader";
import { TCartItem, TProduct } from "@/Types/ProductType";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import { useDiscount } from "@/lib/useDiscount";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/slice/wishlistSlice";
import { addToCart } from "@/redux/slice/cartSlice";

export default function ProductDetails({ slug }: { slug: string }) {
  const { data, isLoading } = useSingleProductBySlugQuery(slug || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const { showToast } = useToast();

  const product: TProduct = data?.data;
  const { finalPrice } = useDiscount(product?.price, product?.discount);
  const isWishlisted = wishlistItems.some((item) => item._id === product?._id);

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

  const allImages = [
    product.productImage?.photo?.url,
    ...(product.optionalImages?.map((img) => img.photo?.url) || []),
  ].filter(Boolean);

  const averageRating = product.reviews?.length
    ? product.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
      product.reviews.length
    : 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (
      newQuantity >= 1 &&
      newQuantity <= (Number(product.totalQuantity) || 1)
    ) {
      setQuantity(newQuantity);
    }
  };

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

  const handleAddToCart = () => {
    const variantInfo = getSelectedVariantInfo();

    if (product.variants && product.variants.length > 0) {
      if (selectedVariant === null) {
        showToast({ message: "Please select a size", type: "error" });
        return;
      }
      if (selectedColor === null) {
        showToast({ message: "Please select a color", type: "error" });
        return;
      }
    }

    if (quantity > variantInfo.availableQuantity) {
      showToast({
        message: "Selected quantity exceeds available stock",
        type: "error",
      });
      return;
    }

    const cartItem: TCartItem = {
      productId: product._id,
      price: product.price,
      discount: product.discount,
      ...(product.variants.length > 0 && {
        selectedVariant: {
          name: variantInfo.variantName as string,
          attribute: {
            value: variantInfo.colorValue as string,
            quantity: quantity,
          },
        },
      }),
    };

    dispatch(addToCart(cartItem));

    showToast({
      message: "Product added to cart successfully!",
      type: "success",
    });
  };

  const handleAddToWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      showToast({ message: "Removed from wishlist", type: "warning" });
    } else {
      dispatch(
        addToWishlist({
          _id: product._id,
        })
      );
      showToast({
        message: "Added to wishlist successfully!",
        type: "success",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.description,
        url: window?.location?.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        message: "Product link copied to clipboard!",
        type: "success",
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
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
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
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
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
                <Rating value={averageRating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {averageRating.toFixed(1)} ({product.reviews?.length || 0}{" "}
                  reviews)
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
                  {finalPrice}
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
                  {selectedVariant !== null && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Color
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {product.variants[selectedVariant].attributes.map(
                          (attr, index) => (
                            <Box
                              key={index}
                              onClick={() => setSelectedColor(index)}
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                backgroundColor: attr?.value,
                                border:
                                  selectedColor === index
                                    ? "2px solid black"
                                    : "1px solid #ccc",
                                cursor: "pointer",
                                position: "relative",
                              }}
                            >
                              {selectedColor === index && (
                                <Check
                                  sx={{
                                    color: "#fff",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                  }}
                                />
                              )}
                            </Box>
                          )
                        )}
                      </Stack>
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
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    flex: 1,
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
                  startIcon={<ShoppingCart />}
                  disabled={
                    product.status !== "in-stock" ||
                    getAvailableQuantity() === 0
                  }
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>

                <IconButton
                  onClick={handleAddToWishlist}
                  color="primary"
                  size="large"
                  sx={{ color: isWishlisted ? "error.main" : "primary.main" }}
                >
                  {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                </IconButton>

                <IconButton color="primary" size="large" onClick={handleShare}>
                  <Share />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
            Customer Reviews
          </Typography>

          {product?.reviews ? (
            <Stack spacing={3}>
              {product?.reviews.map((review, index) => (
                <Card key={index} sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {review.user?.name?.charAt(0) || <Person />}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        spacing={1}
                        sx={{ mb: 1 }}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          {review.user?.name || "Anonymous"}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AccessTime fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Rating
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body1">{review.comment}</Typography>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                bgcolor: "background.paper",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No Reviews Yet
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Be the first to review this product
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
