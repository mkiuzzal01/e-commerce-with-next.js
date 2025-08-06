import React from "react";
import ProductCard from "@/utils/cards/ProductCard1";
import { Box } from "@mui/material";
import ReusablePagination from "@/components/Shared/ReusablePagination";
import FilteringFrom from "@/app/(pages)/(products)/[prams]/category/subCategory/[sub_slug]/components/FilteringForm";
import { womenData } from "../../../components/womansData";

export default function Page() {
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
        <Box className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {womenData?.map((item, idx) => (
            <ProductCard
              key={idx}
              product={{
                id: item?.id?.toString(),
                name: item?.name,
                image: item?.image,
                price: item?.price,
                originalPrice: item?.originalPrice,
              }}
            />
          ))}
        </Box>
        <Box textAlign="center" py={4}>
          <ReusablePagination currentPage={1} totalPages={10} />
        </Box>
      </Box>
    </Box>
  );
}
