"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import img1 from "../../../assets/carouselImg/carousel (1).jpg";
import img2 from "../../../assets/carouselImg/carousel (2).jpg";
import img3 from "../../../assets/carouselImg/carousel (3).jpg";
import img4 from "../../../assets/carouselImg/carousel (6).jpg";
import img5 from "../../../assets/carouselImg/carousel (5).jpg";

const slides = [
  {
    img: img1,
    title: "Modern Living in the City",
    subtitle: "Discover premium apartments in the heart of town.",
    position: "left",
  },
  {
    img: img2,
    title: "Cozy Family Homes",
    subtitle: "Perfect spaces for comfort and connection.",
    position: "right",
  },
  {
    img: img3,
    title: "Luxury Villas",
    subtitle: "Elegant homes that reflect your lifestyle.",
    position: "left",
  },
  {
    img: img4,
    title: "Affordable Rentals",
    subtitle: "Comfort and quality within your reach.",
    position: "right",
  },
  {
    img: img5,
    title: "Beachside Serenity",
    subtitle: "Wake up to breathtaking sea views every day.",
    position: "left",
  },
];

export default function HeroSection() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    renderMode: "performance",
    created: (slider) => {
      setInterval(() => {
        slider.next();
      }, 3000);
    },
  });

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div ref={sliderRef} className="keen-slider h-full">
        {slides.map((slide, idx) => (
          <div className="keen-slider__slide relative h-full w-full" key={idx}>
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              className="object-cover"
              priority={idx === 0}
            />

            <div
              className={`absolute z-10 top-0 bottom-0 w-full ${
                slide.position === "left"
                  ? "left-0 bg-gradient-to-r from-black/80 to-transparent"
                  : "right-0 bg-gradient-to-l from-black/80 to-transparent"
              }`}
            />

            <div
              className={`absolute z-20 top-1/2 transform -translate-y-1/2 text-white px-6 w-full max-w-2xl ${
                slide.position === "left"
                  ? "left-10 text-left"
                  : "right-10 text-right"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-2 underline decoration-[#5274b8]">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
