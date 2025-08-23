export type TPhoto = {
  publicId?: string;
  url?: string;
};

export type TProductImage = {
  photo?: TPhoto;
};
export type TReview = {
  productId: string;
  userId: string;
  rating?: number | string;
  comment?: string;
};

export type TProduct = {
  _id: string;
  title?: string;
  price?: number;
  slug?: string;
  productImage?: TProductImage;
};

export type TOrderItem = {
  productId: TProduct;
  size: string;
  color: string;
  quantity: number;
};

export type TLocation = {
  presentAddress: string;
  permanentAddress?: string;
};

export type TCustomerName = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
};

export type TCustomer = {
  _id: string;
  slug?: string;
  email?: string;
  name?: TCustomerName;
};

export type TOrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "READY_FOR_PICKUP"
  | "DISPATCHED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DELIVERY_FAILED"
  | "RETURN_REQUESTED"
  | "RETURNED"
  | "CANCELLED";

export type TOrder = {
  _id: string;
  slug?: string;
  orderItems: TOrderItem[];
  customerId: TCustomer;
  reviews: TReview[];
  deliveryAddress: TLocation;
  totalPrice: number;
  orderStatus: TOrderStatus;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};
