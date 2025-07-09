import React from "react";
import ProductCard1 from "@/utils/cards/ProductCard1";
import { kidsData } from "./components/kidsData";
import { Box } from "@mui/material";

export default function page() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        <Box className="container m-auto p-4">
          <Box className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {kidsData?.map((item, idx) => (
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
      </Box>
    </Box>
  );
}
