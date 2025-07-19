import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AIChat from "@/components/ui/AIChat";
import { Check, ArrowRight } from "lucide-react";

const Services = () => {
  useEffect(() => {
    document.title = "Business Consultancy Services - DECODERS HUB";
  }, []);

  const [selectedService, setSelectedService] = useState(0);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
            OUR SERVICES
          </h1>
          <p className="text-xl text-blue-400 max-w-3xl mx-auto">
            Comprehensive business consulting solutions tailored to drive your success
          </p>
        </div>
      </section>

      {/* Services Interface */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[700px]">
              
              {/* Services List */}
              <div className="bg-gray-50 p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Choose Your Service
                </h2>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(index)}
                      className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                        selectedService === index
                          ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                          : 'bg-white text-gray-800 hover:bg-gray-100 hover:shadow-md'
                      }`}
                    >
                      <h3 className="text-lg font-semibold">
                        {service.title}
                      </h3>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-slate-800 p-8 lg:p-12 text-white flex flex-col justify-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-blue-400 mb-4">
                      {services[selectedService].title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {services[selectedService].description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-blue-300 mb-6">
                      What's Included:
                    </h4>
                    <div className="space-y-4">
                      {services[selectedService].features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-6 w-6 text-green-400 mr-4 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-200 text-lg">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button 
                      asChild 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl group"
                    >
                      <Link to="/appointment" className="flex items-center">
                        GET STARTED
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our expert team to discuss your specific needs and discover how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8">
              <Link to="/appointment">Book Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-blue-600 hover:bg-white hover:text-blue-600 font-semibold px-8">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </div>
  );
};

export default Services;
