import LoginForm from "@/components/modules/auth/login/LoginForm";
import Image from "next/image";
import loginImg from "../../assets/svg/login.svg";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 animate-pulse">
          <div className="w-[90%] lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-[400px] lg:h-[600px] bg-gray-300 rounded-lg"></div>

            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
              <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-6 w-full bg-gray-200 rounded"></div>
              <div className="h-6 w-full bg-gray-200 rounded"></div>
              <div className="h-6 w-full bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-400 rounded mt-4"></div>
            </div>
          </div>
        </div>
      }
    >
      <div className="lg:w-[90%] mx-auto">
        <div className="min-h-screen flex flex-col lg:flex-row relative">
          <title>Login - House Finder</title>

          <div className="absolute inset-0 lg:relative lg:w-1/2">
            <Image
              src={loginImg}
              alt="House Rent Logo"
              fill
              className="object-cover lg:object-contain"
              priority
            />
            <div className="absolute inset-0 bg-black/50 lg:hidden" />
          </div>

          <div className="relative z-10 min-h-screen flex items-center justify-center w-full lg:w-1/2 my-5 lg:my-0">
            <LoginForm />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
