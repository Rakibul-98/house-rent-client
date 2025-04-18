import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import Image from "next/image";
import registerImg from "../../assets/svg/signup.svg";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center gap-10 my-10">
        <title>Registration - House Finder</title>
        <RegisterForm />
        <Image
          className="hidden lg:block"
          src={registerImg}
          alt="House Rent Logo"
          width={600}
          height={500}
        />
      </div>
    </Suspense>
  );
}
