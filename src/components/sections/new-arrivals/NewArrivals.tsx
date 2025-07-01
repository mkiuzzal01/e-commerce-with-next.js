"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import {
  Heart,
  ShoppingCart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { productData } from "./NewArrivalsData";
import SectionHeader from "@/components/Shared/SectionHeader";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import { SwiperSlide } from "swiper/react";

const categories = ["All", "Women", "Men", "Kids", "Unisex"];

export default function NewArrivals() {
  const [selected, setSelected] = useState("All");
  const carouselRef = useRef<CarouselRef>(null);

  const filtered =
    selected === "All"
      ? productData
      : productData.filter((p) => p.category === selected);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="New Arrivals"
          subTitle="🆕 Latest Trends"
          description="Discover the newest additions to our store"
          icon={<Sparkles className="w-5 h-5 text-white" />}
          alignment="center"
        />

        <Box sx={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
        }}>
          {/* Tabs */}
          <Box display="flex" justifyContent="center" mb={6}>
            <Tabs
              value={selected}
              onChange={(_, newVal) => setSelected(newVal)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: 2,
                  background:
                    "linear-gradient(90deg, #FF6B6B 0%, #FFD93D 100%)",
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(255,107,107,0.1)",
                },
              }}
            >
              {categories.map((cat) => (
                <Tab key={cat} label={cat} value={cat} />
              ))}
            </Tabs>
          </Box>

          {/* Pagination Controls */}
          <Box display="flex" justifyContent="flex-end" mb={3} gap={1}>
            <IconButton
              onClick={() => carouselRef.current?.slidePrev()}
              sx={{
                bgcolor: "#fff",
                boxShadow: 2,
                "&:hover": { bgcolor: "primary.light", color: "white" },
              }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={() => carouselRef.current?.slideNext()}
              sx={{
                bgcolor: "#fff",
                boxShadow: 2,
                "&:hover": { bgcolor: "primary.light", color: "white" },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        {/* Carousel */}
        <ReusableCarousel
          ref={carouselRef}
          autoplay={false}
          pagination={false}
          navigation={false}
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
                  maxWidth: 320,
                  height: "100%",
                  borderRadius: 4,
                  boxShadow:
                    "0 4px 15px rgba(255,107,107,0.15), 0 1px 3px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 10px 25px rgba(255,107,107,0.3), 0 4px 6px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
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
                      sx={{ textShadow: "0 1px 4px rgba(255, 255, 255, 0.6)" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      fontWeight="bold"
                      color="primary"
                      sx={{ textShadow: "0 1px 4px rgba(255, 255, 255, 0.7)" }}
                    >
                      ৳{product.price.toLocaleString()}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<ShoppingCart size={18} />}
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: "0 2px 12px rgb(255 107 107 / 0.4)",
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
                          "&:hover": {
                            bgcolor: "error.main",
                            color: "#fff",
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
