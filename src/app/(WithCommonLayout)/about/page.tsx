"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            We are a team of passionate individuals dedicated to creating amazing experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/about-mission.jpg" // Replace with your image
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button className="w-fit">Learn More</Button>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/team-member-1.jpg" // Replace with your image
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/team-member-2.jpg" // Replace with your image
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/team-member-3.jpg" // Replace with your image
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </CardContent>
            </Card>

            {/* Team Member 4 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/team-member-4.jpg" // Replace with your image
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">01</Badge>
                  <span>Innovation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
            </Card>

            {/* Value 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">02</Badge>
                  <span>Integrity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
            </Card>

            {/* Value 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">03</Badge>
                  <span>Collaboration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-6">
            Be part of our journey and create something amazing together.
          </p>
          <Button variant="secondary" className="w-fit">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;