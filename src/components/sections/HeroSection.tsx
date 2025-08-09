import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import businessStrategy from "@/assets/hero-business-strategy.jpg";
import digitalGrowth from "@/assets/hero-digital-growth.jpg";
import teamCollaboration from "@/assets/hero-team-collaboration.jpg";
import businessSuccess from "@/assets/hero-business-success.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted min-h-screen flex items-center pt-16">
      <div className="container-custom relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-foreground">
              TRANSFORMING IDEAS INTO MARKET-READY SOLUTIONS.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-body">
              From strategy to execution, we partner with you to build products, ecosystems, and innovations that drive real-world impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 py-3 text-lg font-medium">
                <Link to="/contact">Let's Collaborate</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg px-8 py-3 text-lg font-medium">
                <Link to="/services">Explore Our Work</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Top left - Business Strategy */}
              <div className="aspect-square bg-blue-100 rounded-3xl overflow-hidden">
                <img 
                  src={businessStrategy} 
                  alt="Business Strategy Meeting" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Top right - Digital Growth */}
              <div className="aspect-square bg-green-200 rounded-3xl overflow-hidden">
                <img 
                  src={digitalGrowth} 
                  alt="Digital Growth Analytics" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Bottom left - Team Collaboration */}
              <div className="aspect-square bg-green-100 rounded-3xl overflow-hidden">
                <img 
                  src={teamCollaboration} 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Bottom right - Business Success */}
              <div className="aspect-square bg-blue-600 rounded-3xl overflow-hidden">
                <img 
                  src={businessSuccess} 
                  alt="Business Success Analytics" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;