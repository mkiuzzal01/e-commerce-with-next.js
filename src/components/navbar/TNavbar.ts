export type TSubCategory = {
  subCategoryName: string;
  link: string;
};

export type TCategory = {
  categoryName: string;
  link: string;
  subCategory: TSubCategory[];
};

export type TNavLink = {
  MainCategoryName: string;
  link: string;
  Category: TCategory[];
}[];
