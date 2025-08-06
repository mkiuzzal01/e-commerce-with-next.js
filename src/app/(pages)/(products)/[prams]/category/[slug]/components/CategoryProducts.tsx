"use client";
import ReusablePagination from "@/components/Shared/ReusablePagination";
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

type PageProps = {
  params: {
    prams: string;
    slug: string;
  };
};

export default function CategoryProducts({ params }: PageProps) {
  console.log(params);
  const { data: singleMainCategory, isLoading: isLoadingMainCategory } =
    useSingleMainCategoryQuery(params?.prams);

  const { data: singleCategory, isLoading: isLoadingCategory } =
    useSingleCategoryQuery(params?.slug);

  const { data, isLoading } = useAllProductByKeyWordQuery({
    queryParams: {},
    headerParams: {
      params: {
        "categories.mainCategory": singleMainCategory?.data?._id,
        "categories.category": singleCategory?.data?._id,
      },
    },
  });

  const categoryProducts: TProduct[] = data?.data?.result || [];

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
          <CategoryProductFilteringForm />
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
                  product={{
                    id: item._id,
                    name: item.title,
                    image: item.productImage?.photo?.url,
                    price: item.price,
                    originalPrice: item.price,
                  }}
                />
              ))}
            </Box>

            {/* Pagination */}
            <Box textAlign="center" py={4}>
              <ReusablePagination currentPage={1} totalPages={10} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
