import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPreviewSection = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              ABOUT DECODERS HUB
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                DECODERS HUB is a strategic innovation firm helping businesses scale through tailored strategy, 
                ecosystem-building, and hands-on execution. We've worked with founders, tech hubs, and institutions 
                to deliver sustainable, tech-enabled growth solutions.
              </p>
              
              <p>
                Our team combines deep technical expertise with strategic business acumen to decode complex challenges 
                and transform them into opportunities for breakthrough innovation and measurable growth.
              </p>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
                <Link to="/services">Learn More About Us</Link>
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative animate-fade-in order-first lg:order-last">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="/lovable-uploads/a359d297-d887-4c2a-aac8-def65a010615.png"
                alt="DECODERS HUB modern office building with glass facade"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              {/* Gradient overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating accent elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;