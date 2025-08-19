import React from "react";
import { Link } from "react-router-dom";
import { Lightbulb, Target, Users, Code } from "lucide-react";

const ServicesSnapshotSection = () => {
  const services = [
    {
      icon: Code,
      title: "Digital Product Development",
      description: "End-to-end digital product development from concept to market-ready solutions."
    },
    {
      icon: Users,
      title: "Startup Mentorship & Tech Implementation",
      description: "Hands-on guidance for startups with practical technology implementation strategies."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Ecosystem Evaluation",
      description: "Comprehensive analysis of innovation landscapes and ecosystem development opportunities."
    },
    {
      icon: Target,
      title: "Business Strategy Consulting",
      description: "Strategic planning and execution guidance to drive sustainable growth and competitive advantage."
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Our Core Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions designed to accelerate your business growth and innovation journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-lg transition-colors"
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSnapshotSection;