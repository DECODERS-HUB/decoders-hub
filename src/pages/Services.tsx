
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AIChat from "@/components/ui/AIChat";
import { Briefcase, ChartBar, Lightbulb, Handshake, Users, Wrench, Gavel, Rocket, GraduationCap, Check } from "lucide-react";

const Services = () => {
  useEffect(() => {
    document.title = "Business Consultancy Services - DECODERS HUB";
  }, []);

  const services = [
    {
      id: "business-strategy",
      title: "Business Strategy & Planning",
      description: "Comprehensive strategic planning services to design sustainable business models and drive long-term growth through data-driven insights and market analysis.",
      icon: <Briefcase className="h-16 w-16 text-accent1-400" />,
      features: [
        "Business Model Design",
        "Business Plan Development", 
        "Market Research & Analysis",
        "Growth & Expansion Strategy"
      ],
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "financial-advisory",
      title: "Financial Advisory",
      description: "Expert financial guidance to optimize costs, improve profitability, and secure funding for sustainable business growth and expansion.",
      icon: <ChartBar className="h-16 w-16 text-accent1-400" />,
      features: [
        "Financial Planning & Budgeting",
        "Investment Readiness & Fundraising Support",
        "Cost Optimization",
        "Profitability Improvement"
      ],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "branding-marketing",
      title: "Branding & Marketing",
      description: "Strategic brand development and comprehensive marketing solutions to enhance your market presence and drive customer acquisition.",
      icon: <Lightbulb className="h-16 w-16 text-accent1-400" />,
      features: [
        "Brand Identity Development",
        "Marketing Strategy & Execution",
        "Digital Marketing Guidance",
        "Customer Acquisition Strategy"
      ],
      imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "operations-optimization",
      title: "Operations & Process Optimization",
      description: "Streamline operations and automate workflows to maximize organizational efficiency and reduce operational costs.",
      icon: <Wrench className="h-16 w-16 text-accent1-400" />,
      features: [
        "Business Process Improvement",
        "Workflow Automation",
        "Standard Operating Procedures (SOPs)",
        "Organizational Efficiency"
      ],
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "leadership-development",
      title: "Leadership & Team Development",
      description: "Build strong leadership capabilities and foster high-performing team cultures that drive organizational success.",
      icon: <Users className="h-16 w-16 text-accent1-400" />,
      features: [
        "Leadership Coaching",
        "Team Building & Culture Development",
        "Talent Management Support",
        "HR Policy Guidance"
      ],
      imageUrl: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "digital-transformation",
      title: "Technology & Digital Transformation",
      description: "Navigate digital transformation with strategic technology integration and automation solutions for modern business challenges.",
      icon: <Handshake className="h-16 w-16 text-accent1-400" />,
      features: [
        "Digitalization Consulting",
        "Technology Integration",
        "Automation Solutions", 
        "IT Systems Optimization"
      ],
      imageUrl: "https://images.unsplash.com/photo-1573495612937-f01934eeaaa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "legal-compliance",
      title: "Legal & Compliance Advisory",
      description: "Ensure regulatory compliance and proper business structuring with expert legal guidance and policy development.",
      icon: <Gavel className="h-16 w-16 text-accent1-400" />,
      features: [
        "Business Registration & Structuring",
        "Regulatory Compliance Guidance",
        "Contract & Policy Advisory",
        "Intellectual Property Support"
      ],
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "startup-support",
      title: "Startup & Innovation Support",
      description: "Comprehensive support for startups from ideation to market launch and scaling, including mentorship and incubation services.",
      icon: <Rocket className="h-16 w-16 text-accent1-400" />,
      features: [
        "Startup Mentorship & Incubation",
        "Product Development Advisory",
        "MVP Design & Testing",
        "Pitch Deck Preparation"
      ],
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "training-development",
      title: "Training & Capacity Building",
      description: "Develop your team's capabilities through targeted training programs, workshops, and skill development initiatives.",
      icon: <GraduationCap className="h-16 w-16 text-accent1-400" />,
      features: [
        "Entrepreneurship Training",
        "Corporate Workshops",
        "Skill Development Programs",
        "Business Masterclasses"
      ],
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 text-brand-800">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Consultancy Services</h1>
              <p className="text-xl text-gray-700 mb-8">
                Comprehensive business solutions to transform your organization and drive sustainable growth through strategic planning, operational excellence, and innovation.
              </p>
              <Button asChild size="lg" className="bg-accent1-400 hover:bg-accent1-500">
                <Link to="/appointment">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="container-custom">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div key={service.id} id={service.id} className="scroll-mt-24">
                  <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="mb-6">{service.icon}</div>
                      <h2 className="text-3xl font-bold mb-4 text-brand-800">{service.title}</h2>
                      <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="space-y-4 mb-8">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <div className="mr-3 text-accent1-400">
                              <Check className="h-5 w-5" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                        <Link to="/appointment">Get {service.title}</Link>
                      </Button>
                    </div>
                    
                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="rounded-lg overflow-hidden shadow-xl">
                        <img 
                          src={service.imageUrl} 
                          alt={service.title} 
                          className="w-full h-[350px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {index < services.length - 1 && (
                    <div className="my-16 border-b border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-brand-800 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl mb-8">
                Schedule a consultation with our expert team to discuss your specific needs and discover how our business consultancy services can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-accent1-400 hover:bg-accent1-500">
                  <Link to="/appointment">Book a Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-brand-600 text-brand-600 hover:bg-brand-50">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Services;
