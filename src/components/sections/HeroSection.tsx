import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-green-50 min-h-screen flex items-center pt-16">
      <div className="container-custom relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Business Consultants<br />
              <span className="text-blue-600">With a Growth Mindset</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              We partner with ambitious businesses to deliver strategic solutions that drive sustainable growth and operational excellence through innovative consulting approaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8">
                <Link to="/appointment">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-8">
                <Link to="/services">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Top left - light blue */}
              <div className="aspect-square bg-blue-100 rounded-3xl"></div>
              {/* Top right - light green */}
              <div className="aspect-square bg-green-200 rounded-3xl"></div>
              {/* Bottom left - light green */}
              <div className="aspect-square bg-green-100 rounded-3xl"></div>
              {/* Bottom right - blue */}
              <div className="aspect-square bg-blue-600 rounded-3xl"></div>
            </div>
          </div>
        </div>
        
        {/* Feature cards */}
        <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Transform Your Business</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Strategic planning and innovative solutions designed to drive sustainable growth and operational excellence for your organization.
            </p>
            <Button asChild variant="link" className="text-blue-600 p-0 h-auto mt-3 font-medium">
              <Link to="/services">Read More</Link>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Comprehensive consultancy services from experienced professionals who understand the challenges of modern business growth.
            </p>
            <Button asChild variant="link" className="text-blue-600 p-0 h-auto mt-3 font-medium">
              <Link to="/services">Read More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;