
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, Mail, MessageCircle } from "lucide-react";

const AppointmentSection = () => {
  return (
    <section className="section-padding relative bg-brand-800 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-accent1-400 rounded-full filter blur-[128px] opacity-10"></div>
        <div className="absolute left-0 bottom-1/2 w-96 h-96 bg-brand-500 rounded-full filter blur-[128px] opacity-10"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Schedule a Consultation with Our Experts</h2>
            <p className="text-lg text-gray-200 mb-8">
              Take the first step toward transforming your business with our technology expertise.
              Book a consultation to discuss your needs and discover tailored solutions.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-brand-700/50 p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-accent1-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Flexible Scheduling</h3>
                  <p className="text-gray-300">Choose a date and time that works best for your schedule</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-700/50 p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-accent1-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Instant Confirmation</h3>
                  <p className="text-gray-300">Receive immediate confirmation with calendar integration</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-700/50 p-3 rounded-lg mr-4">
                  <MessageCircle className="h-6 w-6 text-accent1-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Personalized Consultation</h3>
                  <p className="text-gray-300">One-on-one attention with our experienced consultants</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-700/50 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-accent1-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Follow-up Report</h3>
                  <p className="text-gray-300">Detailed post-consultation summary and recommendations</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-brand-800 mb-6">Book Your Appointment</h3>
              
              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
                  <select className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="tech-training">Tech Training</option>
                    <option value="branding">Branding</option>
                    <option value="it-mentorship">IT Mentorship</option>
                    <option value="software-development">Software Development</option>
                    <option value="business-consultancy">Business Consultancy</option>
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
