"use client";
import React, { useEffect, useState, useRef } from "react";
import { Typography, Chip, Box } from "@mui/material";
import { Zap } from "lucide-react";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import SectionHeader from "@/components/Shared/SectionHeader";
import { SwiperSlide } from "swiper/react";
import CarouselArrows from "@/components/Shared/CarouselArrows";
import ProductCard from "@/utils/cards/ProductCard1";
import SectionButton from "@/utils/buttons/sectionButton";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import Loader from "@/utils/Loader";
import { TProduct } from "@/Types/ProductType";

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
  const SALE_END = "2025-12-31T23:59:59";
  const carouselRef = useRef<CarouselRef>(null);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(SALE_END));
  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: {
      params: { productPlace: "flash-sale" },
      activity: "market-launch",
    },
  });
  const flashSaleProducts: TProduct[] = data?.data?.result || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(SALE_END));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <Loader />;

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
            mb: 3,
          }}
        >
          <Box display="flex" gap={2} alignItems="center">
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
          </Box>

          <CarouselArrows
            onPrev={() => carouselRef.current?.slidePrev?.()}
            onNext={() => carouselRef.current?.slideNext?.()}
          />
        </Box>

        {flashSaleProducts.length > 0 ? (
          <>
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
              {flashSaleProducts.map((product) => (
                <SwiperSlide key={product?._id}>
                  <ProductCard
                    viewLink={`/flash-sale/${product?.slug}`}
                    product={{
                      id: product?._id,
                      name: product?.title,
                      image: product?.productImage?.photo?.url,
                      price: product?.price,
                      discount: product?.discount,
                    }}
                  />
                </SwiperSlide>
              ))}
            </ReusableCarousel>

            <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
              <SectionButton link="/flash-sale" title="View All Products" />
            </Box>
          </>
        ) : (
          <Box className="text-center py-12">
            <Typography className="text-gray-500 text-lg font-medium">
              No flash sale products available right now.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
