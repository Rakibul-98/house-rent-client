"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import user1 from '../../../assets/users/fem_user (1).png';
import user2 from '../../../assets/users/fem_user (2).png';
import user3 from '../../../assets/users/male_user (4).png';
import user4 from '../../../assets/users/male_user (6).png';
import missionImg from '../../../assets/svg/mission.svg';
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
            <title>About Us - House Finder</title>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            We are a team of passionate individuals dedicated to creating amazing experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={missionImg}
              alt="Our Mission"
              fill
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
            At House Finder, our mission is to simplify the journey of finding the perfect home by providing a seamless, transparent, and user-friendly platform. We are committed to empowering individuals and families with the tools, resources, and support they need to make informed decisions about their living spaces. By connecting people with trusted listings, real estate professionals, and community insights, we strive to turn the dream of finding a home into a reality for everyone.
            </p>
            <Button className="w-fit">Learn More</Button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={user3}
                    alt="Team Member 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>CEO & Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                As the CEO of Home Finder, my vision is to revolutionize the way people find their homes.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={user1}
                    alt="Team Member 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle>Jane Smith</CardTitle>
                <CardDescription>Lead Designer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                As the Lead Designer, my goal is to create an intuitive and visually appealing experience that makes home searching enjoyable. 
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={user4}
                    alt="Team Member 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle>Michael Johnson</CardTitle>
                <CardDescription>Senior Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                As a Developer at Home Finder, I take pride in building the technology that powers our users’ home searches.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={user2}
                    alt="Team Member 4"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle>Sarah Lee</CardTitle>
                <CardDescription>Marketing Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                As the Marketer, my role is to connect with our audience and show them how our platform can transform their home-finding journey. 
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">01</Badge>
                  <span>Innovation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                We embrace creativity and cutting-edge technology to redefine the home-finding experience, making it smarter, faster, and more intuitive for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">02</Badge>
                  <span>Integrity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                We build trust by being transparent, honest, and accountable in every interaction, ensuring our users feel confident and supported throughout their journey.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">03</Badge>
                  <span>Collaboration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                We believe in the power of teamwork, bringing together diverse perspectives to create solutions that truly make a difference in people’s lives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 text-center">
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