import React from "react";
import BannerSection from "./BannerSection";
import StatsSection from "./StatsSection";
import LanguageCategories from "./LanguageCategories";
import FeaturedTutors from "./FeaturedTutors";
import HowItWorks from "./HowItWorks";
import StudentTestimonials from "./StudentTestimonials";
import AppBanner from "./AppBanner";

const Home = () => {
  return (
    <div>
      <BannerSection />
      <StatsSection />
      <LanguageCategories />
      <FeaturedTutors />
      <HowItWorks />
      <StudentTestimonials />
      <AppBanner />
    </div>
  );
};

export default Home;
