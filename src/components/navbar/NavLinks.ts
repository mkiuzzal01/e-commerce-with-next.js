
import { TNavLink } from "./TNavbar";

// Sample data structure for e-commerce categories
export const megaMenuData: TNavLink = [
  {
    MainCategoryName: "Fashion",
    link: "/fashion",
    Category: [
      {
        categoryName: "Women's Fashion",
        link: "/fashion/women",
        subCategory: [
          { subCategoryName: "Dresses", link: "/fashion/women/dresses" },
          { subCategoryName: "Tops & Blouses", link: "/fashion/women/tops" },
          { subCategoryName: "Jeans & Pants", link: "/fashion/women/pants" },
          { subCategoryName: "Shoes", link: "/fashion/women/shoes" },
          {
            subCategoryName: "Accessories",
            link: "/fashion/women/accessories",
          },
        ],
      },
      {
        categoryName: "Men's Fashion",
        link: "/fashion/men",
        subCategory: [
          { subCategoryName: "Shirts", link: "/fashion/men/shirts" },
          { subCategoryName: "Pants & Jeans", link: "/fashion/men/pants" },
          { subCategoryName: "Shoes", link: "/fashion/men/shoes" },
          { subCategoryName: "Watches", link: "/fashion/men/watches" },
          { subCategoryName: "Jackets", link: "/fashion/men/jackets" },
        ],
      },
      {
        categoryName: "Kids Fashion",
        link: "/fashion/kids",
        subCategory: [
          { subCategoryName: "Boys Clothing", link: "/fashion/kids/boys" },
          { subCategoryName: "Girls Clothing", link: "/fashion/kids/girls" },
          { subCategoryName: "Baby Clothes", link: "/fashion/kids/baby" },
          { subCategoryName: "Kids Shoes", link: "/fashion/kids/shoes" },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Electronics",
    link: "/electronics",
    Category: [
      {
        categoryName: "Mobile & Tablets",
        link: "/electronics/mobile",
        subCategory: [
          {
            subCategoryName: "Smartphones",
            link: "/electronics/mobile/smartphones",
          },
          { subCategoryName: "Tablets", link: "/electronics/mobile/tablets" },
          {
            subCategoryName: "Cases & Covers",
            link: "/electronics/mobile/cases",
          },
          { subCategoryName: "Chargers", link: "/electronics/mobile/chargers" },
        ],
      },
      {
        categoryName: "Computers",
        link: "/electronics/computers",
        subCategory: [
          {
            subCategoryName: "Laptops",
            link: "/electronics/computers/laptops",
          },
          {
            subCategoryName: "Desktops",
            link: "/electronics/computers/desktops",
          },
          {
            subCategoryName: "Gaming PCs",
            link: "/electronics/computers/gaming",
          },
          {
            subCategoryName: "Accessories",
            link: "/electronics/computers/accessories",
          },
        ],
      },
      {
        categoryName: "Audio & Video",
        link: "/electronics/audio",
        subCategory: [
          {
            subCategoryName: "Headphones",
            link: "/electronics/audio/headphones",
          },
          { subCategoryName: "Speakers", link: "/electronics/audio/speakers" },
          { subCategoryName: "TVs", link: "/electronics/audio/tvs" },
          { subCategoryName: "Cameras", link: "/electronics/audio/cameras" },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Home & Garden",
    link: "/home-garden",
    Category: [
      {
        categoryName: "Furniture",
        link: "/home-garden/furniture",
        subCategory: [
          {
            subCategoryName: "Living Room",
            link: "/home-garden/furniture/living-room",
          },
          {
            subCategoryName: "Bedroom",
            link: "/home-garden/furniture/bedroom",
          },
          {
            subCategoryName: "Kitchen",
            link: "/home-garden/furniture/kitchen",
          },
          { subCategoryName: "Office", link: "/home-garden/furniture/office" },
        ],
      },
      {
        categoryName: "Home Decor",
        link: "/home-garden/decor",
        subCategory: [
          { subCategoryName: "Wall Art", link: "/home-garden/decor/wall-art" },
          { subCategoryName: "Lighting", link: "/home-garden/decor/lighting" },
          {
            subCategoryName: "Rugs & Carpets",
            link: "/home-garden/decor/rugs",
          },
          { subCategoryName: "Curtains", link: "/home-garden/decor/curtains" },
        ],
      },
      {
        categoryName: "Garden",
        link: "/home-garden/garden",
        subCategory: [
          { subCategoryName: "Plants", link: "/home-garden/garden/plants" },
          { subCategoryName: "Tools", link: "/home-garden/garden/tools" },
          {
            subCategoryName: "Outdoor Furniture",
            link: "/home-garden/garden/outdoor-furniture",
          },
          { subCategoryName: "Seeds", link: "/home-garden/garden/seeds" },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Sports & Fitness",
    link: "/sports",
    Category: [
      {
        categoryName: "Fitness Equipment",
        link: "/sports/fitness",
        subCategory: [
          { subCategoryName: "Gym Equipment", link: "/sports/fitness/gym" },
          { subCategoryName: "Yoga & Pilates", link: "/sports/fitness/yoga" },
          {
            subCategoryName: "Cardio Equipment",
            link: "/sports/fitness/cardio",
          },
        ],
      },
      {
        categoryName: "Sports Gear",
        link: "/sports/gear",
        subCategory: [
          { subCategoryName: "Football", link: "/sports/gear/football" },
          { subCategoryName: "Basketball", link: "/sports/gear/basketball" },
          { subCategoryName: "Tennis", link: "/sports/gear/tennis" },
        ],
      },
    ],
  },
];
