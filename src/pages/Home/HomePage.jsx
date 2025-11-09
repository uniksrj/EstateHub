"use client"

import CTASection from "@/components/common/home/CTASection"
import FeaturedPropertiesSection from "@/components/common/home/FeaturedPropertiesSection"
import FeaturesSection from "@/components/common/home/FeaturesSection"
import HeroSection from "@/components/common/home/HeroSection"
import HowItWorksSection from "@/components/common/home/HowItWorksSection"
import StatisticsSection from "@/components/common/home/StatisticsSection"
import VideoTourSection from "@/components/common/home/VideoTourSection"
import { featuredPropertiesData } from "@/data/demoData"
import { useState, useEffect } from "react"

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setFeaturedProperties(featuredPropertiesData);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
        setFeaturedProperties(featuredPropertiesData);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProperties();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <StatisticsSection scrollY={scrollY} />
      <FeaturedPropertiesSection loading={loading} featuredProperties={featuredProperties} scrollY={scrollY} />
      <HowItWorksSection />
      <VideoTourSection scrollY={scrollY} />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}

export default HomePage