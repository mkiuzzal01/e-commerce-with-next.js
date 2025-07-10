"use client";

import React, { useEffect, useState, useRef } from "react";
import { Typography, Stack, Chip, Box } from "@mui/material";
import { Zap } from "lucide-react";
import { flashProducts } from "./flashProductsData";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import SectionHeader from "@/components/Shared/SectionHeader";
import { SwiperSlide } from "swiper/react";
import CarouselArrows from "@/components/Shared/CarouselArrows";
import ProductCard from "@/utils/cards/ProductCard1";
import SectionButton from "@/utils/buttons/sectionButton";

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
    <Box className="py-6">
      <Box className="container mx-auto px-4">
        <SectionHeader
          title="Flash Sale"
          subTitle="Today’s Deals"
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

          <CarouselArrows
            onPrev={() => carouselRef.current?.slidePrev?.()}
            onNext={() => carouselRef.current?.slideNext?.()}
          />
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
              <SwiperSlide key={product?.id}>
                <ProductCard
                  product={{
                    id: product?.id?.toString(),
                    name: product?.name,
                    image: product?.image,
                    price: product?.price,
                    originalPrice: product?.originalPrice,
                  }}
                />
              </SwiperSlide>
            ))}
          </ReusableCarousel>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 4,
          }}
        >
          <SectionButton link="/flash-sale" title={"View All Products"} />
        </Box>
      </Box>
    </Box>
  );
}
