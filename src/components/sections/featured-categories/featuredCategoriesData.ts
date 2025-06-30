import men from "../../../../public/assets/products/flashProducts/Men's Hoodie.jpeg";
import women from "../../../../public/assets/products/flashProducts/Women's Crop Top.jpg";
import kids from "../../../../public/assets/products/newArrivals/Girls Denim Jacket.jpeg";
import seasonal from "../../../../public/assets/products/trendingProducts/dress.jpg";

export const featuredCategories = [
  {
    id: 1,
    title: "Men",
    image: men,
    description: "Explore the latest trends in men's fashion",
    itemCount: 2847,
    slug: "men",
    link: "/men",
    highlights: ["T-Shirts", "Jeans", "Watches", "Casual Shoes"],
  },
  {
    id: 2,
    title: "Women",
    image: women,
    description: "Style up with the latest for her",
    itemCount: 1923,
    slug: "women",
    link: "/women",
    highlights: ["Dresses", "Tops", "Handbags", "Heels"],
  },
  {
    id: 3,
    title: "Kids & Baby",
    image: kids,
    description: "Adorable styles for the little ones",
    itemCount: 1456,
    slug: "kids",
    link: "/kids",
    highlights: ["Boys Wear", "Girls Wear", "Baby Items", "Ethnic Wear"],
  },
  {
    id: 4,
    title: "Seasonal Trends",
    image: seasonal,
    description: "Explore the best of seasonal fashion",
    itemCount: 987,
    slug: "seasonal",
    link: "/seasonal",
    highlights: [
      "Winter Collection",
      "Summer Styles",
      "Festive Wear",
      "Trending Now",
    ],
  },
];
