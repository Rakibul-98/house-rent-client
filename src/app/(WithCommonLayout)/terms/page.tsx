import Image from "next/image";
import React from "react";
import img from "../../../assets/images/trms0cover.jpg";

const TermsPage = () => {
  return (
    <div>
      <title>Terms - House Finder</title>
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image src={img} fill alt="banner-img" className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="text-5xl font-bold mb-4 border-b-4 border-[#5274b8]">
            Terms and Conditions
          </h1>
          <p className="text-xl max-w-xl">
            We are a team of passionate individuals dedicated to creating
            amazing experiences.
          </p>
        </div>
      </div>
      <div className="w-[90%] mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to our platform. By accessing or using our services, you
              agree to be bound by these Terms and Conditions. Please read them
              carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Use of the Website
            </h2>
            <p>
              You agree to use the site only for lawful purposes. You must not
              use this site in any way that causes damage or affects its
              availability or accessibility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Intellectual Property
            </h2>
            <p>
              All content, trademarks, and data on this website, including but
              not limited to text, graphics, logos, and icons are the property
              of the website owner and protected by copyright.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy
              to understand how we collect, use, and safeguard your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              website means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at support@example.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
