import React from "react";
import ProductCard from "@/utils/cards/ProductCard1";
import { menData } from "../../../components/menData";
import { Box } from "@mui/material";
import FilteringFrom from "./components/FilteringForm";

export default function page() {
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
          {menData?.map((item, idx) => (
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
      </Box>
    </Box>
  );
}
