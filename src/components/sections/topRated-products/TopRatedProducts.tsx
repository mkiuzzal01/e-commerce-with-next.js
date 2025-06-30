"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Rating,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import SectionHeader from "@/components/Shared/SectionHeader";
import { topRatedProducts } from "./TopRatedProductsData";

const TopRatedProducts = () => {
  return (
    <Box className="py-10 px-4 md:px-16 bg-gray-50">
      {/* Use SectionHeader reusable component */}
      <div className="container mx-auto">
        <SectionHeader
          title="Top Rated"
          subTitle="🌟 Best Sellers"
          description="Explore our highest rated and most popular products chosen by our customers."
          alignment="center"
          icon={null} // you can add an icon here if you want, e.g. a star icon
        />

        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {topRatedProducts.map((product) => (
            <Card
              key={product._id}
              className="hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              onClick={() => {
                // Optional: navigate to product page or handle click
                // router.push(`/products/${product.slug}`);
              }}
            >
              <div className="relative h-52 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={true}
                />
              </div>

              <CardContent sx={{ px: 2, pb: 2 }}>
                <Typography
                  variant="h6"
                  className="font-semibold mb-1 line-clamp-1"
                  color="text.primary"
                >
                  {product.name}
                </Typography>

                <Box className="flex items-center gap-1 mb-1">
                  <Rating
                    value={product.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ color: "#FF6B6B" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({product.reviewCount})
                  </Typography>
                </Box>

                <Typography
                  variant="subtitle1"
                  className="text-black font-bold mb-3"
                  color="text.primary"
                >
                  ${product.price.toFixed(2)}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    fontWeight: "600",
                    textTransform: "none",
                    boxShadow: "0 4px 12px rgb(255 107 107 / 0.4)",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      boxShadow: "0 6px 20px rgb(255 107 107 / 0.7)",
                    },
                  }}
                  onClick={() => console.log("Add to cart", product._id)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default TopRatedProducts;
