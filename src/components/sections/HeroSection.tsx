import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted min-h-screen flex items-center pt-16">
      <div className="container-custom relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in max-w-xl">
            {/* Tagline row */}
            <div className="text-sm text-muted-foreground font-medium tracking-wider">
              Small Businesses · Agencies · Founders
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-foreground">
              Empowering Bold Ideas to Thrive
            </h1>
            
            <h5 className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-body">
              We help startups, businesses, and innovators turn vision into reality with strategic execution, technology, and ecosystem support.
            </h5>
            
            {/* Animated counter */}
            <div className="flex items-center gap-8 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Businesses Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Ecosystems Built</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                asChild
                variant="default"
                className="rounded-xl px-8 py-4 text-base hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Link to="/appointment">Start Your Project</Link>
              </Button>
              <Button 
                variant="outline"
                asChild
                className="rounded-xl px-8 py-4 text-base hover:scale-105 transition-all duration-300"
              >
                <Link to="/services">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-[600px] overflow-hidden">
              {/* Abstract 3D innovation visual */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Main gradient background with network pattern */}
                  <div className="w-96 h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 rounded-full animate-pulse"></div>
                  
                  {/* Central innovation hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl">
                    {/* Abstract network nodes */}
                    <div className="relative w-32 h-32">
                      <div className="absolute top-0 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 animate-bounce"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/3 left-0 w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2"></div>
                      {/* Connecting lines */}
                      <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-white/40 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-white/40 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                    </div>
                  </div>
                  
                  {/* Floating service cards */}
                  <div className="absolute -top-8 -right-8 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg min-w-[220px] hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                        <div className="text-white text-lg">💡</div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground">Strategic Innovation</span>
                        <p className="text-xs text-muted-foreground">Transform ideas into market reality</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-20 -left-12 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg min-w-[220px] hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center">
                        <div className="text-white text-lg">🚀</div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground">Technology Excellence</span>
                        <p className="text-xs text-muted-foreground">Build scalable digital solutions</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-8 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg min-w-[220px] hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center">
                        <div className="text-white text-lg">🌱</div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-foreground">Ecosystem Growth</span>
                        <p className="text-xs text-muted-foreground">Connect and scale your network</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional floating elements for depth */}
                  <div className="absolute top-10 right-20 w-6 h-6 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-16 right-4 w-4 h-4 bg-secondary/40 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 right-32 w-3 h-3 bg-accent/50 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
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