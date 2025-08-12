export type TGender = "male" | "female" | "other";
export type TUserStatus = "in-progress" | "blocked";
export type TUserRole = "super-admin" | "admin" | "user";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocation = {
  presentAddress: string;
  permanentAddress: string;
};

export type TUserProfile = {
  _id: string;
  slug: string;
  name: TName;
  email: string;
  phone: string;
  address?: TLocation;
  gender?: TGender;
  password?: string;
  profileImage?: string;
  passwordChangeAt?: string | Date;
  role: TUserRole;
  status: TUserStatus;
  isDeleted: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};
