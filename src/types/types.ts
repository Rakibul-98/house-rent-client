export type userType = {
    email: string;
    exp?: number;
    iat?: number;
    isBlocked: boolean;
    isDeleted: boolean;
    phone_num: string;
    profile_image: string;
    role: "tenant" | "admin" | "owner";
    user_name: string;
  };
  