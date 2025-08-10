import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted min-h-screen flex items-center pt-16">
      <div className="container-custom relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-foreground">
              Do better business, faster
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed font-body">
              Unlock the intelligence you need to engage with the right 
              business customers, accelerate onboarding – and keep them 
              for life.
            </p>
            
            <div className="flex gap-4">
              <Button 
                asChild
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
              >
                <Link to="/appointment">Request a personal demo</Link>
              </Button>
              <Button 
                variant="outline"
                asChild
                className="px-6 py-3"
              >
                <Link to="/services">Why us</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-[600px] overflow-hidden">
              {/* Background decorative circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Large circular background */}
                  <div className="w-96 h-96 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full"></div>
                  
                  {/* Professional woman image placeholder */}
                  <div className="absolute top-8 left-8 w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <div className="text-8xl">👩‍💼</div>
                  </div>
                  
                  {/* Floating UI elements */}
                  <div className="absolute -top-8 -right-8 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground">Find the right customer</span>
                        <p className="text-xs text-muted-foreground">BT generates £1.4m per month</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-20 -left-12 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground">Accelerate onboarding</span>
                        <p className="text-xs text-muted-foreground">Metro Bank delivers 94% faster onboarding</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-8 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground">Keep for life</span>
                        <p className="text-xs text-muted-foreground">LendLease monitors 1600 suppliers</p>
                      </div>
                    </div>
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