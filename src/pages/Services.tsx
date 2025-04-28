
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AIChat from "@/components/ui/AIChat";
import { BookOpen, Code, Laptop, PenTool, Users, Check } from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "tech-training",
      title: "Tech Training",
      description: "Comprehensive technical training programs designed to enhance your team's skills and knowledge in various technology domains.",
      icon: <BookOpen className="h-16 w-16 text-accent1-400" />,
      features: [
        "Customized curriculum development",
        "Hands-on workshop sessions",
        "Expert-led instruction",
        "Progress tracking and assessment",
        "Certification preparation",
        "Continuous learning resources"
      ],
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "branding",
      title: "Branding",
      description: "Strategic branding solutions that help establish a powerful market presence and connect with your target audience effectively.",
      icon: <PenTool className="h-16 w-16 text-accent1-400" />,
      features: [
        "Brand identity development",
        "Visual design systems",
        "Brand messaging and voice",
        "Brand strategy consulting",
        "Market positioning analysis",
        "Brand experience design"
      ],
      imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "it-mentorship",
      title: "IT Mentorship",
      description: "Personalized mentoring programs to guide professionals and organizations through technological growth and development.",
      icon: <Users className="h-16 w-16 text-accent1-400" />,
      features: [
        "One-on-one coaching sessions",
        "Career development planning",
        "Technical skills assessment",
        "Leadership development for IT roles",
        "Industry networking opportunities",
        "Ongoing professional guidance"
      ],
      imageUrl: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "software-development",
      title: "Software Development",
      description: "Custom software and application development services to address your specific business challenges and requirements.",
      icon: <Code className="h-16 w-16 text-accent1-400" />,
      features: [
        "Custom application development",
        "Mobile app development",
        "Web application development",
        "Software integration services",
        "Quality assurance and testing",
        "Maintenance and support"
      ],
      imageUrl: "https://images.unsplash.com/photo-1573495612937-f01934eeaaa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "business-consultancy",
      title: "Business Consultancy",
      description: "Expert consultation to optimize operations, increase efficiency, and drive sustainable growth for your organization.",
      icon: <Laptop className="h-16 w-16 text-accent1-400" />,
      features: [
        "Business process optimization",
        "Strategic planning and execution",
        "Technology integration consulting",
        "Performance improvement strategies",
        "Change management support",
        "Digital transformation guidance"
      ],
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-gray-700 mb-8">
                Comprehensive technology solutions to transform your business and drive innovation
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
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                        <Link to="/appointment">Request {service.title}</Link>
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
                Schedule a consultation with our expert team to discuss your specific needs and discover how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-accent1-400 hover:bg-accent1-500">
                  <Link to="/appointment">Book an Appointment</Link>
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
