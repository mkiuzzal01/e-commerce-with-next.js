"use client";
import Image from "next/image";
import { useCallback } from "react";
import ReusableCarousel from "../Shared/ReusableCarousel";
import { bannerData, type BannerItem } from "./BannerData";
import { SwiperSlide } from "swiper/react";

export default function Banner() {
  const handleButtonClick = useCallback((item: BannerItem) => {
    // Add your button click logic here
    console.log(`Button clicked for: ${item.title}`);
    // Example: router.push(item.link) or any other action
  }, []);

  return (
    <section
      className="bg-gradient-to-r from-black/40 via-black/20 to-transparent z-[1]"
      aria-label="Featured content carousel"
    >
      <div className="container m-auto relative overflow-hidden">
        <ReusableCarousel
          autoplay={true}
          navigation={false}
          pagination={true}
          effect="slide"
          speed={800}
          loop={true}
        >
          {bannerData.map((item, index) => (
            <SwiperSlide key={item.id}>
              <article className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                {/* Content Container */}
                <div className="relative z-[2] h-full flex items-center">
                  <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                      {/* Left Side - Text Content */}
                      <div className="text-y space-y-6 animate-fade-in-left">
                        {/* Offer Badge */}
                        {item.offer && (
                          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
                            </span>
                            {item.offer}
                          </div>
                        )}

                        {/* Subtitle */}
                        {item.subtitle && (
                          <div className="text-sm font-semibold tracking-widest text-yellow-400 uppercase">
                            {item.subtitle}
                          </div>
                        )}

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {item.title}
                        </h1>

                        {/* Description */}
                        <p className="paragraph text-lg md:text-xl leading-relaxed max-w-lg opacity-90 text-gray-200">
                          {item.description}
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <button
                            onClick={() => handleButtonClick(item)}
                            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
                            aria-label={`${item.buttonLabel} - ${item.title}`}
                          >
                            {item.buttonLabel}
                            <svg
                              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Right Side - Image */}
                      <div className="hidden lg:flex justify-end items-center">
                        <div className="w-full max-w-md relative">
                          {/* Decorative background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full blur-3xl" />

                          <div className="relative aspect-[3/4] transform transition-transform duration-500 hover:scale-105">
                            <Image
                              src={item.image}
                              alt={item.title}
                              priority={index === 0}
                              placeholder="blur"
                              className="object-cover"
                              fill
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </ReusableCarousel>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />
    </section>
  );
}
