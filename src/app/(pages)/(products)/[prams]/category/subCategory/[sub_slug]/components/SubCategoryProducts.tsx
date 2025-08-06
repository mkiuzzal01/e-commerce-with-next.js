"use client";
import ProductCard from "@/utils/cards/ProductCard1";
import { Box, Typography } from "@mui/material";
import FilteringFrom from "./FilteringForm";
import Loader from "@/utils/Loader";
import { TProduct } from "@/Types/ProductType";
import {
  useSingleMainCategoryQuery,
  useSingleSubCategoryQuery,
} from "@/redux/features/category/category.Api";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import ReusablePagination from "@/components/Shared/ReusablePagination";

type PageProps = {
  params: {
    prams: string;
    sub_slug: string;
  };
};

export default function SubCategoryProducts({ params }: PageProps) {
  const { data: singleMainCategory, isLoading: isLoadingMainCategory } =
    useSingleMainCategoryQuery(params?.prams);

  const { data: singleSubCategory, isLoading: isLoadingSubCategory } =
    useSingleSubCategoryQuery(params?.sub_slug);

  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: {
      params: {
        "categories.mainCategory": singleMainCategory?.data?._id,
        "categories.subCategory": singleSubCategory?.data?._id,
      },
    },
  });

  const subCategoryProducts: TProduct[] = data?.data?.result || [];

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
        <FilteringFrom />
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
                  product={{
                    id: item?._id,
                    name: item?.title,
                    image: item?.productImage?.photo?.url,
                    price: item?.price,
                    originalPrice: item?.price,
                  }}
                />
              ))}
            </Box>

            <Box textAlign="center" py={4}>
              <ReusablePagination currentPage={1} totalPages={10} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
