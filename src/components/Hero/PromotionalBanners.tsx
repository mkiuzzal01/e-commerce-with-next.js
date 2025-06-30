"use client";
import React from "react";
import ReusableCarousel from "../Shared/ReusableCarousel";
import { SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import { CreditCard, Gift, Truck } from "lucide-react";

const promos = [
  {
    icon: <Truck color="#1976d2" size={28} />,
    title: "Free Shipping",
    subtitle: "On all orders over $50",
  },
  {
    icon: <Gift color="#1976d2" size={28} />,
    title: "New Collection",
    subtitle: "Summer 2025 just dropped",
  },
  {
    icon: <CreditCard color="#1976d2" size={28} />,
    title: "Secure Payments",
    subtitle: "Multiple payment options",
  },
];

export default function PromotionalBanners() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <ReusableCarousel
          autoplay
          navigation={false}
          pagination
          effect="slide"
          speed={800}
          loop
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {promos.map((promo, idx) => (
            <SwiperSlide key={idx}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  boxShadow: 1,
                  p: 4,
                  textAlign: "center",
                  transition: "box-shadow 0.3s ease",
                  bgcolor: "background.paper",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                {promo.icon}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", mt: 2, color: "text.primary" }}
                >
                  {promo.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 0.5 }}
                >
                  {promo.subtitle}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </ReusableCarousel>
      </div>
    </section>
  );
}
