"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { ShoppingBag } from "@mui/icons-material";
import ReusableCarousel from "../Shared/ReusableCarousel";
import { PromotionalBannerData } from "./PromotionalBannerData";
import SectionHeader from "../Shared/SectionHeader";

export default function PromotionalBanners() {
  return (
    <Box component="section" className="relative overflow-hidden py-6 bg-white">
      <Box className="absolute inset-0 bg-[radial-gradient(circle,rgba(150,150,150,0.1)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
      <Box
        className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full pointer-events-none"
        sx={{
          background:
            "linear-gradient(135deg, rgba(254,103,49,0.15), rgba(193,39,45,0.15))",
          filter: "blur(60px)",
          opacity: 0.6,
        }}
      />
      <Box
        className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full pointer-events-none"
        sx={{
          background:
            "linear-gradient(135deg, rgba(254,103,49,0.1), rgba(193,39,45,0.1))",
          filter: "blur(80px)",
          opacity: 0.4,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box mb={3}>
          <SectionHeader
            title="Exceptional Shopping Experience"
            subTitle="Why Choose Us"
            description="Discover why millions of customers trust us for their shopping needs"
            icon={<ShoppingBag />}
            alignment="center"
          />
        </Box>
        <Box mb={5}>
          <ReusableCarousel
            autoplay
            pauseOnMouseEnter={true}
            autoplayDelay={2000}
            speed={500}
            loop
            effect="slide"
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {PromotionalBannerData.map((promo, idx) => (
              <SwiperSlide key={idx}>
                <Card
                  className="transition-transform duration-300 ease-in-out shadow-lg -translate-y-1"
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    "&:hover .promo-indicator": {
                      transform: "scaleX(1)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      flex: 1,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))",
                      }}
                    >
                      {promo.icon}
                    </Box>

                    {/* Text */}
                    <Stack spacing={2} alignItems="center" sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "var(--color-brand-background)",
                        }}
                      >
                        {promo.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--color-brand-paragraph)",
                          fontSize: "1rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {promo.subtitle}
                      </Typography>
                    </Stack>

                    {/* Indicator */}
                    <Box
                      className="promo-indicator"
                      sx={{
                        mt: 3,
                        width: 60,
                        height: 4,
                        borderRadius: 2,
                        background:
                          "linear-gradient(90deg, var(--color-brand-primary), var(--color-brand-secondary))",
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </ReusableCarousel>
        </Box>
      </Container>
    </Box>
  );
}
