"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Stack,
  TextField,
  IconButton,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import { Add, Remove, Check, AssignmentTurnedIn } from "@mui/icons-material";
import { useSingleProductBySlugQuery } from "@/redux/features/product/product.Api";
import Loader from "@/utils/Loader";
import { TProduct } from "@/Types/ProductType";
import { useDiscount } from "@/lib/hooks/useDiscount";
import SectionHeader from "@/components/shared/SectionHeader";
import { useUser } from "@/lib/hooks/useUser";
import { useToast } from "@/utils/tost-alert/ToastProvider";
import { usePathname, useRouter } from "next/navigation";
import { useCreateOrderMutation } from "@/redux/features/order/order.Api";

interface Props {
  slug: string;
}

export default function CheckOut({ slug }: Props) {
  const { showToast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const { userInfo, userComing } = useUser();
  const { data, isLoading } = useSingleProductBySlugQuery(slug || "");
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [createOrder, { isLoading: updating }] = useCreateOrderMutation();

  const product: TProduct = data?.data;
  const { finalPrice } = useDiscount(product?.price, product?.discount);

  const handleQuantityChange = (change: number) => {
    if (!product) return;
    const newQuantity = quantity + change;
    const maxQuantity = getAvailableQuantity();
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const getAvailableQuantity = () => {
    if (!product) return 0;
    if (selectedVariant !== null && selectedColor !== null) {
      return (
        product.variants[selectedVariant]?.attributes[selectedColor]
          ?.quantity || 0
      );
    }
    return Number(product.totalQuantity) || 0;
  };

  const calculateTotal = () => {
    if (!finalPrice) return "0.00";
    return (finalPrice * quantity).toFixed(2);
  };

  const mainImage = product?.productImage?.photo?.url;

  const handleCheckout = async () => {
    if (!userInfo) {
      showToast({ message: "Please login to checkout", type: "error" });
      return router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
    if (!userInfo?.address?.permanentAddress) {
      showToast({ message: "Please add your profile address", type: "error" });
      return router.replace(
        `/update-profile?redirect=${encodeURIComponent(pathname)}`
      );
    }

    const selectedSize =
      selectedVariant !== null ? product?.variants[selectedVariant]?.name : "";
    const selectedColorValue =
      selectedVariant !== null && selectedColor !== null
        ? product?.variants[selectedVariant]?.attributes[selectedColor]?.value
        : "";

    const orderData = {
      orderItems: [
        {
          productId: product?._id,
          size: selectedSize || "",
          color: selectedColorValue || "",
          quantity: quantity,
        },
      ],
      totalPrice: parseFloat(calculateTotal()),
      customerId: userInfo?._id,
      deliveryAddress: userInfo?.address,
    };

    try {
      const res = await createOrder(orderData);

      if (res?.data) {
        showToast({
          message: "Order placed successfully!",
          type: "success",
        });
        router.push("/track-order");
      }
    } catch {
      showToast({
        message: "Failed to place order. Please try again.",
        type: "error",
      });
    }
  };

  if (isLoading || userComing) return <Loader />;

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

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box className="container" sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
        <Box mb={3}>
          <SectionHeader
            title="Check out your product"
            subTitle="please select your favorite variant"
            icon={<AssignmentTurnedIn />}
            alignment="center"
          />
        </Box>

        <Grid container spacing={4}>
          {/* Product Summary */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Product Details
              </Typography>

              <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                {mainImage && (
                  <Card sx={{ width: 120, height: 120, overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={mainImage}
                      alt={product.title}
                      sx={{ objectFit: "cover" }}
                    />
                  </Card>
                )}

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {product?.title}
                  </Typography>
                  {product?.subTitle && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {product?.subTitle}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    {finalPrice}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ mb: 3 }} />

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
              <Box sx={{ mb: 3 }}>
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
            </Card>
          </Grid>

          {/* Checkout Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, position: "sticky", top: 20 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Order Summary
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Item:</Typography>
                  <Typography variant="body1" noWrap>
                    {product?.title}
                  </Typography>
                </Stack>

                {selectedVariant !== null && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Size:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.variants[selectedVariant]?.name?.toUpperCase()}
                    </Typography>
                  </Stack>
                )}

                {selectedColor !== null && selectedVariant !== null && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Color:
                    </Typography>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor:
                          product.variants[selectedVariant].attributes[
                            selectedColor
                          ]?.value,
                        border: "1px solid #ccc",
                      }}
                    />
                  </Stack>
                )}

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Quantity:</Typography>
                  <Typography variant="body1">{quantity}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">Unit Price:</Typography>
                  <Typography variant="body1">{finalPrice}</Typography>
                </Stack>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  ${calculateTotal()}
                </Typography>
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
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
                onClick={handleCheckout}
                disabled={
                  updating ||
                  product.status !== "in-stock" ||
                  getAvailableQuantity() === 0 ||
                  (product.variants &&
                    product.variants.length > 0 &&
                    (selectedVariant === null || selectedColor === null))
                }
              >
                {updating ? "Processing..." : "Order Now"}
              </Button>

              {product.variants &&
                product.variants.length > 0 &&
                (selectedVariant === null || selectedColor === null) && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ display: "block", textAlign: "center", mt: 1 }}
                  >
                    Please select size and color to continue
                  </Typography>
                )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
