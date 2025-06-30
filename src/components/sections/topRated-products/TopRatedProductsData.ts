type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  slug: string;
};

export const topRatedProducts: Product[] = [
  {
    _id: "1",
    name: "Classic White Sneakers",
    image: "/assets/products/sneakers-white.jpg",
    price: 75.99,
    rating: 4.5,
    reviewCount: 120,
    slug: "classic-white-sneakers",
  },
  {
    _id: "2",
    name: "Leather Backpack",
    image: "/assets/products/leather-backpack.jpg",
    price: 120.5,
    rating: 4.8,
    reviewCount: 89,
    slug: "leather-backpack",
  },
  {
    _id: "3",
    name: "Vintage Sunglasses",
    image: "/assets/products/vintage-sunglasses.jpg",
    price: 45.0,
    rating: 4.3,
    reviewCount: 150,
    slug: "vintage-sunglasses",
  },
  {
    _id: "4",
    name: "Sport Watch",
    image: "/assets/products/sport-watch.jpg",
    price: 199.99,
    rating: 4.7,
    reviewCount: 60,
    slug: "sport-watch",
  },
];
