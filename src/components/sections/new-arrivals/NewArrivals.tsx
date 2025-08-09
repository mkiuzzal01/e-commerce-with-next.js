/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { Sparkles } from "lucide-react";
import SectionHeader from "@/components/Shared/SectionHeader";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import { SwiperSlide } from "swiper/react";
import CarouselArrows from "@/components/Shared/CarouselArrows";
import ProductCard2 from "@/utils/cards/ProductCard2";
import Loader from "@/utils/Loader";
import { TProduct } from "@/Types/ProductType";
import { useAllMainCategoryQuery } from "@/redux/features/category/category.Api";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";

export default function NewArrivals() {
  const { data, isLoading: isMainCategoryLoading } = useAllMainCategoryQuery(
    {}
  );
  const [selected, setSelected] = useState<string>("");
  const carouselRef = useRef<CarouselRef>(null);

  const mainCategory = data?.data?.result || [];

  const { data: products, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: {
      params: selected ? { "categories.mainCategory": selected } : {},
    },
  });

  const newArrivalProducts: TProduct[] = products?.data?.result || [];

  if (isLoading || isMainCategoryLoading) return <Loader />;

  return (
    <Box className="py-6 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Box className="container mx-auto px-4">
        <SectionHeader
          title="New Arrivals"
          subTitle="Latest Trends"
          description="Discover the newest additions to our store"
          icon={<Sparkles className="w-5 h-5 text-white" />}
          alignment="center"
        />

        <Box className="flex flex-col md:flex-row items-center justify-between mb-4">
          <Box display="flex" justifyContent="center">
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
              {mainCategory.map((cat: any) => (
                <Tab
                  key={cat?._id}
                  label={cat?.name.toUpperCase()}
                  value={cat?._id}
                />
              ))}
            </Tabs>
          </Box>

          <CarouselArrows
            onPrev={() => carouselRef?.current?.slidePrev()}
            onNext={() => carouselRef?.current?.slideNext()}
          />
        </Box>

        {newArrivalProducts.length === 0 ? (
          <Box className="text-center py-12">
            <Typography className="text-gray-500 text-lg font-medium">
              No new arrivals products available right now.
            </Typography>
          </Box>
        ) : (
          <ReusableCarousel
            ref={carouselRef}
            autoplay={false}
            pagination={false}
            navigation={false}
            loop={false}
            spaceBetween={5}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {newArrivalProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard2
                  product={{
                    id: product._id,
                    name: product.title,
                    image: product.productImage?.photo?.url,
                    price: product.price,
                  }}
                />
              </SwiperSlide>
            ))}
          </ReusableCarousel>
        )}
      </Box>
    </Box>
  );
}
