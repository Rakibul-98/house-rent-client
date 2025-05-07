"use client";

import { Facebook, Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/hf logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Rentals" },
  { href: "/about", label: "About Us" },
  { href: "#testimonial", label: "Testimonial" },
];

const socialLinks = [
  { href: "#", icon: Facebook },
  { href: "#", icon: Instagram },
  { href: "#", icon: X },
];

const Footer = () => {
  return (
    <footer className="bg-[#5274b8] text-white pt-8">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
            <Image src={logo} alt="Modern Apartment" className="h-20 w-auto" />
            </div>
            <p className="max-w-md mx-auto md:mx-0">
              Our house rental service offers a seamless experience with
              thousands of verified listings, flexible pricing, and secure
              transactions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end  space-y-6">
            <ul className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon: Icon }, index) => (
                <Link
                  href={href}
                  key={index}
                  className=" hover:text-primary"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-xs pt-10 md:pt-5 pb-5">
          &copy; {new Date().getFullYear()} House Finder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
