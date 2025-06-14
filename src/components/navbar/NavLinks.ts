import { TNavLink } from "./TNavbar";

export const navLinks: TNavLink = [
  {
    MainCategoryName: "Men",
    link: "/men",
    Category: [
      {
        categoryName: "Clothing",
        link: "/men/clothing",
        subCategory: [
          { subCategoryName: "T-Shirts", link: "/men/clothing/tshirts" },
          { subCategoryName: "Shirts", link: "/men/clothing/shirts" },
          { subCategoryName: "Jackets", link: "/men/clothing/jackets" },
        ],
      },
      {
        categoryName: "Footwear",
        link: "/men/footwear",
        subCategory: [
          { subCategoryName: "Sneakers", link: "/men/footwear/sneakers" },
          { subCategoryName: "Sandals", link: "/men/footwear/sandals" },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Women",
    link: "/women",
    Category: [
      {
        categoryName: "Clothing",
        link: "/women/clothing",
        subCategory: [
          { subCategoryName: "Dresses", link: "/women/clothing/dresses" },
          { subCategoryName: "Tops", link: "/women/clothing/tops" },
          { subCategoryName: "Skirts", link: "/women/clothing/skirts" },
        ],
      },
      {
        categoryName: "Accessories",
        link: "/women/accessories",
        subCategory: [
          { subCategoryName: "Bags", link: "/women/accessories/bags" },
          { subCategoryName: "Watches", link: "/women/accessories/watches" },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Electronics",
    link: "/electronics",
    Category: [
      {
        categoryName: "Mobiles",
        link: "/electronics/mobiles",
        subCategory: [
          {
            subCategoryName: "Smartphones",
            link: "/electronics/mobiles/smartphones",
          },
          {
            subCategoryName: "Feature Phones",
            link: "/electronics/mobiles/feature-phones",
          },
        ],
      },
      {
        categoryName: "Laptops",
        link: "/electronics/laptops",
        subCategory: [
          {
            subCategoryName: "Gaming Laptops",
            link: "/electronics/laptops/gaming",
          },
          {
            subCategoryName: "Ultrabooks",
            link: "/electronics/laptops/ultrabooks",
          },
        ],
      },
    ],
  },
  {
    MainCategoryName: "Beauty",
    link: "/beauty",
    Category: [
      {
        categoryName: "Skin Care",
        link: "/beauty/skin-care",
        subCategory: [
          { subCategoryName: "Face Wash", link: "/beauty/skin-care/face-wash" },
          {
            subCategoryName: "Moisturizers",
            link: "/beauty/skin-care/moisturizers",
          },
        ],
      },
      {
        categoryName: "Hair Care",
        link: "/beauty/hair-care",
        subCategory: [
          { subCategoryName: "Shampoo", link: "/beauty/hair-care/shampoo" },
          { subCategoryName: "Hair Oil", link: "/beauty/hair-care/hair-oil" },
        ],
      },
    ],
  },
];
