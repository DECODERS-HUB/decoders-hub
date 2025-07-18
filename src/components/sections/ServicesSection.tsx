import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Briefcase, ChartBar, Lightbulb, Handshake, Users, Wrench, Gavel, Rocket, GraduationCap
} from "lucide-react";

const services = [
  {
    title: "Brand Identity",
    description: "Creating distinctive visual identities that capture your brand's essence and connect with your audience.",
    icon: <Lightbulb className="h-8 w-8 text-foreground" />,
  },
  {
    title: "Web Design & Development",
    description: "Modern, responsive websites that deliver exceptional user experiences across all devices.",
    icon: <Briefcase className="h-8 w-8 text-foreground" />,
  },
  {
    title: "UI/UX Design",
    description: "Intuitive digital interfaces designed with user-centered principles and modern aesthetics.",
    icon: <Users className="h-8 w-8 text-foreground" />,
  },
  {
    title: "Digital Marketing",
    description: "Strategic digital campaigns that build awareness and drive meaningful engagement.",
    icon: <ChartBar className="h-8 w-8 text-foreground" />,
  },
  {
    title: "Motion Graphics",
    description: "Dynamic visual content that brings your brand to life through animation and storytelling.",
    icon: <Rocket className="h-8 w-8 text-foreground" />,
  },
  {
    title: "Creative Strategy",
    description: "Comprehensive creative direction that aligns with your business goals and market positioning.",
    icon: <Handshake className="h-8 w-8 text-foreground" />,
  },
];

const ServiceCard = ({ title, description, icon, index }: { 
  title: string; description: string; icon: React.ReactNode; index: number;
}) => {
  return (
    <div className="group p-8 transition-all duration-300 hover:bg-muted rounded-xl">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-medium mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
      <Button asChild variant="ghost" className="text-foreground hover:bg-transparent p-0 font-normal group-hover:translate-x-1 transition-transform">
        <Link to="/services">View details →</Link>
      </Button>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container-custom">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            What we create
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We partner with forward-thinking brands to create meaningful digital experiences 
            that resonate with audiences and drive business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 border border-border rounded-2xl overflow-hidden">
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

        <div className="mt-20 text-center">
          <Button asChild size="lg" className="bg-foreground hover:bg-foreground/90 text-background font-normal rounded-full px-8">
            <Link to="/services">View All Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
