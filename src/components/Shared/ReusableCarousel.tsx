import Slider from "react-slick";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function ReusableCarousel({ children }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    customPaging: (i) => (
      <div className="w-3 h-3 bg-white/50 rounded-full hover:bg-white transition-colors duration-300"></div>
    ),
    dotsClass: "slick-dots !bottom-6 !flex !justify-center !gap-2",
  };
  return <Slider {...settings}>{children}</Slider>;
}
