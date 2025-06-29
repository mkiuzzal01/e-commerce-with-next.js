"use client";
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Tooltip,
  Stack,
} from "@mui/material";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import ReusableCarousel from "../../Shared/ReusableCarousel";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { trendingProducts } from "./TrendingProductData";

export default function TrendingProducts() {
  return (
    <div className="container mx-auto pt-10">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🔥 Trending Products
      </Typography>

      <ReusableCarousel
        navigation
        pagination={false}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          600: { slidesPerView: 2 },
          960: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {trendingProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Card>
              <div className="relative aspect-[3/2] transform transition-transform duration-500 hover:scale-105">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  placeholder="blur"
                  className="object-cover"
                  fill
                />
              </div>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {product.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <Typography variant="subtitle2" color="primary">
                    ৳{product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ৳{product.originalPrice}
                  </Typography>
                </Stack>
              </CardContent>

              {/* Action Icons */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  zIndex: 2,
                }}
              >
                <Tooltip title="Quick View">
                  <IconButton color="primary" size="small">
                    <Eye size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add to Wishlist">
                  <IconButton color="error" size="small">
                    <Heart size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add to Cart">
                  <IconButton color="success" size="small">
                    <ShoppingCart size={18} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </ReusableCarousel>
    </div>
  );
}
