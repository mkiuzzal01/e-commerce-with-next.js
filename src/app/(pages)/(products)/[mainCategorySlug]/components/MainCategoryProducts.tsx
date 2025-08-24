/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProductCard1 from "@/utils/cards/ProductCard1";
import { Box, Typography } from "@mui/material";
import ReusablePagination from "@/components/Shared/ReusablePagination";
import { TProduct } from "@/Types/ProductType";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import Loader from "@/utils/Loader";
import { useSingleMainCategoryQuery } from "@/redux/features/category/category.Api";
import MainCategoryProductFilteringForm from "@/utils/forms/MainCategoryProductFilteringForm";
import { useState } from "react";

export default function MainCategoryProducts({
  mainCategorySlug,
}: {
  mainCategorySlug: string;
}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const {
    data: singleMainCategoryData,
    isLoading: singleMainCategoryIsLoading,
  } = useSingleMainCategoryQuery(mainCategorySlug);

  const queryParams: Record<string, any> = {
    page,
    limit: 12,
  };

  if (search.trim()) queryParams.searchTerm = search.trim();
  if (category) queryParams["categories.category"] = category;
  if (size) queryParams["variants.name"] = size;
  if (color) queryParams["variants.attributes.value"] = color;
  if (priceRange[0] > 0) queryParams.priceMin = priceRange[0];
  if (priceRange[1] < 10000) queryParams.priceMax = priceRange[1];

  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams,
    headerParams: {
      params: { "categories.mainCategory": singleMainCategoryData?.data?._id },
      activity: "market-launch",
    },
  });

  const mainCateProducts: TProduct[] = data?.data?.result || [];
  const meta = data?.data?.meta || { totalPages: 1 };
  const totalPages = meta.totalPages || 1;

  if (isLoading || singleMainCategoryIsLoading) return <Loader />;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        <MainCategoryProductFilteringForm
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          size={size}
          setSize={setSize}
          color={color}
          setColor={setColor}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {mainCateProducts.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" color="text.secondary">
              No products found.
            </Typography>
          </Box>
        ) : (
          <>
            <Box className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4">
              {mainCateProducts.map((item, idx) => (
                <ProductCard1
                  key={item._id || idx}
                  viewLink={`/${mainCategorySlug}/${item?.slug}`}
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
