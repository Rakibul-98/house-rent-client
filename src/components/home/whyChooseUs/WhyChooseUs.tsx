"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Home, ShieldCheck, HeartHandshake, Clock, Star } from "lucide-react";
import Title from "../Shared/Title";

const reasons = [
  {
    id: 1,
    icon: <Home className="w-12 h-12 " />,
    title: "Wide Range of Listings",
    description:
      "Explore thousands of properties tailored to your needs, from cozy apartments to spacious villas.",
  },
  {
    id: 2,
    icon: <ShieldCheck className="w-12 h-12 " />,
    title: "Secure Transactions",
    description:
      "Our platform ensures safe and secure transactions for both renters and property owners.",
  },
  {
    id: 3,
    icon: <HeartHandshake className="w-12 h-12 " />,
    title: "Customer Support",
    description:
      "Our dedicated support team is available 24/7 to assist you with any queries or issues.",
  },
  {
    id: 4,
    icon: <Clock className="w-12 h-12 " />,
    title: "Save Time",
    description:
      "Find your perfect home or tenant quickly with our user-friendly platform and advanced filters.",
  },
  {
    id: 5,
    icon: <Star className="w-12 h-12" />,
    title: "Trusted Reviews",
    description:
      "Make informed decisions by reading verified reviews from previous tenants and buyers.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="my-16">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-center mb-10">
          <Title title="Why Choose Us?" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {reasons.map((reason) => (
            <Card
              key={reason.id}
              className="text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0"
            >
              <CardHeader className="flex items-center justify-center">
                <div className="mb-4 text-[#5274b8]">{reason.icon}</div>
                <CardTitle className="text-xl font-semibold">
                  {reason.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}