"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImg from "../../../assets/heroImg.jpg";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gray-400 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg}
          alt="Modern Apartment"
          fill
          className="object-cover opacity-90"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold  mb-6">
          Find Your Perfect Home
        </h1>
        <p className="text-lg md:text-xl bg-slate-50 p-1 rounded-lg italic">
          Discover thousands of rental properties tailored to your needs.
          Whether you&apos;re looking for a cozy apartment or a spacious villa,
          we&apos;ve got you covered.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/listings" className=" h-fit">
            <Button className="cursor-pointer bg-green-600 hover:bg-white hover:text-green-600">
              Explore listings
              <ArrowBigRight/>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
