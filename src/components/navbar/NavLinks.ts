import { TNavLink } from "./TNavbar";
import men from "../../../public/assets/products/flashProducts/Men's Hoodie.jpeg";
import women from "../../../public/assets/products/flashProducts/Women's Crop Top.jpg";
import kids from "../../../public/assets/products/newArrivals/Girls Denim Jacket.jpeg";
import seasonal from "../../../public/assets/products/trendingProducts/dress.jpg";

export const megaMenuData: TNavLink = [
  {
    MainCategoryName: "Men",
    link: "/men",
    featured: {
      title: "Men's Featured",
      image: men,
      description: "Explore the latest trends in men's fashion",
      buttonText: "Shop Men",
      buttonLink: "/men",
    },
    Category: [
      {
        categoryName: "Clothing",
        link: "/men/clothing",
        subCategory: [
          { subCategoryName: "T-Shirts", link: "/men/clothing/tshirts" },
          { subCategoryName: "Shirts", link: "/men/clothing/shirts" },
          { subCategoryName: "Jeans", link: "/men/clothing/jeans" },
          { subCategoryName: "Trousers", link: "/men/clothing/trousers" },
          { subCategoryName: "Ethnic Wear", link: "/men/clothing/ethnic" },
          { subCategoryName: "Winter Wear", link: "/men/clothing/winter" },
        ],
      },
      {
        categoryName: "Footwear",
        link: "/men/footwear",
        subCategory: [
          { subCategoryName: "Casual Shoes", link: "/men/footwear/casual" },
          { subCategoryName: "Sports Shoes", link: "/men/footwear/sports" },
          { subCategoryName: "Sandals", link: "/men/footwear/sandals" },
        ],
      },
      {
        categoryName: "Accessories",
        link: "/men/accessories",
        subCategory: [
          { subCategoryName: "Watches", link: "/men/accessories/watches" },
          { subCategoryName: "Belts", link: "/men/accessories/belts" },
          {
            subCategoryName: "Sunglasses",
            link: "/men/accessories/sunglasses",
          },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Women",
    link: "/women",
    featured: {
      title: "Women's Featured",
      image: women,
      description: "Style up with the latest for her",
      buttonText: "Shop Women",
      buttonLink: "/women",
    },
    Category: [
      {
        categoryName: "Clothing",
        link: "/women/clothing",
        subCategory: [
          { subCategoryName: "Dresses", link: "/women/clothing/dresses" },
          { subCategoryName: "Tops", link: "/women/clothing/tops" },
          { subCategoryName: "Skirts", link: "/women/clothing/skirts" },
          { subCategoryName: "Sarees", link: "/women/clothing/sarees" },
          { subCategoryName: "Salwar Kameez", link: "/women/clothing/salwar" },
          { subCategoryName: "Winter Wear", link: "/women/clothing/winter" },
        ],
      },
      {
        categoryName: "Footwear",
        link: "/women/footwear",
        subCategory: [
          { subCategoryName: "Flats", link: "/women/footwear/flats" },
          { subCategoryName: "Heels", link: "/women/footwear/heels" },
          { subCategoryName: "Sneakers", link: "/women/footwear/sneakers" },
        ],
      },
      {
        categoryName: "Accessories",
        link: "/women/accessories",
        subCategory: [
          { subCategoryName: "Handbags", link: "/women/accessories/handbags" },
          { subCategoryName: "Jewelry", link: "/women/accessories/jewelry" },
          { subCategoryName: "Scarves", link: "/women/accessories/scarves" },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Kids & Baby",
    link: "/kids",
    featured: {
      title: "Kids & Baby Special",
      image: kids,
      description: "Adorable styles for the little ones",
      buttonText: "Shop Kids",
      buttonLink: "/kids",
    },
    Category: [
      {
        categoryName: "Boys",
        link: "/kids/boys",
        subCategory: [
          { subCategoryName: "T-Shirts", link: "/kids/boys/tshirts" },
          { subCategoryName: "Shorts", link: "/kids/boys/shorts" },
          { subCategoryName: "Ethnic Wear", link: "/kids/boys/ethnic" },
        ],
      },
      {
        categoryName: "Girls",
        link: "/kids/girls",
        subCategory: [
          { subCategoryName: "Frocks", link: "/kids/girls/frocks" },
          { subCategoryName: "Leggings", link: "/kids/girls/leggings" },
          { subCategoryName: "Sets", link: "/kids/girls/sets" },
        ],
      },
      {
        categoryName: "Baby",
        link: "/kids/baby",
        subCategory: [
          { subCategoryName: "Onesies", link: "/kids/baby/onesies" },
          { subCategoryName: "Rompers", link: "/kids/baby/rompers" },
          { subCategoryName: "Newborn Sets", link: "/kids/baby/newborn" },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Seasonal Trends",
    link: "/seasonal",
    featured: {
      title: "Seasonal Picks",
      image: seasonal,
      description: "Explore the best of seasonal fashion",
      buttonText: "View Trends",
      buttonLink: "/seasonal",
    },
    Category: [
      {
        categoryName: "Winter Collection",
        link: "/seasonal/winter",
        subCategory: [
          { subCategoryName: "Jackets", link: "/seasonal/winter/jackets" },
          { subCategoryName: "Sweaters", link: "/seasonal/winter/sweaters" },
          { subCategoryName: "Thermals", link: "/seasonal/winter/thermals" },
        ],
      },
      {
        categoryName: "Summer Styles",
        link: "/seasonal/summer",
        subCategory: [
          { subCategoryName: "Shorts", link: "/seasonal/summer/shorts" },
          { subCategoryName: "T-Shirts", link: "/seasonal/summer/tshirts" },
          {
            subCategoryName: "Cotton Dresses",
            link: "/seasonal/summer/dresses",
          },
        ],
      },
      {
        categoryName: "Festive Wear",
        link: "/seasonal/festive",
        subCategory: [
          {
            subCategoryName: "Men's Kurta",
            link: "/seasonal/festive/men-kurta",
          },
          {
            subCategoryName: "Women's Saree",
            link: "/seasonal/festive/saree",
          },
          {
            subCategoryName: "Kids Festive",
            link: "/seasonal/festive/kids",
          },
        ],
      },
    ],
  },
];
