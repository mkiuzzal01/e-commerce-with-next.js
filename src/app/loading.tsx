import React from "react";
import loader from "../../public/assets/logo/logo2.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative aspect-[3/2]">
        <Image src={loader} alt="" objectFit="cover" fill />
      </div>
    </div>
  );
}
