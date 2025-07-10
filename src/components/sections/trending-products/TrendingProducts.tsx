"use client";

import { useRef } from "react";
import { Box } from "@mui/material";
import { Flame } from "lucide-react";
import { trendingProducts } from "./TrendingProductData";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import SectionHeader from "@/components/Shared/SectionHeader";
import { SwiperSlide } from "swiper/react";
import ProductCard from "@/utils/cards/ProductCard1";
import SectionButton from "@/utils/buttons/sectionButton";
import CarouselArrows from "@/components/Shared/CarouselArrows";

export default function TrendingProducts() {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <Box className="py-6 bg-[#fff7f7]">
      <Box className="container mx-auto px-4">
        <Box className="text-center">
          <SectionHeader
            title="Trending Products"
            subTitle="Hot Picks"
            description="Explore the most talked-about items from our latest collection."
            icon={<Flame className="w-6 h-6 text-white" />}
            alignment="center"
          />
        </Box>
        <CarouselArrows
          onPrev={() => carouselRef.current?.slidePrev()}
          onNext={() => carouselRef.current?.slideNext()}
        />

        <ReusableCarousel
          ref={carouselRef}
          autoplay
          effect="slide"
          loop
          pauseOnMouseEnter
          spaceBetween={24}
          speed={1000}
          autoplayDelay={2000}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {trendingProducts.map((product) => (
            <SwiperSlide key={product?.id}>
              <ProductCard
                product={{
                  id: String(product?.id),
                  name: product?.name,
                  image: product?.image,
                  price: product?.price,
                  originalPrice: product?.originalPrice,
                }}
              />
            </SwiperSlide>
          ))}
        </ReusableCarousel>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 4,
          }}
        >
          <SectionButton
            link="/trending-products"
            title={"View All Trending Products"}
          />
        </Box>
      </Box>
    </Box>
  );
}
