import { TNavLink } from "./TNavbar";

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
          { subCategoryName: "Tops", link: "/fashion/women/tops" },
          { subCategoryName: "Pants", link: "/fashion/women/pants" },
          { subCategoryName: "Shoes", link: "/fashion/women/shoes" },
          { subCategoryName: "Bags", link: "/fashion/women/bags" },
          { subCategoryName: "Jewelry", link: "/fashion/women/jewelry" },
        ],
      },
      {
        categoryName: "Men's Fashion",
        link: "/fashion/men",
        subCategory: [
          { subCategoryName: "T-Shirts", link: "/fashion/men/tshirts" },
          { subCategoryName: "Shirts", link: "/fashion/men/shirts" },
          { subCategoryName: "Pants", link: "/fashion/men/pants" },
          { subCategoryName: "Shoes", link: "/fashion/men/shoes" },
          { subCategoryName: "Watches", link: "/fashion/men/watches" },
        ],
      },
      {
        categoryName: "Kids Fashion",
        link: "/fashion/kids",
        subCategory: [
          { subCategoryName: "Boys Clothing", link: "/fashion/kids/boys" },
          { subCategoryName: "Girls Clothing", link: "/fashion/kids/girls" },
          { subCategoryName: "Baby Clothing", link: "/fashion/kids/baby" },
          { subCategoryName: "Kids Footwear", link: "/fashion/kids/shoes" },
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
  {
    MainCategoryName: "Beauty & Personal Care",
    link: "/beauty",
    Category: [
      {
        categoryName: "Makeup",
        link: "/beauty/makeup",
        subCategory: [
          { subCategoryName: "Face", link: "/beauty/makeup/face" },
          { subCategoryName: "Eyes", link: "/beauty/makeup/eyes" },
          { subCategoryName: "Lips", link: "/beauty/makeup/lips" },
          { subCategoryName: "Nails", link: "/beauty/makeup/nails" },
        ],
      },
      {
        categoryName: "Skin Care",
        link: "/beauty/skincare",
        subCategory: [
          {
            subCategoryName: "Moisturizers",
            link: "/beauty/skincare/moisturizers",
          },
          { subCategoryName: "Cleansers", link: "/beauty/skincare/cleansers" },
          {
            subCategoryName: "Treatments",
            link: "/beauty/skincare/treatments",
          },
          { subCategoryName: "Sun Care", link: "/beauty/skincare/suncare" },
        ],
      },
      {
        categoryName: "Hair Care",
        link: "/beauty/haircare",
        subCategory: [
          { subCategoryName: "Shampoo", link: "/beauty/haircare/shampoo" },
          {
            subCategoryName: "Conditioner",
            link: "/beauty/haircare/conditioner",
          },
          { subCategoryName: "Hair Oil", link: "/beauty/haircare/oil" },
          { subCategoryName: "Styling", link: "/beauty/haircare/styling" },
        ],
      },
    ],
  },
];
