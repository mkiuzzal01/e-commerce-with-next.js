"use client";

import { Box, Rating, Typography, IconButton, Button } from "@mui/material";
import Image from "next/image";
import SectionHeader from "@/components/Shared/SectionHeader";
import { topRatedProducts } from "./TopRatedProductsData";
import { SwiperSlide } from "swiper/react";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const TopRatedProducts = () => {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <Box className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Top Rated"
          subTitle="🌟 Best Sellers"
          description="Explore our highest rated and most popular products chosen by our customers."
          alignment="center"
        />

        {/* Controls */}
        <Box className="flex justify-start mb-6 gap-3">
          <IconButton
            onClick={() => carouselRef.current?.slidePrev()}
            className="bg-white shadow-md hover:bg-[var(--color-brand-primary)] hover:text-white transition"
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => carouselRef.current?.slideNext()}
            className="bg-white shadow-md hover:bg-[var(--color-brand-primary)] hover:text-white transition"
          >
            <ChevronRight />
          </IconButton>
        </Box>

        {/* Carousel */}
        <ReusableCarousel
          ref={carouselRef}
          autoplay={false}
          pagination={false}
          navigation={false}
          loop={false}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {topRatedProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end h-full">
                  {/* Product Name */}
                  <Typography
                    variant="h6"
                    className="text-white font-semibold line-clamp-1"
                  >
                    {product.name}
                  </Typography>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Rating
                      value={product.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ color: "#FF6B6B" }}
                    />
                    <Typography variant="body2" className="text-gray-300">
                      ({product.reviewCount})
                    </Typography>
                  </div>

                  {/* Price */}
                  <Typography
                    variant="subtitle1"
                    className="text-white font-bold"
                  >
                    ${product.price.toFixed(2)}
                  </Typography>

                  {/* CTA */}
                  <Button
                    fullWidth
                    variant="contained"
                    className="btn-primary !mt-2 !text-white !text-sm !rounded-md"
                    onClick={() => console.log("Add to cart", product._id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </ReusableCarousel>
      </div>
    </Box>
  );
};

export default TopRatedProducts;
