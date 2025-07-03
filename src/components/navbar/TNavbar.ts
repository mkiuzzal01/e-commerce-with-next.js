import { StaticImageData } from "next/image";
export type TSubCategory = {
  subCategoryName: string;
  link: string;
};

export type TCategory = {
  categoryName: string;
  link: string;
  subCategory: TSubCategory[];
};

export type TFeatured = {
  image: StaticImageData | string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

export type TMainCategory = {
  MainCategoryName: string;
  link: string;
  Category: TCategory[];
  featured?: TFeatured;
};

export type TNavLink = TMainCategory[];
