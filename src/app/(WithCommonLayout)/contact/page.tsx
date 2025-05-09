"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import img from "../../../assets/svg/contact.svg";
import { toast } from "sonner";
import Image from "next/image";
import Title from "@/components/home/Shared/Title";

type FormInputs = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("Form Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <div className="lg:w-[90%] mx-auto">
      <title>Contact - House Finder</title>
      <div className="min-h-screen flex flex-col lg:flex-row relative">
        <div className="absolute inset-0 lg:relative lg:w-1/2">
          <Image
            src={img}
            alt="contact img"
            fill
            className="object-cover lg:object-contain"
            priority
          />
          <div className="absolute inset-0 bg-black/50 lg:hidden" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center w-full lg:w-1/2 my-5 lg:my-0">
          <div className="rounded-md w-[80%] sm:w-[60%] lg:w-[70%] bg-white/95 p-5 shadow-2xl px-10">
            <div className="w-fit">
              <Title title="Contact Us" />
            </div>
            <p className="text-gray-600 mt-2">We’d love to hear from you!</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Enter your name"
                  className={`${
                    errors.name && "border-red-500 focus:outline-red-500"
                  } w-full mt-1 px-4 py-2 border rounded-lg`}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className={`${
                    errors.email && "border-red-500 focus:outline-red-500"
                  } w-full mt-1 px-4 py-2 border rounded-lg`}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message should be at least 10 characters",
                    },
                  })}
                  rows={4}
                  placeholder="Type your message here..."
                  className={`${
                    errors.message && "border-red-500 focus:outline-red-500"
                  } w-full mt-1 px-4 py-2 border rounded-lg`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-80 text-white font-semibold py-2 rounded-lg transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
