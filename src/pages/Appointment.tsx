import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import AIChat from "@/components/ui/AIChat";
import { supabase } from "@/integrations/supabase/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Service options - Updated to match services page
const services = [
  {
    id: "business-strategy",
    name: "Business Strategy & Planning",
    description: "Comprehensive strategic planning services to design sustainable business models and drive long-term growth through data-driven insights and market analysis.",
    features: [
      "Business Model Design",
      "Business Plan Development", 
      "Market Research & Analysis",
      "Growth & Expansion Strategy"
    ]
  },
  {
    id: "financial-advisory",
    name: "Financial Advisory",
    description: "Expert financial guidance to optimize costs, improve profitability, and secure funding for sustainable business growth and expansion.",
    features: [
      "Financial Planning & Budgeting",
      "Investment Readiness & Fundraising Support",
      "Cost Optimization",
      "Profitability Improvement"
    ]
  },
  {
    id: "branding-marketing",
    name: "Branding & Marketing",
    description: "Strategic brand development and comprehensive marketing solutions to enhance your market presence and drive customer acquisition.",
    features: [
      "Brand Identity Development",
      "Marketing Strategy & Execution",
      "Digital Marketing Guidance",
      "Customer Acquisition Strategy"
    ]
  },
  {
    id: "operations-optimization",
    name: "Operations & Process Optimization",
    description: "Streamline operations and automate workflows to maximize organizational efficiency and reduce operational costs.",
    features: [
      "Business Process Improvement",
      "Workflow Automation",
      "Standard Operating Procedures (SOPs)",
      "Organizational Efficiency"
    ]
  },
  {
    id: "leadership-development",
    name: "Leadership & Team Development",
    description: "Build strong leadership capabilities and foster high-performing team cultures that drive organizational success.",
    features: [
      "Leadership Coaching",
      "Team Building & Culture Development",
      "Talent Management Support",
      "HR Policy Guidance"
    ]
  },
  {
    id: "digital-transformation",
    name: "Technology & Digital Transformation",
    description: "Navigate digital transformation with strategic technology integration and automation solutions for modern business challenges.",
    features: [
      "Digitalization Consulting",
      "Technology Integration",
      "Automation Solutions", 
      "IT Systems Optimization"
    ]
  }
];

const Appointment = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle service selection
  const handleServiceSelect = (index: number) => {
    setSelectedService(index);
  };
  
  // Handle moving to next step
  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && !date) {
      toast({
        title: "Please select a date",
        description: "You need to select a date for your appointment.",
        variant: "destructive",
      });
      return;
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  // Handle moving to previous step
  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!date) {
      toast({
        title: "Missing date",
        description: "Please select a date for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save appointment to Supabase
      const { error } = await supabase
        .from('appointments')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          notes: formData.notes || null,
          service_id: services[selectedService].id,
          service_name: services[selectedService].name,
          appointment_date: format(date, 'yyyy-MM-dd'),
          appointment_time: null // Remove time
        });
        
      if (error) {
        console.error("Error saving appointment:", error);
        toast({
          title: "Error",
          description: "There was an error booking your appointment. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // If successful, move to confirmation step
      setIsSubmitting(false);
      toast({
        title: "Appointment Confirmed!",
        description: `Your appointment for ${services[selectedService].name} on ${format(date, "PPP")} has been booked.`,
      });
      
      // Reset form
      setCurrentStep(4); // Move to confirmation step
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Book Appointment
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Schedule a consultation with our business experts to transform your organization
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {currentStep > 1 ? <Check className="h-5 w-5" /> : 1}
                </div>
                <div className={`ml-3 ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                  <p className="font-medium">Service</p>
                </div>
              </div>
              
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {currentStep > 2 ? <Check className="h-5 w-5" /> : 2}
                </div>
                <div className={`ml-3 ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                  <p className="font-medium">Date</p>
                </div>
              </div>
              
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {currentStep > 3 ? <Check className="h-5 w-5" /> : 3}
                </div>
                <div className={`ml-3 ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>
                  <p className="font-medium">Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            
            {/* Step 1: Service Selection with same layout as services page */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 min-h-[700px]">
                  
                  {/* Services List */}
                  <div className="bg-gray-50 p-8 lg:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                      Choose Your Service
                    </h2>
                    <div className="space-y-4">
                      {services.map((service, index) => (
                        <button
                          key={service.id}
                          onClick={() => handleServiceSelect(index)}
                          className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                            selectedService === index
                              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                              : 'bg-white text-gray-800 hover:bg-gray-100 hover:shadow-md'
                          }`}
                        >
                          <h3 className="text-lg font-semibold">
                            {service.name}
                          </h3>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="bg-slate-800 p-8 lg:p-12 text-white flex flex-col justify-center">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-3xl font-bold text-blue-400 mb-4">
                          {services[selectedService].name}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                          {services[selectedService].description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-blue-300 mb-6">
                          What's Included:
                        </h4>
                        <div className="space-y-4">
                          {services[selectedService].features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <Check className="h-6 w-6 text-green-400 mr-4 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-200 text-lg">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6">
                        <Button 
                          onClick={handleNextStep}
                          size="lg" 
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl group"
                        >
                          <span className="flex items-center">
                            CONTINUE TO DATE
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Date Selection */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
                <div className="p-8 lg:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Select Date</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-4">
                        Choose your preferred date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-14 text-lg"
                          >
                            <CalendarIcon className="mr-3 h-5 w-5" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 pointer-events-auto">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            className="p-3"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="flex justify-between pt-6">
                      <Button variant="outline" onClick={handlePreviousStep} size="lg" className="px-8">
                        Back
                      </Button>
                      <Button onClick={handleNextStep} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Personal Details Form */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
                <div className="p-8 lg:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Information</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Tell us about your specific needs or questions..."
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="flex justify-between pt-6">
                      <Button variant="outline" onClick={handlePreviousStep} size="lg" className="px-8">
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                        {isSubmitting ? "Booking..." : "Book Appointment"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto text-center">
                <div className="p-8 lg:p-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Your appointment for {services[selectedService].name} on {date && format(date, "PPP")} has been successfully booked.
                  </p>
                  <div className="space-y-4">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                      <a href="/">Return to Home</a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <AIChat />
    </div>
  );
};

export default Appointment;