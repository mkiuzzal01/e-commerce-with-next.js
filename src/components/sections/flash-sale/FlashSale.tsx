"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import { ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import { flashProducts } from "./flashProductsData";
import ReusableCarousel from "@/components/Shared/ReusableCarousel";
import SectionHeader from "@/components/Shared/SectionHeader";
import { SwiperSlide } from "swiper/react";

const calculateTimeLeft = (target: string) => {
  const difference = +new Date(target) - +new Date();
  let timeLeft = {
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    timeLeft = {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  return timeLeft;
};

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft("2025-06-20T23:59:59")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft("2025-06-20T23:59:59"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with countdown */}
        <Box display="flex" flexDirection="column" gap={2} mb={6}>
          <SectionHeader
            title="Flash Sale"
            subTitle="⚡ Today’s Deals"
            description="Grab your favorite items before the timer runs out."
            icon={<Zap className="w-6 h-6 text-white" />}
            alignment="center"
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight="medium">Ends in:</Typography>
            <Chip
              label={`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
              color="error"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
            />
          </Stack>
        </Box>

        {/* Product Carousel */}
        <ReusableCarousel
          autoplay
          navigation
          pagination={false}
          loop
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {flashProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative", // make card relative for absolute children if needed
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    placeholder="blur"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    fill
                  />

                  {/* Overlay content absolutely positioned */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: "rgba(0,0,0,0.6)", // semi-transparent black background
                      color: "white",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      className="line-clamp-1"
                      sx={{ color: "white" }}
                    >
                      {product.name}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight="bold" sx={{ color: "white" }}>
                        ৳{product.price.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        ৳{product.originalPrice.toLocaleString()}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<ShoppingCart size={18} />}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.15)",
                          color: "white",
                          borderColor: "white",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Buy Now
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </ReusableCarousel>
      </div>
    </section>
  );
}
