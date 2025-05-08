import LoginForm from "@/components/modules/auth/login/LoginForm";
import Image from "next/image";
import loginImg from "../../assets/svg/login.svg";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
