"use client"
import React from "react";
import ReusableCarousel from "../Shared/ReusableCarousel";
import { SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import { CreditCard, Gift, Truck } from "lucide-react";
const promos = [
  {
    icon: <Truck className="text-primary" size={28} />,
    title: "Free Shipping",
    subtitle: "On all orders over $50",
  },
  {
    icon: <Gift className="text-primary" size={28} />,
    title: "New Collection",
    subtitle: "Summer 2025 just dropped",
  },
  {
    icon: <CreditCard className="text-primary" size={28} />,
    title: "Secure Payments",
    subtitle: "Multiple payment options",
  },
];

export default function PromotionalBanners() {
  return (
    <div>
      <div className="container m-auto relative overflow-hidden">
        <ReusableCarousel
          autoplay={true}
          navigation={false}
          pagination={true}
          effect="slide"
          speed={800}
          loop={true}
        >
          {promos.map((promo, idx) => (
            <SwiperSlide key={idx}>
              <Box className="flex flex-col items-center justify-center border rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
                {promo.icon}
                <Typography variant="h6" className="font-semibold mt-2">
                  {promo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {promo.subtitle}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </ReusableCarousel>
      </div>
    </div>
  );
}
