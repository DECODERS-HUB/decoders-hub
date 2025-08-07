
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSnapshotSection from "@/components/sections/ServicesSnapshotSection";
import AboutPreviewSection from "@/components/sections/AboutPreviewSection";
import ClientLogosSection from "@/components/sections/ClientLogosSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTABannerSection from "@/components/sections/CTABannerSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import AIChat from "@/components/ui/AIChat";

const Index = () => {
  useEffect(() => {
    document.title = "DECODERS HUB — Innovation. Strategy. Growth.";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      "DECODERS HUB empowers startups, businesses, and communities with high-impact tech and innovation solutions. Strategic consulting, ecosystem evaluation, and digital product development."
    );
  }, []);

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSnapshotSection />
        <AboutPreviewSection />
        <ClientLogosSection />
        <TestimonialsSection />
        <CTABannerSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
