"use client";
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  type ReactNode,
} from "react";
import { Swiper, type SwiperRef } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";

export interface CarouselRef {
  slideNext: () => void;
  slidePrev: () => void;
}

interface CarouselProps {
  children: ReactNode;
  autoplay?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  effect?: "slide" | "fade" | "cube" | "coverflow" | "flip";
  speed?: number;
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween?: number;
    };
  };
  centeredSlides?: boolean;
  slidesPerView?: "auto" | number;
}

const ReusableCarousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      autoplay = true,
      navigation = false,
      pagination = false,
      effect = "slide",
      speed = 600,
      spaceBetween = 0,
      loop = true,
      className = "",
      breakpoints,
      centeredSlides = false,
      slidesPerView = "auto",
    },
    ref
  ) => {
    const swiperRef = useRef<SwiperRef>(null);

    useImperativeHandle(ref, () => ({
      slideNext: () => swiperRef.current?.swiper?.slideNext(),
      slidePrev: () => swiperRef.current?.swiper?.slidePrev(),
    }));

    const modules = [Pagination, Navigation, Autoplay];
    if (effect === "fade") modules.push(EffectFade);
    if (effect === "coverflow") modules.push(EffectCoverflow);

    return (
      <Swiper
        ref={swiperRef}
        modules={modules}
        pagination={
          pagination
            ? {
                clickable: true,
                dynamicBullets: true,
              }
            : false
        }
        navigation={navigation}
        autoplay={
          autoplay
            ? {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        effect={effect}
        speed={speed}
        spaceBetween={spaceBetween}
        loop={loop}
        breakpoints={breakpoints}
        centeredSlides={centeredSlides}
        slidesPerView={slidesPerView}
        coverflowEffect={
          effect === "coverflow"
            ? {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 8,
                slideShadows: true,
              }
            : undefined
        }
        className={`mySwiper ${className}`}
      >
        {children}
      </Swiper>
    );
  }
);

ReusableCarousel.displayName = "ReusableCarousel";

export default ReusableCarousel;
