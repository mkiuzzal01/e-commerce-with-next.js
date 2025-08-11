import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  Alert,
} from "@mui/material";
import { Delete } from "lucide-react";
import AppLink from "../AppLink";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { useDiscount } from "@/lib/useDiscount";

type CartVariant = {
  name: string;
  attribute: {
    value: string;
    quantity: number;
  };
};

type CartItemCardProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  discount: number;
  variant?: CartVariant;
  category?: string;
  viewLink?: string;
  onRemove?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  onQuantityUpdate?: (
    id: string,
    quantity: number,
    maxAvailable: number
  ) => void;
  maxAvailable?: number;
  currentQuantity?: number;
};

export default function CartItemCard({
  id,
  title,
  price,
  discount,
  image,
  variant,
  onRemove,
  viewLink,
  isSelected = false,
  onSelect,
  onQuantityUpdate,
  maxAvailable = 1,
  currentQuantity = 1,
}: CartItemCardProps) {
  const { finalPrice } = useDiscount(price, discount);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [localQuantity, setLocalQuantity] = useState(currentQuantity);
  const totalPrice = finalPrice * localQuantity;

  const isOutOfStock = maxAvailable === 0;
  const isQuantityExceeded = localQuantity > maxAvailable;

  const handleQuantityChange = (change: number) => {
    const newQuantity = localQuantity + change;
    if (newQuantity >= 1 && newQuantity <= maxAvailable) {
      setLocalQuantity(newQuantity);
      onQuantityUpdate?.(id, newQuantity, maxAvailable);
    }
  };

  const handleQuantityInput = (value: string) => {
    const numValue = parseInt(value) || 1;
    if (numValue >= 1 && numValue <= maxAvailable) {
      setLocalQuantity(numValue);
      onQuantityUpdate?.(id, numValue, maxAvailable);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "visible",
        position: "relative",
        border: isSelected ? `2px solid ${theme.palette.primary.main}` : "none",
        opacity: isOutOfStock ? 0.7 : 1,
        "&:hover": {
          transform: isOutOfStock ? "none" : "translateY(-2px)",
          boxShadow: isOutOfStock ? theme.shadows[1] : theme.shadows[8],
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      <CardContent sx={{ p: 3, position: "relative" }}>
        {/* Checkbox */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1,
          }}
        >
          <Checkbox
            checked={isSelected && !isOutOfStock}
            disabled={isOutOfStock}
            onChange={(e) => onSelect?.(id, e.target.checked)}
            color="primary"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: "50%",
              padding: 0.5,
            }}
          />
        </Box>

        {/* Out of Stock Alert */}
        {isOutOfStock && (
          <Alert severity="error" sx={{ mb: 2, ml: 6 }}>
            This item is currently out of stock
          </Alert>
        )}

        {/* Quantity Exceeded Alert */}
        {isQuantityExceeded && !isOutOfStock && (
          <Alert severity="warning" sx={{ mb: 2, ml: 6 }}>
            Quantity exceeds available stock ({maxAvailable} available)
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 3,
            position: "relative",
            pl: 6,
          }}
        >
          {/* Product Image */}
          <Box sx={{ position: "relative", minWidth: isMobile ? "100%" : 160 }}>
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{
                width: "100%",
                height: isMobile ? 200 : 160,
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
            {onRemove && (
              <IconButton
                onClick={() => onRemove(id)}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: "error.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                  width: 32,
                  height: 32,
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 2,
              }}
            >
              <Box>
                <AppLink href={viewLink || ""}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {title}
                  </Typography>
                </AppLink>

                {variant && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 1, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={`Size: ${variant.name}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={`Color: ${variant.attribute.value}`}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </Stack>
                )}
              </Box>

              {/* Quantity Controls */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Quantity
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={() => handleQuantityChange(-1)}
                    disabled={localQuantity <= 1 || isOutOfStock}
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={localQuantity}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{
                      style: { textAlign: "center" },
                      min: 1,
                      max: maxAvailable,
                    }}
                    type="number"
                    disabled={isOutOfStock}
                    onChange={(e) => handleQuantityInput(e.target.value)}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(1)}
                    disabled={localQuantity >= maxAvailable || isOutOfStock}
                    size="small"
                  >
                    <Add />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    / {maxAvailable}
                  </Typography>
                </Stack>
              </Box>

              {/* Price */}
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {discount ? (
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                        }}
                      >
                        ${price.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        ৳ {finalPrice.toFixed(2)}
                      </Typography>
                      <Chip
                        label={`${discount}% OFF`}
                        color="error"
                        size="small"
                      />
                    </>
                  ) : (
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ৳ {finalPrice.toFixed(2)}
                    </Typography>
                  )}
                </Stack>

                {localQuantity > 1 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Total: ৳ {totalPrice.toFixed(2)}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
