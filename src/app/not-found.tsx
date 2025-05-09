import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import img from "../assets/svg/error.svg";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="">
        <Image src={img} alt="404 Illustration" fill className="object-contain" />
      </div>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
