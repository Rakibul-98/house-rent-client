
import HeroSection from "@/components/home/heroSection/HeroSection";
import TestimonialSection from "@/components/home/testimonial/Testimonial";
import TrendingRentsSection from "@/components/home/trendingRents/TrendingRents";
import WhyChooseUsSection from "@/components/home/whyChooseUs/WhyChooseUs";
import { getAllListing } from "@/services/Listing";

const HomePage = async () => {

  const { data } = await getAllListing();

  console.log(data);

  if(!data?.result){
    console.error("No data found");
    return <div>No data found!</div>;
  }

  return (
    <div>
      <title>Home - House Finder</title>
      <HeroSection/>
      <TrendingRentsSection data={data?.result}/>
      <TestimonialSection/>
      <WhyChooseUsSection/>
    </div>
  );
};

export default HomePage;
