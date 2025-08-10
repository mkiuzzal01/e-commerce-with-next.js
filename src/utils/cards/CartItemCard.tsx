/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Delete } from "lucide-react";

type CartItemCardProps = {
  item: any;
  isMobile: boolean;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  theme: any;
};

export default function CartItemCard({
  item,
  isMobile,
  removeItem,
  theme,
}: CartItemCardProps) {
  return (
    <Box>
      <Card
        sx={{
          borderRadius: 3,
          overflow: "visible",
          position: "relative",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[8],
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
            }}
          >
            {/* Product Image */}
            <Box
              sx={{ position: "relative", minWidth: isMobile ? "100%" : 160 }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: isMobile ? 200 : 160,
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
              <IconButton
                onClick={() => removeItem(item.id)}
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
            </Box>

            {/* Product Details */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "flex-start",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.name}
                  </Typography>
                  <Chip
                    label={item.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {item.size && (
                      <Chip
                        label={`Size: ${item.size}`}
                        size="small"
                        variant="filled"
                        sx={{ backgroundColor: "grey.100" }}
                      />
                    )}
                    {item.color && (
                      <Chip
                        label={`Color: ${item.color}`}
                        size="small"
                        variant="filled"
                        sx={{ backgroundColor: "grey.100" }}
                      />
                    )}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
