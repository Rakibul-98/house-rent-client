export type userType = {
    email: string;
    exp?: number;
    iat?: number;
    isBlocked?: boolean;
    isDeleted?: boolean;
    phone_num: string;
    profile_image: string;
    role: "tenant" | "admin" | "owner";
    user_name: string;
    _id?: string;
    createdAt?:string;
  };
  

export type listingType = {
  _id: string;
  propertyTitle: string;
  areaSize: number;
  houseType:"Apartment" | "Duplex" | "Single Family" | "Shared Room" | "Penthouse";
  createdAt?: string;
  updatedAt?: string;
  house_description: string;
  isAvailable?: boolean;
  isDeleted?: boolean;
  numberOfBedrooms: number;
  rentAmount: number;
  rentalHouseLocation: string;
  rentalImages: string[];
  features: string[];
  owner: {
    _id: string;
    user_name: string;
    email: string;
    phone_num: string;
    isDeleted?: boolean;
  };
  __v: number;
};

export type requestType = {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  listing: listingType;
  message: string;
  paymentStatus: "active" | "inactive";
  phone: string;
  requestStatus: "pending" | "approved" | "rejected";
  tenant: userType;
  totalAmount: number;
  __v?: number;
};