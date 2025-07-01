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
import { ShoppingCart, Eye, Heart, Flame } from "lucide-react";
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
    <section className="py-6 bg-[#fff7f7]">
      <div className="container mx-auto px-4">
        <div className="text-center">
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
          <IconButton className="hover:btn-primary">
            <ArrowBackIosNew
              fontSize="small"
              onClick={() => carouselRef.current?.slidePrev()}
            />
          </IconButton>
          <IconButton className=" hover:btn-primary">
            <ArrowForwardIos
              fontSize="small"
              onClick={() => carouselRef.current?.slideNext()}
            />
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
              <Card className="h-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
                {/* Image */}
                <Box className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Badges */}
                  <Box className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.isNew && (
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    <span className="bg-[var(--color-brand-secondary)] text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  </Box>

                  {/* Overlay Content */}
                  <Box className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.6)] text-white p-4 flex flex-col gap-2">
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      className="line-clamp-1 text-white"
                    >
                      {product.name}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight="bold" className="text-white">
                        ৳{product.price.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="line-through text-white/70"
                      >
                        ৳{product.originalPrice.toLocaleString()}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} mt={1}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<ShoppingCart size={18} />}
                        className="!text-white !border-white !bg-white/20 hover:!bg-white/30"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="whitespace-nowrap"
                      >
                        Buy Now
                      </Button>
                    </Stack>
                  </Box>

                  {/* Action Buttons */}
                  <Box className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <IconButton className="bg-white hover:bg-blue-50">
                      <Eye className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                    </IconButton>
                    <IconButton
                      onClick={() => toggleWishlist(product.id)}
                      className={`bg-white ${
                        wishlistItems.has(product.id)
                          ? "text-[var(--color-brand-secondary)]"
                          : "hover:bg-red-50 text-gray-600 hover:text-[var(--color-brand-secondary)]"
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-primary">View All Trending Products</button>
        </div>
      </div>
    </section>
  );
}
