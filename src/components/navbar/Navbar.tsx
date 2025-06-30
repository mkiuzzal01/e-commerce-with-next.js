/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Phone,
  MapPin,
  Truck,
  Headphones,
} from "lucide-react";
import { megaMenuData } from "./NavLinks";
import logo from "../../../public/assets/logo/logo1.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileExpandedCategories, setMobileExpandedCategories] = useState<
    number[]
  >([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  const handleMobileCategoryToggle = (index: number) => {
    setMobileExpandedCategories((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative">
      <header
        className={`transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        } border-b sticky top-0 z-50 bg-white`}
      >
        {/* Top Bar */}
        <section className="bg-[#210F37] text-white">
          <div className="container mx-auto px-4">
            <div className="hidden lg:flex justify-between items-center py-3 text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="w-px h-4 bg-slate-600" />
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-blue-400" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <Link
                  href="/help"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  Help Center
                </Link>
                <Link
                  href="/track"
                  className="hover:text-blue-400 transition-colors"
                >
                  Track Order
                </Link>
                <Link
                  href="/stores"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  Store Locator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Navigation */}
        <section
          className={`bg-white transition-all duration-300 ${
            isScrolled ? "py-2" : "py-4"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6 text-slate-700" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src={logo}
                  alt="Company Logo"
                  width={isScrolled ? 60 : 80}
                  height={isScrolled ? 40 : 50}
                  className="transition-all duration-300"
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-2">
                {megaMenuData.map((item, index) => (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="flex items-center space-x-1 px-4 py-3 text-slate-700 hover:text-blue-600 font-medium rounded-lg hover:bg-slate-50 transition-all duration-200 group">
                      <span className="whitespace-nowrap">
                        {item.MainCategoryName}
                      </span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                  </div>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-2">
                {/* Search */}
                <div className="relative hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-64 pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 hover:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Mobile Search Button */}
                <button
                  className="md:hidden p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5 text-slate-700" />
                </button>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors relative"
                    aria-label="User account"
                  >
                    <User className="w-5 h-5 text-slate-700" />
                  </button>

                  <button
                    className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors relative"
                    aria-label="Wishlist"
                  >
                    <Heart className="w-5 h-5 text-slate-700" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      2
                    </span>
                  </button>

                  <button
                    className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors relative"
                    aria-label="Shopping cart"
                  >
                    <ShoppingCart className="w-5 h-5 text-slate-700" />
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      3
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mega Menu */}
        {activeMenu !== null && (
          <div
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-200 z-40 opacity-0 animate-fadeIn"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
            style={{
              animation: "fadeIn 0.2s ease-out forwards",
            }}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {megaMenuData[activeMenu].Category.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="font-semibold text-slate-900 text-lg border-b border-slate-200 pb-3">
                      <Link
                        href={category.link}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {category.categoryName}
                      </Link>
                    </h3>
                    <ul className="space-y-3">
                      {category.subCategory.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={sub.link}
                            className="text-slate-600 hover:text-blue-600 block py-1 transition-colors hover:translate-x-1 duration-200"
                          >
                            {sub.subCategoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Featured Section */}
                {megaMenuData[activeMenu].featured && (
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 flex flex-col items-center text-center border border-slate-200">
                    <div className="relative mb-4 group">
                      <Image
                        src={megaMenuData[activeMenu].featured.image}
                        alt="Featured product"
                        className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                        width={200}
                        height={200}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">
                      {megaMenuData[activeMenu].featured.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {megaMenuData[activeMenu].featured.description}
                    </p>
                    <button className="btn-primary">
                      <Link href={megaMenuData[activeMenu].featured.buttonLink}>
                        {megaMenuData[activeMenu].featured.buttonText}
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="fixed top-0 left-0 right-0 bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 w-80 max-w-[90vw] h-full bg-white shadow-2xl transform transition-transform duration-300">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <Image src={logo} alt="Logo" width={70} height={45} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="overflow-y-auto h-full pb-20">
              {megaMenuData.map((main, index) => (
                <div key={index} className="border-b border-slate-100">
                  <button
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                    onClick={() => handleMobileCategoryToggle(index)}
                  >
                    <span className="font-medium text-slate-900">
                      {main.MainCategoryName}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${
                        mobileExpandedCategories.includes(index)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {mobileExpandedCategories.includes(index) && (
                    <div className="bg-slate-50 border-t border-slate-100">
                      {main.Category.map((cat, catIdx) => (
                        <div key={catIdx}>
                          <Link
                            href={cat.link}
                            className="block px-6 py-3 font-medium text-slate-700 hover:text-blue-600 hover:bg-white transition-colors border-b border-slate-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {cat.categoryName}
                          </Link>
                          {cat.subCategory.map((sub, subIdx) => (
                            <Link
                              key={subIdx}
                              href={sub.link}
                              className="block px-8 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-white transition-colors border-b border-slate-100 last:border-b-0"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.subCategoryName}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
