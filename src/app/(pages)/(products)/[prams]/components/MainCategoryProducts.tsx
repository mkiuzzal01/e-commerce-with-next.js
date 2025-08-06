"use client";
import ProductCard1 from "@/utils/cards/ProductCard1";
import { Box, Typography } from "@mui/material";
import ReusablePagination from "@/components/Shared/ReusablePagination";
import { TProduct } from "@/Types/ProductType";
import { useAllProductByKeyWordQuery } from "@/redux/features/product/product.Api";
import Loader from "@/utils/Loader";
import { useSingleMainCategoryQuery } from "@/redux/features/category/category.Api";
import CategoryProductFilteringForm from "@/utils/forms/CategoryProductFilteringForm";

export default function MainCategoryProducts({ prams }: { prams: string }) {
  const {
    data: singleMainCategoryData,
    isLoading: singleMainCategoryIsLoading,
  } = useSingleMainCategoryQuery(prams);

  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: {
      params: {
        "categories.mainCategory": singleMainCategoryData?.data?._id,
      },
    },
  });

  const mainCateProducts: TProduct[] = data?.data?.result || [];

  if (isLoading || singleMainCategoryIsLoading) return <Loader />;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        <Box>
          <CategoryProductFilteringForm />
        </Box>

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
                  key={idx}
                  viewLink={`/${prams}/${item?.slug}`}
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
