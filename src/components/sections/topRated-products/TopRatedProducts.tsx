/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Box, Typography } from "@mui/material";
import SectionHeader from "@/components/Shared/SectionHeader";
import { SwiperSlide } from "swiper/react";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import { useRef } from "react";
import CarouselArrows from "@/components/Shared/CarouselArrows";
import ProductCard2 from "@/utils/cards/ProductCard2";
import { TProduct } from "@/Types/ProductType";
import Loader from "@/utils/Loader";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";

const TopRatedProducts = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: {
      params: { totalRating: { $gte: 1 } },
    },
  });
  const topRatedProducts: TProduct[] = data?.data?.result || [];

  if (isLoading) return <Loader />;

  return (
    <Box className="bg-gray-50 py-16">
      <Box className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Top Rated"
          subTitle="Best Sellers"
          description="Explore our highest rated and most popular products chosen by our customers."
          alignment="center"
        />

        {topRatedProducts.length > 0 ? (
          <>
            <CarouselArrows
              onPrev={() => carouselRef.current?.slidePrev?.()}
              onNext={() => carouselRef.current?.slideNext?.()}
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
              {topRatedProducts.map((product: any) => (
                <SwiperSlide key={product?._id}>
                  <ProductCard2
                    viewLink={`/${product?.categories?.mainCategory?.name}/${product?.slug}`}
                    product={{
                      id: product?._id,
                      name: product?.title,
                      image: product?.productImage?.photo?.url,
                      price: product?.price,
                      rating: product?.totalRating,
                      showWishlist: false,
                    }}
                  />
                </SwiperSlide>
              ))}
            </ReusableCarousel>
          </>
        ) : (
          <Box className="text-center py-12">
            <Typography className="text-gray-500 text-lg font-medium">
              No top-rated products available at the moment.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TopRatedProducts;
