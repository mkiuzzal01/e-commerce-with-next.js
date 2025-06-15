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
} from "lucide-react";
import { megaMenuData } from "./NavLinks";
export default function EcommerceMegaMenu() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedCategories, setMobileExpandedCategories] = useState([]);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (index: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleMobileCategoryToggle = (index: any) => {
    setMobileExpandedCategories((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Desktop Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="hidden lg:flex justify-between items-center py-2 text-sm text-gray-600 border-b">
            <div className="flex items-center space-x-4">
              <span>Free shipping on orders over $50</span>
              <span>|</span>
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-blue-600">
                Help
              </a>
              <a href="#" className="hover:text-blue-600">
                Track Order
              </a>
              <a href="#" className="hover:text-blue-600">
                Store Locator
              </a>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ShopMega</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {megaMenuData.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    <span>{item.MainCategoryName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 relative">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMenu !== null && (
          <div
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t z-40"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-4 gap-8">
                {megaMenuData[activeMenu]?.Category.map(
                  (category, catIndex) => (
                    <div key={catIndex} className="space-y-4">
                      <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-2">
                        <a
                          href={category.link}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {category.categoryName}
                        </a>
                      </h3>
                      <ul className="space-y-2">
                        {category.subCategory.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={sub.link}
                              className="text-gray-600 hover:text-blue-600 transition-colors block py-1"
                            >
                              {sub.subCategoryName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}

                {/* Featured Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Featured Products
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">NEW</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Summer Collection</p>
                        <p className="text-xs text-gray-500">Up to 50% off</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 font-bold">HOT</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Best Sellers</p>
                        <p className="text-xs text-gray-500">Trending now</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    View All Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-blue-600">ShopMega</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-full pb-20">
              {megaMenuData.map((main, mainIdx) => (
                <div key={mainIdx} className="border-b">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                    onClick={() => handleMobileCategoryToggle(mainIdx)}
                  >
                    <span className="font-medium">{main.MainCategoryName}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        mobileExpandedCategories.includes(mainIdx)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {mobileExpandedCategories.includes(mainIdx) && (
                    <div className="bg-gray-50">
                      {main.Category.map((cat, catIdx) => (
                        <div key={catIdx}>
                          <a
                            href={cat.link}
                            className="block px-6 py-3 font-medium text-gray-700 hover:text-blue-600 border-b border-gray-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {cat.categoryName}
                          </a>
                          {cat.subCategory.map((sub, subIdx) => (
                            <a
                              key={subIdx}
                              href={sub.link}
                              className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.subCategoryName}
                            </a>
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
    </div>
  );
}
