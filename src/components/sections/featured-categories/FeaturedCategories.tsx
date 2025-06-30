"use client";

import Image from "next/image";
import { featuredCategories } from "./featuredCategoriesData";
import SectionHeader from "@/components/Shared/SectionHeader";
import { LayoutGrid } from "lucide-react";

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <SectionHeader
            title="Featured Categories"
            subTitle="Popular Picks"
            description="Discover our most popular product categories and find exactly what you're looking for"
            icon={<LayoutGrid className="w-6 h-6 text-white" />}
            alignment="center"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCategories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              aria-label={`Category: ${category.title}`}
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 shadow">
                    <span className="text-sm font-semibold text-gray-800">
                      {category.itemCount.toLocaleString()} items
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-300">
                    <span className="text-sm">Explore Category</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}
