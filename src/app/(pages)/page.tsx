import FlashSale from "@/components/sections/flash-sale/FlashSale";
import Banner from "@/components/Hero/Banner";
import NewArrivals from "@/components/sections/new-arrivals/NewArrivals";
import TrendingProducts from "@/components/sections/trending-products/TrendingProducts";
import FeaturedCategories from "@/components/sections/featured-categories/featuredCategories";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedCategories/>
      <TrendingProducts />
      <FlashSale />
      <NewArrivals />
    </div>
  );
}
