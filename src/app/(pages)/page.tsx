import FlashSale from "@/components/sections/flash-sale/FlashSale";
import Banner from "@/components/Hero/Banner";
import NewArrivals from "@/components/sections/new-arrivals/NewArrivals";
import FeaturedCategories from "@/components/sections/featured-categories/FeaturedCategories";
import TrendingProducts from "@/components/sections/trending-products/TrendingProducts";
import TopRatedProducts from "@/components/sections/topRated-products/TopRatedProducts";
import PromotionalBanners from "@/components/Hero/PromotionalBanners";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedCategories />
      <TrendingProducts />
      <FlashSale />
      <NewArrivals />
      <TopRatedProducts />
      <PromotionalBanners />
    </div>
  );
}
