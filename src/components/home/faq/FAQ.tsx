"use client";

import Image from "next/image";
import React, { useState } from "react";
import img from "../../../assets/svg/FAQs.svg";
import Title from "../Shared/Title";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I search for available properties?",
      answer:
        "Use the search bar on the listings page or use mega menu to enter your desired location, property type, and other filters to see available listings.",
    },
    {
      question: "How do I make a booking for a rental property?",
      answer:
        "Once you've selected a property, you can click on the 'Request' button and after arequest accepted, pay the rent ant confirm booking.",
    },
    {
      question: "What is the cancellation policy for bookings?",
      answer:
        "The cancellation policy varies by property. Please refer to the individual property listing for detailed terms. Generally, cancellations made 24 hours before check-in are eligible for a full refund.",
    },
    {
      question: "How do I contact the property owner?",
      answer:
        "You can contact the property owner directly via the 'contact number'only after your request accepted.",
    },
    {
      question: "Can I pay the rent online?",
      answer:
        "Yes, we support online payments through secure payment gateways. You can make payments for bookings and monthly rents via credit/debit cards or other available payment methods.",
    },
  ];

  return (
    <section className="mt-10">
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="w-fit mb-5">
            <Title title="Frequently Asked Questions" />
          </div>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                onClick={() => toggle(index)}
                className="cursor-pointer rounded-lg p-4 shadow-sm transition hover:shadow-md bg-base-100"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <span className="text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600 text-sm">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block lg:w-full lg:h-full lg:col-span-1">
          <Image
            src={img}
            alt="FAQ illustration"
            layout="responsive"
            width={1600}
            height={900}
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
