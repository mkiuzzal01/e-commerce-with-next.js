import { Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import React from "react";

interface CarouselProps {
  children: React.ReactNode;
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
}

export default function ReusableCarousel({
  children,
  autoplay = true,
  navigation = false,
  pagination = true,
  effect = "slide",
  speed = 600,
  spaceBetween = 0,
  loop = true,
  className = "",
  breakpoints,
}: CarouselProps) {
  const modules = [Pagination];

  if (navigation) modules.push(Navigation);
  if (autoplay) modules.push(Autoplay);
  if (effect === "fade") modules.push(EffectFade);

  const swiperConfig = {
    modules,
    pagination: pagination
      ? {
          clickable: true,
          dynamicBullets: true,
        }
      : false,
    navigation: navigation,
    autoplay: autoplay
      ? {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }
      : false,
    effect,
    speed,
    spaceBetween,
    loop,
    breakpoints,
    className: `mySwiper ${className}`,
    a11y: {
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      paginationBulletMessage: "Go to slide {{index}}",
    },
  };

  return <Swiper {...swiperConfig}>{children}</Swiper>;
}
