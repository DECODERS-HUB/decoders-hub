
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, Mail, MessageCircle } from "lucide-react";

const AppointmentSection = () => {
  return (
    <section className="section-padding relative bg-gradient-to-br from-gray-50 via-white to-gray-50 text-brand-800 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-accent1-400/20 rounded-full filter blur-[128px]"></div>
        <div className="absolute left-0 bottom-1/2 w-96 h-96 bg-brand-200/20 rounded-full filter blur-[128px]"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Schedule a Business Consultation with Our Experts</h2>
            <p className="text-lg text-gray-600 mb-8">
              Take the first step toward transforming your business with our expert consultancy services.
              Book a consultation to discuss your needs and discover tailored business solutions.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-brand-100/80 p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-accent1-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Flexible Scheduling</h3>
                  <p className="text-gray-600">Choose a date and time that works best for your schedule</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100/80 p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-accent1-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Instant Confirmation</h3>
                  <p className="text-gray-600">Receive immediate confirmation with calendar integration</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100/80 p-3 rounded-lg mr-4">
                  <MessageCircle className="h-6 w-6 text-accent1-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Personalized Consultation</h3>
                  <p className="text-gray-600">One-on-one attention with our experienced business consultants</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100/80 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-accent1-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Follow-up Report</h3>
                  <p className="text-gray-600">Detailed post-consultation summary and strategic recommendations</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-brand-800 mb-6">Book Your Business Consultation</h3>
              
              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Consultancy Service</label>
                  <select className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="business-strategy">Business Strategy & Planning</option>
                    <option value="financial-advisory">Financial Advisory</option>
                    <option value="branding-marketing">Branding & Marketing</option>
                    <option value="operations-optimization">Operations & Process Optimization</option>
                    <option value="leadership-development">Leadership & Team Development</option>
                    <option value="digital-transformation">Technology & Digital Transformation</option>
                    <option value="legal-compliance">Legal & Compliance Advisory</option>
                    <option value="startup-support">Startup & Innovation Support</option>
                    <option value="training-development">Training & Capacity Building</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                
                <Button asChild size="lg" className="w-full bg-accent1-400 hover:bg-accent1-500 text-white font-semibold">
                  <Link to="/appointment">View Available Time Slots</Link>
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  Or call us at <a href="tel:+1234567890" className="text-brand-600 font-medium">+1 (234) 567-890</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
