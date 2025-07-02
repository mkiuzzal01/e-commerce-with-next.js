import React from "react";
import { menData } from "./components/menData";
import ProductCard from "@/utils/cards/ProductCard";

export default function page() {
  return (
    <div>
      <div className="container m-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
        </div>
      </div>
    </div>
  );
}
