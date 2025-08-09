/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProductCard1 from "@/utils/cards/ProductCard1";
import { Box } from "@mui/material";
import React, { useState } from "react";
import ReusablePagination from "@/components/Shared/ReusablePagination";
import FilteringForm from "@/utils/forms/FilteringForm";
import Loader from "@/utils/Loader";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import { TProduct } from "@/Types/ProductType";

export default function TrendingProducts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const queryParams: Record<string, any> = {
    page,
    limit: 12,
  };

  if (search.trim()) queryParams.searchTerm = search.trim();
  if (size) queryParams["variants.name"] = size;
  if (color) queryParams["variants.attributes.value"] = color;
  if (priceRange[0] > 0) queryParams.priceMin = priceRange[0];
  if (priceRange[1] < 10000) queryParams.priceMax = priceRange[1];

  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: { params: { productPlace: "trending" } },
  });
  const trendingProducts: TProduct[] = data?.data?.result || [];
  const meta = data?.data?.meta || { totalPages: 1 };
  const totalPages = meta.totalPages || 1;

  if (isLoading) return <Loader />;
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        <Box>
          <FilteringForm
            search={search}
            setSearch={setSearch}
            size={size}
            setSize={setSize}
            color={color}
            setColor={setColor}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </Box>
        <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard1
              key={product?._id}
              viewLink={`/trending-products/${product?.slug}`}
              product={{
                id: product?._id,
                name: product?.title,
                image: product?.productImage?.photo?.url,
                price: product?.price,
                discount: product?.discount,
              }}
            />
          ))}
        </Box>
        <Box>
          <ReusablePagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </Box>
      </Box>
    </Box>
  );
}
