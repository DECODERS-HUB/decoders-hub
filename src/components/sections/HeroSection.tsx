
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 text-white min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-accent1-400 rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-brand-500 rounded-full filter blur-[128px] opacity-20"></div>
      </div>
      
      <div className="container-custom relative z-10 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Technology-Driven <span className="text-accent1-400">Business Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Empowering businesses through innovative tech consulting, training, and development services
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent1-400 hover:bg-accent1-500 text-white font-medium">
                <Link to="/appointment">Book a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-accent1-400">10+</span>
                <span className="text-sm text-gray-300">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-accent1-400">200+</span>
                <span className="text-sm text-gray-300">Projects Completed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-accent1-400">50+</span>
                <span className="text-sm text-gray-300">Tech Experts</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-accent1-400 rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 p-1">
                <div className="bg-brand-950/50 rounded-xl overflow-hidden backdrop-blur-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                    alt="Business consulting team meeting"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
