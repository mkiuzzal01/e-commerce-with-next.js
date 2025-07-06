import ProductCard1 from "@/utils/cards/ProductCard1";
import React from "react";
import { seasonalTrendsData } from "../../components/seasonalData";

export default function page() {
  return (
    <div>
      <div className="container m-auto p-4">
        <div className="container m-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
