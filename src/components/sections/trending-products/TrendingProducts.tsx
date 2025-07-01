"use client";

import { useRef, useState } from "react";
import {
  Typography,
  Button,
  Card,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import {
  ShoppingCart,
  Eye,
  Heart,
  Flame,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { trendingProducts } from "./TrendingProductData";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import SectionHeader from "@/components/Shared/SectionHeader";
import { SwiperSlide } from "swiper/react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

export default function TrendingProducts() {
  const [wishlistItems, setWishlistItems] = useState<Set<number>>(new Set());
  const carouselRef = useRef<CarouselRef>(null);

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) => {
      const updated = new Set(prev);
      updated.has(productId)
        ? updated.delete(productId)
        : updated.add(productId);
      return updated;
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeader
            title="Trending Products"
            subTitle="Hot Picks"
            description="Explore the most talked-about items from our latest collection."
            icon={<Flame className="w-6 h-6 text-white" />}
            alignment="center"
          />
        </div>

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

        <ReusableCarousel
          ref={carouselRef}
          autoplay={false}
          pagination={false}
          navigation={false}
          effect="slide"
          loop
          spaceBetween={24}
          speed={1000}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {trendingProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <Box className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  </Box>

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

                  <Box className="absolute top-4 right-4 flex flex-col gap-2">
                    <IconButton className="bg-white hover:bg-blue-50">
                      <Eye className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                    </IconButton>
                    <IconButton
                      onClick={() => toggleWishlist(product.id)}
                      className={`bg-white ${
                        wishlistItems.has(product.id)
                          ? "text-red-500"
                          : "hover:bg-red-50 text-gray-600 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlistItems.has(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </ReusableCarousel>

        <div className="text-center mt-12">
          <button className="btn-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            View All Trending Products
          </button>
        </div>
      </div>
    </section>
  );
}
