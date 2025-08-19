import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, ChartBar, Lightbulb, Handshake, Users, Wrench, Gavel, Rocket, GraduationCap, Check } from "lucide-react";

const services = [
  {
    id: "digital-product-development",
    title: "Digital Product Development",
    description: "End-to-end digital product development from concept to market-ready solutions with cutting-edge technology implementation.",
    features: [
      "Product Strategy & Design",
      "Full-Stack Development", 
      "Mobile App Development",
      "MVP to Scale Solutions"
    ]
  },
  {
    id: "startup-mentorship",
    title: "Startup Mentorship & Tech Implementation",
    description: "Hands-on guidance for startups with practical technology implementation strategies and mentorship for sustainable growth.",
    features: [
      "Startup Strategy & Planning",
      "Technology Stack Selection",
      "Technical Implementation Support",
      "Growth & Scaling Guidance"
    ]
  },
  {
    id: "innovation-ecosystem",
    title: "Innovation & Ecosystem Evaluation",
    description: "Comprehensive analysis of innovation landscapes and ecosystem development opportunities to drive collaborative growth.",
    features: [
      "Innovation Landscape Analysis",
      "Ecosystem Mapping & Development",
      "Partnership Strategy",
      "Innovation Program Design"
    ]
  },
  {
    id: "business-strategy",
    title: "Business Strategy Consulting",
    description: "Strategic planning and execution guidance to drive sustainable growth and competitive advantage in dynamic markets.",
    features: [
      "Business Model Design",
      "Market Analysis & Strategy",
      "Growth & Expansion Planning",
      "Competitive Positioning"
    ]
  }
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(services[0]);

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
  };

  return (
    <section className="py-32 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-16 text-center">
          OUR CONSULTING SERVICES
        </h2>

        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Services List */}
          <div className="bg-gray-100 p-8 lg:p-12">
            <div className="space-y-4">
              {services.map((service) => (
                <div 
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  onMouseEnter={() => handleServiceClick(service)}
                  className={`p-6 rounded-lg shadow-sm border cursor-pointer transition-all duration-300 ${
                    selectedService.id === service.id 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                      : 'bg-white text-gray-800 border-gray-200 hover:shadow-md hover:border-blue-300'
                  }`}
                >
                  <h3 className="text-lg font-medium">
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-slate-700 p-8 lg:p-12 text-white flex flex-col justify-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-300">
                {selectedService.title}
              </h3>
              
              <p className="text-lg leading-relaxed opacity-90">
                {selectedService.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-blue-200">What's Included:</h4>
                <div className="space-y-2">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

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
