import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  "Strategy Alignment & Architecture",
  "Enterprise Portfolio & Program Management", 
  "Experience Design",
  "Human Capital Management – Workforce Management",
  "Operational Excellence",
  "People & Change"
];

const ServicesSection = () => {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-16 text-center">
          Our Business Consulting Services
        </h2>

        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Services List */}
          <div className="bg-gray-100 p-8 lg:p-12">
            <div className="space-y-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-800">
                    {service}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Description Content */}
          <div className="bg-slate-700 p-8 lg:p-12 text-white flex flex-col justify-center">
            <div className="space-y-6">
              <p className="text-xl leading-relaxed">
                To guide your company toward its envisioned future, you need a road map.
              </p>
              
              <p className="text-lg leading-relaxed opacity-90">
                We'll help you understand your business and customer insights while developing a compelling vision, strategy and overall blueprint for driving competitive advantage.
              </p>

              <div className="pt-6">
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-slate-700 font-medium px-8"
                >
                  <Link to="/services">
                    LEARN MORE →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;