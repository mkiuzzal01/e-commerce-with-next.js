export type TStatus = "in-stock" | "out-of-stock" | "upcoming";
export type TActivity = "in-stock" | "market-launch";
export type TProductPlace =
  | "not-now"
  | "trending"
  | "flash-sale"
  | "new-arrivals";

export interface TImage {
  photo: {
    publicId: string;
    url: string;
  };
}

export type TProductVariant = {
  name: string;
  attributes: {
    value: string;
    quantity: number;
  }[];
};

export type TCategories = {
  mainCategory: string;
  category: string;
  subCategory?: string;
};

export type TReview = {
  userId: {
    name: string;
    profileImage: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
};

export type TProduct = {
  _id: string;
  creatorId?: string;
  productCode: string;
  slug?: string;
  title: string;
  subTitle?: string;
  totalQuantity: number;
  variants: TProductVariant[];
  price: number;
  discount: number;
  reviews: TReview[];
  categories: TCategories;
  description: string;
  status: TStatus;
  activity: TActivity;
  productPlace: TProductPlace;
  optionalImages?: TImage[];
  productImage: TImage;
  isDeleted: boolean;
};

export type TCartItem = {
  productId: string;
  selectedVariant?: {
    name: string;
    attribute: {
      value: string;
      quantity: number;
    };
  };
  price: number;
  discount?: number;
  addedAt?: string;
  lastUpdated?: string;
};

export type TWishlistItem = {
  _id: string;
};

export type TOptions = {
  label: string;
  value: string;
};
