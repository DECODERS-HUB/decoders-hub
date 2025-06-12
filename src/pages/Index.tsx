
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AppointmentSection from "@/components/sections/AppointmentSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import AIChat from "@/components/ui/AIChat";

const Index = () => {
  useEffect(() => {
    document.title = "DECODERS HUB - Your Partner for Business Growth";
  }, []);

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AppointmentSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Index;
