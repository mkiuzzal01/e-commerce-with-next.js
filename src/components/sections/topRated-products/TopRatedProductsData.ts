import image1 from "../../../../public/assets/products/newArrivals/Linen Summer Dress.jpeg";
import image2 from "../../../../public/assets/products/newArrivals/Men's Polo T-Shirt.jpg";
import image3 from "../../../../public/assets/products/newArrivals/Girls Denim Jacket.jpeg";
import image4 from "../../../../public/assets/products/newArrivals/Unisex Hoodie.jpeg";
import { StaticImageData } from "next/image";

type Product = {
  _id: string;
  name: string;
  image: string | StaticImageData;
  price: number;
  rating: number;
  reviewCount: number;
  slug: string;
};

export const topRatedProducts: Product[] = [
  {
    _id: "1",
    name: "Classic White Sneakers",
    image: image1,
    price: 75.99,
    rating: 4.5,
    reviewCount: 120,
    slug: "classic-white-sneakers",
  },
  {
    _id: "2",
    name: "Leather Backpack",
    image: image2,
    price: 120.5,
    rating: 4.8,
    reviewCount: 89,
    slug: "leather-backpack",
  },
  {
    _id: "3",
    name: "Vintage Sunglasses",
    image: image3,
    price: 45.0,
    rating: 4.3,
    reviewCount: 150,
    slug: "vintage-sunglasses",
  },
  {
    _id: "4",
    name: "Sport Watch",
    image: image4,
    price: 199.99,
    rating: 4.7,
    reviewCount: 60,
    slug: "sport-watch",
  },
];
