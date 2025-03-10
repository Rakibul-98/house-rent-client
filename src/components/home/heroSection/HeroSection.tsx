import { Button } from "@/components/ui/button"; // Assuming you're using shadcn's Button component
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gray-400 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.jpg" // Replace with your image path
          alt="Modern Apartment"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Find Your Perfect Home
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Discover thousands of rental properties tailored to your needs. Whether
          you&apos;re looking for a cozy apartment or a spacious villa, we&apos;ve got you
          covered.
        </p>


        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
            List Your Property
          </Button>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Browse Rentals
          </Button>
        </div>
      </div>
    </section>
  );
}