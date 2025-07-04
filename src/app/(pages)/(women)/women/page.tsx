import React from "react";
import ProductCard from "@/utils/cards/ProductCard1";
import { womenData } from "./components/womansData";


export default function Page() {
  return (
    <div>
      <div className="container m-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
        </div>
      </div>
    </div>
  );
}
