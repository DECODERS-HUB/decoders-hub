
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-background min-h-screen flex items-center pt-16">
      <div className="container-custom relative z-10 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 text-foreground">
              We transform <span className="font-medium">businesses</span> through strategic innovation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
              Comprehensive business consultancy services designed to drive sustainable growth and operational excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700 text-white font-normal rounded-full px-8">
                <Link to="/appointment">Start a Project</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-brand-800 hover:bg-brand-50 font-normal">
                <Link to="/services">View Our Work</Link>
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-brand-200">
              <div className="text-center">
                <div className="text-2xl font-light text-brand-800 mb-1">150+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-brand-800 mb-1">8</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-brand-800 mb-1">25+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Clients</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5]">
              <div className="absolute inset-0 bg-brand-100 rounded-2xl"></div>
              <div className="relative z-10 p-8 h-full flex items-end">
                <div className="w-full h-64 bg-gradient-to-br from-brand-600 to-accent1-400 rounded-xl opacity-90"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
