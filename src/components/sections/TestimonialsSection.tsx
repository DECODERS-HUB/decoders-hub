import React from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Decoders HQ transformed our innovation model—we achieved 30% faster product rollout and significantly improved our market positioning.",
      author: "Sarah Chen",
      role: "CEO, TechForward Solutions"
    },
    {
      quote: "Their strategic guidance helped us navigate complex market challenges and scale our operations effectively. Truly exceptional partnership.",
      author: "Michael Rodriguez",
      role: "Founder, InnovateNow"
    },
    {
      quote: "The team's deep technical expertise combined with business acumen delivered results beyond our expectations. Highly recommended.",
      author: "Dr. Emily Watson",
      role: "CTO, FutureScale Labs"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground">
            What our clients say about working with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-border pt-4">
                <cite className="not-italic">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </cite>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;