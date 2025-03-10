import HeroSection from "@/components/home/heroSection/HeroSection";
import TestimonialSection from "@/components/home/testimonial/Testimonial";
import TrendingRentsSection from "@/components/home/trendingRents/TrendingRents";
import WhyChooseUsSection from "@/components/home/whyChooseUs/WhyChooseUs";
import { getAllListing } from "@/services/Listing";

const HomePage = async () => {

  const { data } = await getAllListing();
  console.log(data);

  return (
    <div>
      <HeroSection/>
      <TrendingRentsSection data={data?.result}/>
      <TestimonialSection/>
      <WhyChooseUsSection/>
    </div>
  );
};

export default HomePage;
