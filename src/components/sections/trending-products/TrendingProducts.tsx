"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Flame } from "lucide-react";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import SectionHeader from "@/components/Shared/SectionHeader";
import { SwiperSlide } from "swiper/react";
import ProductCard1 from "@/utils/cards/ProductCard1";
import SectionButton from "@/utils/buttons/sectionButton";
import CarouselArrows from "@/components/Shared/CarouselArrows";
import Loader from "@/utils/Loader";
import { TProduct } from "@/Types/ProductType";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";

export default function TrendingProducts() {
  const carouselRef = useRef<CarouselRef>(null);
  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: {
      params: { productPlace: "trending" },
      activity: "market-launch",
    },
  });
  const trendingProducts: TProduct[] = data?.data?.result || [];

  if (isLoading) return <Loader />;

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

        {trendingProducts.length > 0 ? (
          <>
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
                <SwiperSlide key={product?._id}>
                  <ProductCard1
                    viewLink={`/trending-products/${product?.slug}`}
                    product={{
                      id: String(product?._id),
                      name: product?.title,
                      image: product?.productImage?.photo?.url,
                      price: product?.price,
                      discount: product?.discount,
                    }}
                  />
                </SwiperSlide>
              ))}
            </ReusableCarousel>

            <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
              <SectionButton
                link="/trending-products"
                title="View All Trending Products"
              />
            </Box>
          </>
        ) : (
          <Box className="text-center py-12">
            <Typography className="text-gray-500 text-lg font-medium">
              No products available
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
