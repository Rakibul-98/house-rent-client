"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  return (
    <section id="testimonial" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          What Our Users Say
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="text-center">
                <Avatar className="w-18 h-18 mx-auto mb-2">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>
                <p className="text-gray-600 italic max-w-2xl mx-auto mb-12">
                &quot;{testimonial.comment}&quot;
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}