export interface TSubCategory {
  _id: string;
  name: string;
  slug?: string;
}

export interface TCategory {
  _id: string;
  name: string;
  slug?: string;
}

export interface TImage {
  _id: string;
  name: string;
  url: string;
}

export interface TNavLink {
  _id: string;
  name: string;
  slug: string;
  image: TImage;
  category: TCategory[];
  subCategory: TSubCategory[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
