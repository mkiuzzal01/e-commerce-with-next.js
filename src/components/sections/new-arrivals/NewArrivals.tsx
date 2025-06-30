"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import { Heart, ShoppingCart, Sparkles } from "lucide-react";
import Image from "next/image";
import { productData } from "./NewArrivalsData";
import SectionHeader from "@/components/Shared/SectionHeader";
import ReusableCarousel from "@/components/Shared/ReusableCarousel";
import { SwiperSlide } from "swiper/react";

const categories = ["All", "Women", "Men", "Kids", "Unisex"];

export default function NewArrivals() {
  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All"
      ? productData
      : productData.filter((p) => p.category === selected);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          title="New Arrivals"
          subTitle="🆕 Latest Trends"
          description="Discover the newest additions to our store"
          icon={<Sparkles className="w-5 h-5 text-white" />}
          alignment="center"
        />

        {/* Tabs */}
        <Box display="flex" justifyContent="flex-end" mb={6}>
          <Tabs
            value={selected}
            onChange={(_, newVal) => setSelected(newVal)}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 2,
                background: "linear-gradient(90deg, #FF6B6B 0%, #FFD93D 100%)",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                px: 2,
                mx: 0.5,
                borderRadius: 2,
                transition: "background-color 0.3s ease",
              },
              "& .MuiTab-root:hover": {
                bgcolor: "rgba(255,107,107,0.1)",
              },
              "& .Mui-selected": {
                color: "primary.main",
                bgcolor: "rgba(255,107,107,0.15)",
              },
            }}
          >
            {categories.map((cat) => (
              <Tab key={cat} label={cat} value={cat} />
            ))}
          </Tabs>
        </Box>

        {/* Product Carousel */}
        <ReusableCarousel
          autoplay={false}
          pagination={false}
          navigation
          loop={false}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {filtered.map((product) => (
            <SwiperSlide key={product.id}>
              <Card
                sx={{
                  minWidth: 260,
                  maxWidth: 320,
                  height: "100%",
                  borderRadius: 4,
                  boxShadow:
                    "0 4px 15px rgba(255,107,107,0.15), 0 1px 3px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      "0 10px 25px rgba(255,107,107,0.3), 0 4px 6px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {/* Image container */}
                <Box className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />

                  {/* Glassmorphism overlay for info */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      color: "#222",
                      p: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      noWrap
                      sx={{
                        textShadow: "0 1px 4px rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      fontWeight="bold"
                      color="primary"
                      sx={{
                        textShadow: "0 1px 4px rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      ৳{product.price.toLocaleString()}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCart size={18} />}
                        fullWidth
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: "0 2px 12px rgb(255 107 107 / 0.4)",
                          transition:
                            "background-color 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            bgcolor: "primary.dark",
                            boxShadow: "0 4px 20px rgb(255 107 107 / 0.7)",
                          },
                        }}
                      >
                        Add to Cart
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          minWidth: 40,
                          p: 1,
                          borderWidth: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: "error.main",
                            color: "#fff",
                            borderWidth: 2,
                          },
                        }}
                      >
                        <Heart size={20} />
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
