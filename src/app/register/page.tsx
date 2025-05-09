import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import Image from "next/image";
import registerImg from "../../assets/svg/signup.svg";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Loader2 className="animate-spin h-12 w-12 text-primary" />
        </div>
      }
    >
      <div className="lg:w-[90%] mx-auto">
        <div className="min-h-screen flex flex-col lg:flex-row relative">
          <title>Registration - House Finder</title>
          <div className="relative z-10 min-h-screen flex items-center justify-center w-full lg:w-1/2 my-5 lg:my-0">
            <RegisterForm />
          </div>
          <div className="absolute inset-0 lg:relative lg:w-1/2">
            <Image
              src={registerImg}
              alt="Register img"
              fill
              className="object-cover lg:object-contain"
              priority
            />
            <div className="absolute inset-0 bg-black/50 lg:hidden" />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
