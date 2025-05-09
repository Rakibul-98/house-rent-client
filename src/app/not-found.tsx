import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import img from "../assets/svg/error.svg";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10">
      <div className="w-full max-w-xl">
        <Image
          src={img}
          alt="404 Illustration"
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      <p className="-mt-2 mb-6 max-w-md">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
