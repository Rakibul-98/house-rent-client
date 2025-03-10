"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Assuming you're using shadcn's Card components
import { Home, ShieldCheck, HeartHandshake, Clock } from "lucide-react"; // Lucide Icons

const reasons = [
  {
    id: 1,
    icon: <Home className="w-12 h-12 text-blue-600" />,
    title: "Wide Range of Listings",
    description:
      "Explore thousands of properties tailored to your needs, from cozy apartments to spacious villas.",
  },
  {
    id: 2,
    icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
    title: "Secure Transactions",
    description:
      "Our platform ensures safe and secure transactions for both renters and property owners.",
  },
  {
    id: 3,
    icon: <HeartHandshake className="w-12 h-12 text-blue-600" />,
    title: "Customer Support",
    description:
      "Our dedicated support team is available 24/7 to assist you with any queries or issues.",
  },
  {
    id: 4,
    icon: <Clock className="w-12 h-12 text-blue-600" />,
    title: "Save Time",
    description:
      "Find your perfect home or tenant quickly with our user-friendly platform and advanced filters.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Why Choose Us?
        </h2>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <Card
              key={reason.id}
              className="text-center p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <CardHeader className="flex items-center justify-center">
                <div className="mb-4">{reason.icon}</div>
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