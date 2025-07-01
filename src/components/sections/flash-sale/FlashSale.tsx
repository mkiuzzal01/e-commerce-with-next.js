"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Button,
  Card,
  Stack,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { ShoppingCart, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { flashProducts } from "./flashProductsData";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import SectionHeader from "@/components/Shared/SectionHeader";
import { SwiperSlide } from "swiper/react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  if (difference <= 0) {
    return { hours: "00", minutes: "00", seconds: "00" };
  }

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

export default function FlashSale() {
  const SALE_END = "2025-06-20T23:59:59";
  const carouselRef = useRef<CarouselRef>(null);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(SALE_END));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(SALE_END));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Flash Sale"
          subTitle="⚡ Today’s Deals"
          description="Grab your favorite items before the timer runs out."
          icon={<Zap className="w-6 h-6 text-white" />}
          alignment="center"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            mb={6}
            alignItems="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="body1"
                fontWeight="medium"
                color="text.primary"
              >
                Ends in:
              </Typography>
              <Chip
                label={`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
                color="error"
                sx={{ fontWeight: "bold", fontSize: "1rem", minWidth: 90 }}
              />
            </Stack>
          </Box>

          {/* Pagination Buttons */}
          <Stack direction="row" spacing={2} justifyContent="end" my={4}>
            <IconButton
              onClick={() => carouselRef.current?.slidePrev()}
              sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}
            >
              <ArrowBackIosNew fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => carouselRef.current?.slideNext()}
              sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Box position="relative">
          <ReusableCarousel
            ref={carouselRef}
            autoplay
            navigation={false}
            pagination={false}
            loop
            spaceBetween={24}
            speed={800}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {flashProducts.map((product) => (
              <SwiperSlide key={product.id}>
                {/* Card Content (same as before) */}
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: 3,
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Box className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      placeholder="blur"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Overlay content */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="600" noWrap>
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
                          color="primary"
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
        </Box>
      </div>
    </section>
  );
}
