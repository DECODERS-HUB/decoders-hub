
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, Code, Laptop, PenTool, Users
} from "lucide-react";

const services = [
  {
    title: "Tech Training",
    description: "Comprehensive technical training programs customized to enhance your team's skills and capabilities.",
    icon: <BookOpen className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Branding",
    description: "Strategic branding solutions that establish a powerful market presence and connect with your audience.",
    icon: <PenTool className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "IT Mentorship",
    description: "Personalized mentoring programs to guide professionals and organizations through technological growth.",
    icon: <Users className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Software Development",
    description: "Custom software and application development to address your specific business challenges.",
    icon: <Code className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Business Consultancy",
    description: "Expert consultation to optimize operations, increase efficiency, and drive sustainable growth.",
    icon: <Laptop className="h-12 w-12 text-accent1-400" />,
  },
];

const ServiceCard = ({ title, description, icon, index }: { 
  title: string; description: string; icon: React.ReactNode; index: number;
}) => {
  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border border-gray-100"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-brand-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button asChild variant="ghost" className="text-brand-600 hover:text-brand-700 p-0 hover:bg-transparent">
        <Link to="/services">Learn more →</Link>
      </Button>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle mx-auto">
            We provide comprehensive technology and business solutions tailored to meet
            your organization's specific needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-brand-700 hover:bg-brand-800">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
