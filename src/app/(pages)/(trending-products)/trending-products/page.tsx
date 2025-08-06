import { trendingProducts } from "@/components/sections/trending-products/TrendingProductData";
import ProductCard1 from "@/utils/cards/ProductCard1";
import { Box } from "@mui/material";
import React from "react";
import FilteringFrom from "../../(products)/[prams]/category/subCategory/[sub_slug]/components/FilteringForm";
import ReusablePagination from "@/components/Shared/ReusablePagination";

export default function page() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        <Box>
          <FilteringFrom />
        </Box>
        <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard1
              key={product?.id}
              product={{
                id: String(product?.id),
                name: product?.name,
                image: product?.image,
                price: product?.price,
                originalPrice: product?.originalPrice,
              }}
            />
          ))}
        </Box>
        <Box>
          <ReusablePagination currentPage={1} totalPages={10} />
        </Box>
      </Box>
    </Box>
  );
}
