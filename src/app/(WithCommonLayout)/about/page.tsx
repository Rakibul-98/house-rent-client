"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import user1 from "../../../assets/users/fem_user (1).png";
import user2 from "../../../assets/users/fem_user (2).png";
import user3 from "../../../assets/users/male_user (4).png";
import user4 from "../../../assets/users/male_user (6).png";
import missionImg from "../../../assets/svg/mission.svg";
import Link from "next/link";
import img from "../../../assets/images/about-banner.jpg";
import Title from "@/components/home/Shared/Title";

const teamMembers = [
  {
    name: "John Doe",
    title: "CEO & Founder",
    image: user3,
    description:
      "As the CEO of Home Finder, my vision is to revolutionize the way people find their homes.",
  },
  {
    name: "Jane Smith",
    title: "Lead Designer",
    image: user1,
    description:
      "As the Lead Designer, my goal is to create an intuitive and visually appealing experience that makes home searching enjoyable.",
  },
  {
    name: "Michael Johnson",
    title: "Senior Developer",
    image: user4,
    description:
      "As a Developer at Home Finder, I take pride in building the technology that powers our users’ home searches.",
  },
  {
    name: "Sarah Lee",
    title: "Marketing Manager",
    image: user2,
    description:
      "As the Marketer, my role is to connect with our audience and show them how our platform can transform their home-finding journey.",
  },
];

const coreValues = [
  {
    number: "01",
    title: "Innovation",
    description:
      "We embrace creativity and cutting-edge technology to redefine the home-finding experience, making it smarter, faster, and more intuitive for everyone.",
  },
  {
    number: "02",
    title: "Integrity",
    description:
      "We build trust by being transparent, honest, and accountable in every interaction, ensuring our users feel confident and supported throughout their journey.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "We believe in the power of teamwork, bringing together diverse perspectives to create solutions that truly make a difference in people’s lives.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <title>About Us - House Finder</title>
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image src={img} fill alt="banner-img" className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="text-5xl font-bold mb-4 border-b-4 border-[#5274b8]">
            About Us
          </h1>
          <p className="text-xl max-w-xl">
            We are a team of passionate individuals dedicated to creating
            amazing experiences.
          </p>
        </div>
      </div>
      <div className="w-[90%] mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-80 overflow-hidden ">
            <Image
              className="object-contain object-center"
              src={missionImg}
              alt="Our Mission"
            />
          </div>
          <div className="flex flex-col">
            <div className="w-fit mb-4">
              <Title title="Our Mission" />
            </div>
            <p className="max-w-xl mb-4">
              At House Finder, our mission is to simplify the journey of finding
              the perfect home by providing a seamless, transparent, and
              user-friendly platform. We are committed to empowering individuals
              and families with the tools, resources, and support they need to
              make informed decisions about their living spaces. By connecting
              people with trusted listings, real estate professionals, and
              community insights, we strive to turn the dream of finding a home
              into a reality for everyone.
            </p>
          </div>
        </div>

        <div className="my-10">
          <div className="w-fit mx-auto mb-8">
            <Title title="Meet Our Team" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="p-0 pb-5 border-0 hover:shadow-lg transition-shadow gap-3 rounded-md"
              >
                <CardHeader>
                  <div className="relative h-48 w-full rounded-lg overflow-hidden mb-3">
                    <Image
                      src={member.image}
                      alt={`Team Member ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="my-10">
          <div className="w-fit mx-auto mb-8">
            <Title title="Our Values" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 rounded-md bg-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{value.number}</Badge>
                    <span>{value.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-6">
            Be part of our journey and create something amazing together.
          </p>
          <Link href="/login">
            <Button variant="secondary" className="w-fit cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
