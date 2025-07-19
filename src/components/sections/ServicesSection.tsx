import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, ChartBar, Lightbulb, Handshake, Users, Wrench, Gavel, Rocket, GraduationCap, Check } from "lucide-react";

const services = [
  {
    id: "business-strategy",
    title: "Business Strategy & Planning",
    description: "Comprehensive strategic planning services to design sustainable business models and drive long-term growth through data-driven insights and market analysis.",
    features: [
      "Business Model Design",
      "Business Plan Development", 
      "Market Research & Analysis",
      "Growth & Expansion Strategy"
    ]
  },
  {
    id: "financial-advisory",
    title: "Financial Advisory",
    description: "Expert financial guidance to optimize costs, improve profitability, and secure funding for sustainable business growth and expansion.",
    features: [
      "Financial Planning & Budgeting",
      "Investment Readiness & Fundraising Support",
      "Cost Optimization",
      "Profitability Improvement"
    ]
  },
  {
    id: "branding-marketing",
    title: "Branding & Marketing",
    description: "Strategic brand development and comprehensive marketing solutions to enhance your market presence and drive customer acquisition.",
    features: [
      "Brand Identity Development",
      "Marketing Strategy & Execution",
      "Digital Marketing Guidance",
      "Customer Acquisition Strategy"
    ]
  },
  {
    id: "operations-optimization",
    title: "Operations & Process Optimization",
    description: "Streamline operations and automate workflows to maximize organizational efficiency and reduce operational costs.",
    features: [
      "Business Process Improvement",
      "Workflow Automation",
      "Standard Operating Procedures (SOPs)",
      "Organizational Efficiency"
    ]
  },
  {
    id: "leadership-development",
    title: "Leadership & Team Development",
    description: "Build strong leadership capabilities and foster high-performing team cultures that drive organizational success.",
    features: [
      "Leadership Coaching",
      "Team Building & Culture Development",
      "Talent Management Support",
      "HR Policy Guidance"
    ]
  },
  {
    id: "digital-transformation",
    title: "Technology & Digital Transformation",
    description: "Navigate digital transformation with strategic technology integration and automation solutions for modern business challenges.",
    features: [
      "Digitalization Consulting",
      "Technology Integration",
      "Automation Solutions", 
      "IT Systems Optimization"
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
          Our Business Consulting Services
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