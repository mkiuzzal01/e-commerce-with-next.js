import FlashSale from "@/components/sections/flash-sale/FlashSale";
import Banner from "@/components/Hero/Banner";
import NewArrivals from "@/components/sections/new-arrivals/NewArrivals";
import TrendingProducts from "@/components/sections/trending-products/TrendingProducts";
import TopRatedProducts from "@/components/sections/topRated-products/TopRatedProducts";
import PromotionalBanner from "@/components/Hero/PromotionalBanner";
import Testimonials from "@/components/sections/testimonials/Testimonials";
import Map from "@/components/sections/map/Map";

export default function Home() {
  return (
    <div>
      <Banner />
      <PromotionalBanner />
      <TrendingProducts />
      <FlashSale />
      <NewArrivals />
      <TopRatedProducts />
      <Testimonials />
      <Map />
    </div>
  );
}
