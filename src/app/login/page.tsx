import LoginForm from "@/components/modules/auth/login/LoginForm";
import Image from "next/image";
import loginImg from '../../assets/svg/login.svg';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center gap-10 justify-center my-10">
      <title>Login - House Finder</title>
      <Image className="hidden lg:block" src={loginImg} alt="House Rent Logo" width={500} height={500} />
      <LoginForm />
    </div>
  );
}
