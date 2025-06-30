"use client";

import React, { useState } from "react";
import { Heart, Eye, ShoppingCart, Star, Flame } from "lucide-react";
import Image from "next/image";
import { trendingProducts } from "./TrendingProductData";
import ReusableCarousel from "@/components/Shared/ReusableCarousel";
import { SwiperSlide } from "swiper/react";
import SectionHeader from "@/components/Shared/SectionHeader";

export default function TrendingProducts() {
  const [wishlistItems, setWishlistItems] = useState<Set<number>>(new Set());

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
      } else {
        updated.add(productId);
      }
      return updated;
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <SectionHeader
            title="Trending Products"
            subTitle="Hot Picks"
            description="Explore the most talked-about items from our latest collection."
            icon={<Flame className="w-6 h-6 text-white" />}
            alignment="center"
          />
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          <ReusableCarousel
            autoplay
            navigation
            pagination
            effect="slide"
            speed={1000}
            loop
            spaceBetween={24}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {trendingProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="">
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.isNew && (
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{product.discount}%
                        </span>
                      </div>

                      {/* Action Icons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200">
                          <Eye className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2 bg-white rounded-full shadow-lg transition-colors duration-200 ${
                            wishlistItems.has(product.id)
                              ? "bg-red-50 text-red-500"
                              : "hover:bg-red-50 text-gray-600 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              wishlistItems.has(product.id)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-green-50 transition-colors duration-200">
                          <ShoppingCart className="w-4 h-4 text-gray-600 hover:text-green-600" />
                        </button>
                      </div>

                      {/* Quick Add to Cart Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-4">
                          <button className="btn-secondary w-full text-center transition-colors duration-200">
                            Quick Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          ৳{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Savings */}
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Save ৳
                        {(
                          product.originalPrice - product.price
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </ReusableCarousel>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            View All Trending Products
          </button>
        </div>
      </div>
    </section>
  );
}
