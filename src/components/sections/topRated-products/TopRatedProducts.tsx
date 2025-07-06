"use client";

import { Box } from "@mui/material";
import SectionHeader from "@/components/Shared/SectionHeader";
import { topRatedProducts } from "./TopRatedProductsData";
import { SwiperSlide } from "swiper/react";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import { useRef } from "react";
import CarouselArrows from "@/components/Shared/CarouselArrows";
import ProductCard2 from "@/utils/cards/ProductCard2";

const TopRatedProducts = () => {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <Box className="bg-gray-50 py-16">
      <Box className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Top Rated"
          subTitle="🌟 Best Sellers"
          description="Explore our highest rated and most popular products chosen by our customers."
          alignment="center"
        />

        <CarouselArrows
          onPrev={() => carouselRef.current?.slidePrev()}
          onNext={() => carouselRef.current?.slideNext()}
        />
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
            <SwiperSlide key={product?._id}>
              <ProductCard2
                product={{
                  id: product?._id,
                  name: product?.name,
                  image: product?.image,
                  price: product?.price,
                  rating: product?.rating,
                  showWishlist: false
                }}
              />
            </SwiperSlide>
          ))}
        </ReusableCarousel>
      </Box>
    </Box>
  );
};

export default TopRatedProducts;
