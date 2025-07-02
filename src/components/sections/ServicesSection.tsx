import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Briefcase, ChartBar, Lightbulb, Handshake, Users, Wrench, Gavel, Rocket, GraduationCap
} from "lucide-react";

const services = [
  {
    title: "Business Strategy & Planning",
    description: "Comprehensive strategic planning to design your business model and drive sustainable growth.",
    icon: <Briefcase className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Financial Advisory",
    description: "Expert financial guidance to optimize costs, improve profitability, and secure funding.",
    icon: <ChartBar className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Branding & Marketing",
    description: "Strategic brand development and marketing solutions to enhance your market presence.",
    icon: <Lightbulb className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Operations & Process Optimization",
    description: "Streamline operations and automate workflows to maximize organizational efficiency.",
    icon: <Wrench className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Leadership & Team Development",
    description: "Build strong leadership capabilities and foster high-performing team cultures.",
    icon: <Users className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Technology & Digital Transformation",
    description: "Navigate digital transformation with strategic technology integration and automation.",
    icon: <Handshake className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Legal & Compliance Advisory",
    description: "Ensure regulatory compliance and proper business structuring with expert legal guidance.",
    icon: <Gavel className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Startup & Innovation Support",
    description: "Comprehensive support for startups from ideation to market launch and scaling.",
    icon: <Rocket className="h-12 w-12 text-accent1-400" />,
  },
  {
    title: "Training & Capacity Building",
    description: "Develop your team's capabilities through targeted training and skill development programs.",
    icon: <GraduationCap className="h-12 w-12 text-accent1-400" />,
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
          <h2 className="section-title">Our Business Consultancy Services</h2>
          <p className="section-subtitle mx-auto">
            We provide comprehensive business consultancy solutions tailored to help
            your organization achieve sustainable growth and operational excellence.
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
