import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPreviewSection = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
            About Decoders HQ
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Decoders HQ is a strategic innovation firm helping businesses scale through tailored strategy, 
              ecosystem-building, and hands-on execution. We've worked with founders, tech hubs, and institutions 
              to deliver sustainable, tech-enabled growth solutions.
            </p>
            
            <p>
              Our team combines deep technical expertise with strategic business acumen to decode complex challenges 
              and transform them into opportunities for breakthrough innovation and measurable growth.
            </p>
          </div>

          <div className="mt-10">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
              <Link to="/services">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;