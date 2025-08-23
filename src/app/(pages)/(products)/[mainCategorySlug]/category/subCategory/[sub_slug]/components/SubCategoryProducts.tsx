/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProductCard from "@/utils/cards/ProductCard1";
import { Box, Typography } from "@mui/material";
import FilteringFrom from "../../../../../../../../utils/forms/FilteringForm";
import Loader from "@/utils/Loader";
import { TProduct } from "@/Types/ProductType";
import {
  useSingleMainCategoryQuery,
  useSingleSubCategoryQuery,
} from "@/redux/features/category/category.Api";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import ReusablePagination from "@/components/shared/ReusablePagination";
import { useState } from "react";

type PageProps = {
  params: {
    mainCategorySlug: string;
    sub_slug: string;
  };
};

export default function SubCategoryProducts({ params }: PageProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const { data: singleMainCategory, isLoading: isLoadingMainCategory } =
    useSingleMainCategoryQuery(params?.mainCategorySlug);

  const { data: singleSubCategory, isLoading: isLoadingSubCategory } =
    useSingleSubCategoryQuery(params?.sub_slug);

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
    queryParams,
    headerParams: {
      params: {
        "categories.mainCategory": singleMainCategory?.data?._id,
        "categories.subCategory": singleSubCategory?.data?._id,
      },
      activity: "market-launch",
    },
  });

  const subCategoryProducts: TProduct[] = data?.data?.result || [];
  const meta = data?.data?.meta || { totalPages: 1 };
  const totalPages = meta.totalPages || 1;

  if (isLoadingMainCategory || isLoadingSubCategory || isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box>
        <FilteringFrom
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

      <Box className="container m-auto p-4">
        {subCategoryProducts.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" color="text.secondary">
              No products found.
            </Typography>
          </Box>
        ) : (
          <>
            <Box className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {subCategoryProducts.map((item, idx) => (
                <ProductCard
                  key={idx}
                  viewLink={`/${params?.mainCategorySlug}/category/subCategory/${params?.sub_slug}/${item?.slug}`}
                  product={{
                    id: item?._id,
                    name: item?.title,
                    image: item?.productImage?.photo?.url,
                    price: item?.price,
                    discount: item?.discount,
                  }}
                />
              ))}
            </Box>

            <Box textAlign="center" py={4}>
              <ReusablePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
