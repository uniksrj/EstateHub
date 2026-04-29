"use client"

import CTASection from "@/components/common/home/CTASection"
import FeaturedPropertiesSection from "@/components/common/home/FeaturedPropertiesSection"
import FeaturesSection from "@/components/common/home/FeaturesSection"
import HeroSection from "@/components/common/home/HeroSection"
import HowItWorksSection from "@/components/common/home/HowItWorksSection"
import StatisticsSection from "@/components/common/home/StatisticsSection"
import VideoTourSection from "@/components/common/home/VideoTourSection"
import { featuredPropertiesData } from "@/data/demoData"
import { propertiesAPI } from "@/services/api"
import { useState, useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(price || 0))

const toImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg"
  if (/^https?:\/\//i.test(imagePath)) return imagePath
  if (imagePath.startsWith("/storage/")) return `${API_URL}${imagePath}`
  if (imagePath.startsWith("/")) return imagePath
  return `${API_URL}/storage/${imagePath}`
}

const mapPropertyToFeaturedCard = (property) => {
  const firstImage = Array.isArray(property?.images) ? property.images[0] : null
  const imagePath = typeof firstImage === "string" ? firstImage : firstImage?.image_path

  return {
    id: property?.id,
    title: property?.title || "Property",
    location: [property?.city, property?.state].filter(Boolean).join(", ") || "Location not available",
    beds: property?.bedrooms ?? 0,
    baths: property?.bathrooms ?? 0,
    sqft: property?.sq_ft ?? 0,
    price: formatPrice(property?.price),
    image: toImageUrl(imagePath),
    featured: Boolean(property?.featured),
  }
}

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await propertiesAPI.getAll({ featured: true, per_page: 6 })
        const properties = Array.isArray(response?.data?.data) ? response.data.data : []
        const featuredOnly = properties.filter((property) => property?.featured)
        const selectedProperties = (featuredOnly.length > 0 ? featuredOnly : properties).slice(0, 6)
        setFeaturedProperties(
          selectedProperties.length > 0
            ? selectedProperties.map(mapPropertyToFeaturedCard)
            : featuredPropertiesData
        )
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
