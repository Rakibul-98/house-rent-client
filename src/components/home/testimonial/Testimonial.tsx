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
    avatar: "/avatar1.jpg", // Replace with your image path
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Property Owner",
    comment:
      "Listing my property was a breeze, and I found a great tenant within days. Highly recommend!",
    avatar: "/avatar2.jpg", // Replace with your image path
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Tenant",
    comment:
      "The search filters are fantastic, and the customer support team is very responsive. Great experience!",
    avatar: "/avatar3.jpg", // Replace with your image path
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Property Owner",
    comment:
      "I love how user-friendly the platform is. It saved me so much time and effort in managing my rentals.",
    avatar: "/avatar4.jpg", // Replace with your image path
  },
];

export default function TestimonialCarousel() {

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          What Our Users Say
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-4">
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