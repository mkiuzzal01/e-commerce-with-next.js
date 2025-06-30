"use client";
import Image from "next/image";
import { useCallback } from "react";
import ReusableCarousel from "../Shared/ReusableCarousel";
import { bannerData, type BannerItem } from "./BannerData";
import { SwiperSlide } from "swiper/react";

export default function Banner() {
  const handleButtonClick = useCallback((item: BannerItem) => {
    console.log(`Button clicked for: ${item.title}`);
  }, []);

  return (
    <section
      className="relative third-color overflow-hidden"
      aria-label="Featured product collections"
    >
      <div className="relative z-10">
        <ReusableCarousel
          autoplay={true}
          navigation={true}
          pagination={true}
          effect="slide"
          speed={1000}
          loop={true}
        >
          {bannerData.map((item, index) => (
            <SwiperSlide key={item.id}>
              <article className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
                      <div className="space-y-6 lg:space-y-8">
                        {item.offer && (
                          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-3 text-sm font-semibold text-amber-400 shadow-lg">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                            </span>
                            {item.offer}
                          </div>
                        )}

                        {item.subtitle && (
                          <div className="text-xs sm:text-sm font-bold tracking-[0.2em] text-amber-400 uppercase opacity-90">
                            {item.subtitle}
                          </div>
                        )}

                        <h1 className="heading">
                          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                            {item.title}
                          </span>
                        </h1>

                        <p className="paragraph max-w-2xl mx-auto lg:mx-0 opacity-90">
                          {item.description}
                        </p>

                        <div className="pt-4 lg:pt-6">
                          <button
                            onClick={() => handleButtonClick(item)}
                            className="btn-primary group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                            aria-label={`${item.buttonLabel} - ${item.title}`}
                          >
                            <span className="text-base sm:text-lg">
                              {item.buttonLabel}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
                      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl transform -rotate-6" />
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />

                        <div className="relative aspect-[3/4] transform transition-all duration-700 hover:scale-105 hover:rotate-1">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl" />

                          <div className="relative h-full rounded-3xl overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.imageAlt || item.title}
                              priority={index === 0}
                              className="object-contain p-4 transition-transform duration-500 hover:scale-110"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
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
    </section>
  );
}
