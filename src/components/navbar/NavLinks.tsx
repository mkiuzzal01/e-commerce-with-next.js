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
        link: "/men/category/clothing",
        subCategory: [
          {
            subCategoryName: "T-Shirts",
            link: "/men/category/subCategory/t-shirts",
          },
          {
            subCategoryName: "Shirts",
            link: "/men/category/subCategory/shirts",
          },
          {
            subCategoryName: "Jeans",
            link: "/men/category/subCategory/jeans",
          },
          {
            subCategoryName: "Trousers",
            link: "/men/category/subCategory/trousers",
          },
          {
            subCategoryName: "Ethnic Wear",
            link: "/men/category/subCategory/ethnic-wear",
          },
          {
            subCategoryName: "Winter Wear",
            link: "/men/category/subCategory/winter-wear",
          },
        ],
      },
      {
        categoryName: "Footwear",
        link: "/men/category/footwear",
        subCategory: [
          {
            subCategoryName: "Casual Shoes",
            link: "/men/category/subCategory/casual-shoes",
          },
          {
            subCategoryName: "Sports Shoes",
            link: "/men/category/subCategory/sports-shoes",
          },
          {
            subCategoryName: "Sandals",
            link: "/men/category/subCategory/sandals",
          },
        ],
      },
      {
        categoryName: "Accessories",
        link: "/men/category/accessories",
        subCategory: [
          {
            subCategoryName: "Watches",
            link: "/men/category/subCategory/watches",
          },
          {
            subCategoryName: "Belts",
            link: "/men/category/subCategory/belts",
          },
          {
            subCategoryName: "Sunglasses",
            link: "/men/category/subCategory/sunglasses",
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
        link: "/women/category/clothing",
        subCategory: [
          {
            subCategoryName: "Dresses",
            link: "/women/category/subCategory/dresses",
          },
          {
            subCategoryName: "Tops",
            link: "/women/category/subCategory/tops",
          },
          {
            subCategoryName: "Skirts",
            link: "/women/category/subCategory/skirts",
          },
          {
            subCategoryName: "Sarees",
            link: "/women/category/subCategory/sarees",
          },
          {
            subCategoryName: "Salwar Kameez",
            link: "/women/category/subCategory/salwar-kameez",
          },
          {
            subCategoryName: "Winter Wear",
            link: "/women/category/subCategory/winter-wear",
          },
        ],
      },
      {
        categoryName: "Footwear",
        link: "/women/category/footwear",
        subCategory: [
          {
            subCategoryName: "Flats",
            link: "/women/category/subCategory/flats",
          },
          {
            subCategoryName: "Heels",
            link: "/women/category/subCategory/heels",
          },
          {
            subCategoryName: "Sneakers",
            link: "/women/category/subCategory/sneakers",
          },
        ],
      },
      {
        categoryName: "Accessories",
        link: "/women/category/accessories",
        subCategory: [
          {
            subCategoryName: "Handbags",
            link: "/women/category/subCategory/handbags",
          },
          {
            subCategoryName: "Jewelry",
            link: "/women/category/subCategory/jewelry",
          },
          {
            subCategoryName: "Scarves",
            link: "/women/category/subCategory/scarves",
          },
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
        link: "/kids/category/boys",
        subCategory: [
          {
            subCategoryName: "T-Shirts",
            link: "/kids/category/subCategory/t-shirts",
          },
          {
            subCategoryName: "Shorts",
            link: "/kids/category/subCategory/shorts",
          },
          {
            subCategoryName: "Ethnic Wear",
            link: "/kids/category/subCategory/ethnic-wear",
          },
        ],
      },
      {
        categoryName: "Girls",
        link: "/kids/category/girls",
        subCategory: [
          {
            subCategoryName: "Frocks",
            link: "/kids/category/subCategory/frocks",
          },
          {
            subCategoryName: "Leggings",
            link: "/kids/category/subCategory/leggings",
          },
          {
            subCategoryName: "Sets",
            link: "/kids/category/subCategory/sets",
          },
        ],
      },
      {
        categoryName: "Baby",
        link: "/kids/category/baby",
        subCategory: [
          {
            subCategoryName: "Onesies",
            link: "/kids/category/subCategory/onesies",
          },
          {
            subCategoryName: "Rompers",
            link: "/kids/category/subCategory/rompers",
          },
          {
            subCategoryName: "Newborn Sets",
            link: "/kids/category/subCategory/newborn-sets",
          },
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
        link: "/seasonal/category/winter",
        subCategory: [
          {
            subCategoryName: "Jackets",
            link: "/seasonal/category/subCategory/jackets",
          },
          {
            subCategoryName: "Sweaters",
            link: "/seasonal/category/subCategory/sweaters",
          },
          {
            subCategoryName: "Thermals",
            link: "/seasonal/category/subCategory/thermals",
          },
        ],
      },
      {
        categoryName: "Summer Styles",
        link: "/seasonal/category/summer",
        subCategory: [
          {
            subCategoryName: "Shorts",
            link: "/seasonal/category/subCategory/shorts",
          },
          {
            subCategoryName: "T-Shirts",
            link: "/seasonal/category/subCategory/t-shirts",
          },
          {
            subCategoryName: "Cotton Dresses",
            link: "/seasonal/category/subCategory/cotton-dresses",
          },
        ],
      },
      {
        categoryName: "Festive Wear",
        link: "/seasonal/category/festive",
        subCategory: [
          {
            subCategoryName: "Men's Kurta",
            link: "/seasonal/category/subCategory/mens-kurta",
          },
          {
            subCategoryName: "Women's Saree",
            link: "/seasonal/category/subCategory/womens-saree",
          },
          {
            subCategoryName: "Kids Festive",
            link: "/seasonal/category/subCategory/kids-festive",
          },
        ],
      },
    ],
  },
];
