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
  const [selected, setSelected] = useState<string>("all"); // Default "ALL"
  const carouselRef = useRef<CarouselRef>(null);

  const mainCategory = data?.data?.result || [];

  // Add ALL tab manually at the start
  const tabs = [{ _id: "all", name: "All" }, ...mainCategory];

  // Products query - no filter if "all"
  const { data: products, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: {
      params:
        selected && selected !== "all"
          ? { "categories.mainCategory": selected }
          : {},
      activity: "market-launch",
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

        {/* Tabs + Arrows */}
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
              {tabs.map((cat) => (
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

        {/* Product List */}
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
            {newArrivalProducts.map((item) => (
              <SwiperSlide key={item?._id}>
                <ProductCard2
                  viewLink={`/${selected}/${item?.slug}`}
                  product={{
                    id: item?._id,
                    name: item?.title,
                    image: item?.productImage?.photo?.url,
                    price: item?.price,
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
