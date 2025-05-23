import { getCurrentUser } from "@/services/AuthService";
import { NextRequest, NextResponse } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  tenant: [/^\/tenant/, /^\/create-request/, /^\/request-listing\/[a-zA-Z0-9]+$/ ],
  owner: [/^\/owner/, /^\/create-listing/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `https://house-finder-rakibul.vercel.app/login?redirectPath=${pathname}`,
          request.url
        )
      ); 
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/create-listing",
    "/admin",
    "/admin/:page",
    "/tenant",
    "/tenat/:page",
    "/owner",
    "/owner/:page",
    "/request-listing/:path*",
  ],
};
