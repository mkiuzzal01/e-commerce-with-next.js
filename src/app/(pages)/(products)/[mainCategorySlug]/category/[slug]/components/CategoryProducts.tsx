/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReusablePagination from "@/components/shared/ReusablePagination";
import {
  useSingleCategoryQuery,
  useSingleMainCategoryQuery,
} from "@/redux/features/category/category.Api";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import { TProduct } from "@/Types/ProductType";
import ProductCard1 from "@/utils/cards/ProductCard1";
import CategoryProductFilteringForm from "@/utils/forms/CategoryProductFilteringForm";
import Loader from "@/utils/Loader";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

type PageProps = {
  params: {
    mainCategorySlug: string;
    slug: string;
  };
};

export default function CategoryProducts({ params }: PageProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const { data: singleMainCategory, isLoading: isLoadingMainCategory } =
    useSingleMainCategoryQuery(params?.mainCategorySlug);
  const { data: singleCategory, isLoading: isLoadingCategory } =
    useSingleCategoryQuery(params?.slug);

  const queryParams: Record<string, any> = {
    page,
    limit: 12,
  };

  if (search.trim()) queryParams.searchTerm = search.trim();
  if (subCategory) queryParams["categories.subCategory"] = subCategory;
  if (size) queryParams["variants.name"] = size;
  if (color) queryParams["variants.attributes.value"] = color;
  if (priceRange[0] > 0) queryParams.priceMin = priceRange[0];
  if (priceRange[1] < 10000) queryParams.priceMax = priceRange[1];

  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams,
    headerParams: {
      params: {
        "categories.mainCategory": singleMainCategory?.data?._id,
        "categories.category": singleCategory?.data?._id,
      },
    },
  });

  const categoryProducts: TProduct[] = data?.data?.result || [];
  const meta = data?.data?.meta || { totalPages: 1 };
  const totalPages = meta.totalPages || 1;

  if (isLoadingMainCategory || isLoadingCategory || isLoading)
    return <Loader />;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        {/* Filter Form */}
        <Box>
          <CategoryProductFilteringForm
            search={search}
            setSearch={setSearch}
            category={subCategory}
            setCategory={setSubCategory}
            size={size}
            setSize={setSize}
            color={color}
            setColor={setColor}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </Box>

        {/* Conditional Content */}
        {categoryProducts.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" color="text.secondary">
              No products found.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Products Grid */}
            <Box className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4">
              {categoryProducts.map((item, idx) => (
                <ProductCard1
                  key={idx}
                  viewLink={`/${params?.mainCategorySlug}/category/${params?.slug}/${item?.slug}`}
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

            {/* Pagination */}
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
