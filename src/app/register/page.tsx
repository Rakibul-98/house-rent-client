import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import Image from "next/image";
import registerImg from '../../assets/svg/signup.svg';

export default function RefisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-10 my-10">
      <RegisterForm />
      <Image
        className="hidden lg:block"
        src={registerImg}
        alt="House Rent Logo"
        width={600}
        height={500}
      />
    </div>
  );
}
