import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
  };

  return (
    <section className="relative bg-gradient-to-br from-background to-muted min-h-screen flex items-center pt-16">
      <div className="container-custom relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in max-w-xl">
            <div className="flex gap-4 text-sm text-muted-foreground mb-6">
              <span>Small businesses</span>
              <span>Agencies</span>
              <span>Freelancers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-foreground">
              Growing your business with confidence
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed font-body">
              DECODERS HUB is the only tool you need to run your business. 
              Manage your clients, deliver great work, get paid, and 
              track your finances.
            </p>
            
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button 
                type="submit" 
                variant="gradient" 
                className="px-6 whitespace-nowrap"
              >
                Start free
              </Button>
            </form>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-[600px] overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Background decorative shapes */}
                  <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-primary/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
                  
                  {/* Main illustration area */}
                  <div className="relative w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center">
                    <div className="text-6xl">🚀</div>
                  </div>
                  
                  {/* Floating UI elements */}
                  <div className="absolute -top-4 -right-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">New lead</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Invoice form completed</p>
                  </div>
                  
                  <div className="absolute -bottom-8 -left-8 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">$4,500</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Invoice paid</p>
                  </div>
                  
                  <div className="absolute top-16 -left-16 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium">$500</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Expense deducted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;