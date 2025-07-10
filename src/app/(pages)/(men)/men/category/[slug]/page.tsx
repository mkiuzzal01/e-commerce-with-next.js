import ProductCard from "@/utils/cards/ProductCard1";
import { Box } from "@mui/material";
import ReusablePagination from "@/components/Shared/ReusablePagination";
import MenForm from "../../components/MenProductFilterFrom";
import { menData } from "../../components/menData";

export default function page() {
  return (
    <Box
    sx={{
        background: "linear-gradient(135deg, #fefce8 0%, #ffe4e6 100%)",
      }}
    >
      <Box className="container m-auto p-4">
        {/* this is form */}
        <Box>
          <MenForm />
        </Box>
        <Box className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4">
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
        <ReusablePagination currentPage={1} totalPages={10}  />
      </Box>
    </Box>
  );
}
