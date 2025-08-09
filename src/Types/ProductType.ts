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

export type TProduct = {
  _id: string;
  creatorId?: string;
  productCode: string;
  slug?: string;
  title: string;
  subTitle?: string;
  totalQuantity: number | string;
  variants: TProductVariant[];
  price: number | string;
  discount: number | string;
  rating?: number | string;
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
  _id: string;
  title: string;
  slug?: string;
  productImage: string;
  price: number;
  discount: number;
  quantity: number;
  selectedVariant?: {
    name: string;
    attribute: {
      value: string;
      quantity: number;
    };
  };
};

export type TWishlistItem = {
  _id: string;
  title: string;
  slug?: string;
  productImage: string;
  price: number;
  discount: number;
};

export type TOptions = {
  label:string;
  value:string;
}

