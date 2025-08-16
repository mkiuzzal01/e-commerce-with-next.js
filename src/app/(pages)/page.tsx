import FlashSale from "@/components/sections/flash-sale/FlashSale";
import Banner from "@/components/Hero/Banner";
import NewArrivals from "@/components/sections/new-arrivals/NewArrivals";
import TrendingProducts from "@/components/sections/trending-products/TrendingProducts";
import TopRatedProducts from "@/components/sections/topRated-products/TopRatedProducts";
import PromotionalBanner from "@/components/Hero/PromotionalBanner";
// import Testimonials from "@/components/sections/testimonials/Testimonials";
import Map from "@/components/sections/map/Map";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Banner />
      <TrendingProducts />
      <FlashSale />
      <NewArrivals />
      <TopRatedProducts />
      <PromotionalBanner />
      {/* <Testimonials /> */}
      <Map />
    </Box>
  );
}
