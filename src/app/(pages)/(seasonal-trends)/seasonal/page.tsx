import ProductCard1 from "@/utils/cards/ProductCard1";
import React from "react";
import { seasonalTrendsData } from "./components/seasonalData";
import { Box } from "@mui/material";
import SeasonalProductFilterFrom from "./components/SeasonalProductFilterFrom";
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
          <SeasonalProductFilterFrom />
        </Box>
        <Box className="container m-auto p-4">
          <Box className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {seasonalTrendsData?.map((item, idx) => (
              <ProductCard1
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
        </Box>
        <Box textAlign="center" py={4}>
          <ReusablePagination currentPage={1} totalPages={10} />
        </Box>
      </Box>
    </Box>
  );
}
