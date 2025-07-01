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
  useTheme,
  alpha,
  Fade,
} from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { ShoppingBag } from "@mui/icons-material";
import ReusableCarousel from "../Shared/ReusableCarousel";
import { PromotionalBannerData } from "./PromotionalBannerData";
import SectionHeader from "../Shared/SectionHeader";

export default function PromotionalBanners() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.grey[50], 0.8)} 0%, 
          ${alpha(theme.palette.common.white, 0.9)} 50%, 
          ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${alpha(
            theme.palette.grey[300],
            0.3
          )} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />

      {/* Floating Gradient Orbs */}
      <Box
        sx={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 300,
          height: 300,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.light,
            0.1
          )}, ${alpha(theme.palette.secondary.light, 0.1)})`,
          borderRadius: "50%",
          filter: "blur(60px)",
          opacity: 0.6,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          left: 40,
          width: 400,
          height: 400,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.warning.light,
            0.1
          )}, ${alpha(theme.palette.error.light, 0.1)})`,
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.4,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ mb: 6 }}>
          <SectionHeader
            title="Exceptional Shopping Experience"
            subTitle="Why Choose Us"
            description="Discover why millions of customers trust us for their shopping needs"
            icon={<ShoppingBag />}
            alignment="center"
          />
        </Box>

        {/* Promotional Cards Carousel */}
        <Box sx={{ mb: 8 }}>
          <ReusableCarousel
            autoplay={true}
            navigation={false}
            pagination={false}
            effect="slide"
            speed={800}
            loop={true}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              600: { slidesPerView: 2, spaceBetween: 20 },
              900: { slidesPerView: 3, spaceBetween: 24 },
              1200: { slidesPerView: 4, spaceBetween: 32 },
            }}
          >
            {PromotionalBannerData.map((promo, idx) => (
              <SwiperSlide key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 1,
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      textAlign: "center",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className="promo-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        color: theme.palette.common.white,
                      }}
                    >
                      {promo.icon}
                    </Box>

                    {/* Content */}
                    <Stack spacing={2} alignItems="center" sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          transition: "color 0.3s ease",
                        }}
                      >
                        {promo.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                          fontSize: "1rem",
                        }}
                      >
                        {promo.subtitle}
                      </Typography>
                    </Stack>

                    {/* Hover effect indicator */}
                    <Box
                      className="promo-indicator"
                      sx={{
                        mt: 3,
                        width: 60,
                        height: 4,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: 2,
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition:
                          "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </ReusableCarousel>
        </Box>

        {/* Bottom CTA Section */}
        <Box sx={{ textAlign: "center" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                minWidth: 200,
                py: 2,
                px: 4,
                borderRadius: 6,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: `0 8px 24px ${alpha(
                  theme.palette.primary.main,
                  0.25
                )}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 32px ${alpha(
                    theme.palette.primary.main,
                    0.35
                  )}`,
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}
            >
              Start Shopping
            </Button>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                display: { xs: "none", sm: "block" },
              }}
            >
              or
            </Typography>

            <Button
              variant="outlined"
              size="large"
              sx={{
                minWidth: 200,
                py: 2,
                px: 4,
                borderRadius: 6,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                borderWidth: 2,
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderWidth: 2,
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 24px ${alpha(
                    theme.palette.primary.main,
                    0.15
                  )}`,
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
