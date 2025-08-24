"use client";

import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  type ReactNode,
  useState,
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

export interface CarouselProps {
  children: ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnMouseEnter?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  effect?: "slide" | "fade" | "coverflow";
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
      autoplayDelay = 2500,
      pauseOnMouseEnter = true,
      navigation = false,
      pagination = false,
      effect = "slide",
      speed = 500,
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
    const [isReady, setIsReady] = useState(false);

    // Expose next/prev methods
    useImperativeHandle(ref, () => ({
      slideNext: () => swiperRef.current?.swiper?.slideNext(),
      slidePrev: () => swiperRef.current?.swiper?.slidePrev(),
    }));

    // Dynamically add effect modules
    const modules = [Pagination, Navigation, Autoplay];
    if (effect === "fade") modules.push(EffectFade);
    if (effect === "coverflow") modules.push(EffectCoverflow);

    return (
      <Swiper
        onSwiper={() => setIsReady(true)}
        ref={swiperRef}
        modules={modules}
        effect={effect}
        speed={speed}
        loop={loop}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        centeredSlides={centeredSlides}
        breakpoints={breakpoints}
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter,
              }
            : false
        }
        navigation={navigation}
        pagination={
          pagination
            ? {
                clickable: true,
                dynamicBullets: true,
              }
            : false
        }
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
        {isReady && children}
      </Swiper>
    );
  }
);

ReusableCarousel.displayName = "ReusableCarousel";

export default ReusableCarousel;
