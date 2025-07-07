"use client";

import React, { useRef, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Sparkles } from "lucide-react";
import { productData } from "./NewArrivalsData";
import SectionHeader from "@/components/Shared/SectionHeader";
import ReusableCarousel, {
  CarouselRef,
} from "@/components/Shared/ReusableCarousel";
import { SwiperSlide } from "swiper/react";
import CarouselArrows from "@/components/Shared/CarouselArrows";
import ProductCard2 from "@/utils/cards/ProductCard2";

const categories = ["All", "Women", "Men", "Kids", "Unisex"];

export default function NewArrivals() {
  const [selected, setSelected] = useState("All");
  const carouselRef = useRef<CarouselRef>(null);

  const filtered =
    selected === "All"
      ? productData
      : productData.filter((p) => p.category === selected);

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

        <Box className="flex flex-col md:flex-row items-center justify-between ">
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
              {categories.map((cat) => (
                <Tab key={cat} label={cat} value={cat} />
              ))}
            </Tabs>
          </Box>

          <CarouselArrows
            onPrev={() => carouselRef?.current?.slidePrev()}
            onNext={() => carouselRef?.current?.slideNext()}
          />
        </Box>

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
          {filtered.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard2
                product={{
                  id: String(product?.id),
                  name: product?.name,
                  image: product?.image,
                  price: product?.price,
                }}
              />
            </SwiperSlide>
          ))}
        </ReusableCarousel>
      </Box>
    </Box>
  );
}
