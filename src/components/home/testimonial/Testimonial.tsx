"use client";

import { useKeenSlider } from "keen-slider/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Title from "../Shared/Title";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Tenant",
    comment:
      "This platform made finding my dream home so easy! The listings are accurate, and the process is seamless.",
    avatar: "https://i.ibb.co.com/5g8hrfBv/male-user-4.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Property Owner",
    comment:
      "Listing my property was a breeze, and I found a great tenant within days. Highly recommend!",
    avatar: "https://i.ibb.co.com/KjQ6pm6g/fem-user-2.png",
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Tenant",
    comment:
      "The search filters are fantastic, and the customer support team is very responsive. Great experience!",
    avatar: "https://i.ibb.co.com/c5j3Tt7/male-user-6.png",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Property Owner",
    comment:
      "I love how user-friendly the platform is. It saved me so much time and effort in managing my rentals.",
    avatar: "https://i.ibb.co.com/8DZR4nvS/fem-user-1.png",
  },
];

export default function TestimonialCarousel() {

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
        },
      },
    },
    renderMode: "performance",
    created: (slider) => {
      setInterval(() => {
        slider.next();
      }, 1500);
    },
  });

  return (
    <section id="testimonial" className="my-16">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-center mb-10">
          <Title title="What Our Users Say" />
        </div>

        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="keen-slider__slide bg-gray-50 rounded-md p-6 text-center"
            >
              <Avatar className="w-18 h-18 mx-auto mb-2">
                <AvatarImage src={t.avatar} alt={t.name} />
                <AvatarFallback>{t.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{t.role}</p>
              <p className="text-gray-600 italic max-w-md mx-auto">
                &quot;{t.comment}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
