"use client";
import Image from "next/image";
import ReusableCarousel from "../Shared/ReusableCarousel";
import { bannerData } from "./BannerData";

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-yellow-200/40 to-transparent">
      <div className="container m-auto relative overflow-hidden">
        <ReusableCarousel>
          {bannerData.map((item) => (
            <div key={item.id}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] cursor-pointer overflow-hidden">
                {/* Content Container */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                      {/* Left Side - Text Content */}
                      <div className="text-y space-y-6 animate-fade-in-left">
                        {/* Offer Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white">
                          {item.offer}
                        </div>

                        {/* Subtitle */}
                        <div className="text-sm font-semibold tracking-widest text-yellow-400 uppercase">
                          {item.subtitle}
                        </div>

                        {/* Main Title */}
                        <h1 className=" text-4xl md:text-5xl lg:text-6xl leading-tight">
                          {item.title}
                        </h1>

                        {/* Description */}
                        <p className="paragraph text-lg md:text-xl leading-relaxed max-w-lg opacity-90">
                          {item.description}
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <button className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
                            {item.buttonLabel}
                            {/* <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" /> */}
                          </button>
                        </div>
                      </div>

                      {/* Right Side - Additional Visual Element (Optional) */}
                      <div className="hidden lg:flex justify-end items-center">
                        <div className="w-full max-w-md">
                          <Image
                            src={item.image}
                            alt={item.title}
                            priority={item.id === 1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ReusableCarousel>
      </div>
    </div>
  );
}
