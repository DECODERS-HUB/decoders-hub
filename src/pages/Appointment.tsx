
import React, { useState } from "react";
import { format, addDays, startOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
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
import { CalendarIcon, CalendarPlus, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Available time slots
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

// Service options
const services = [
  {
    id: "tech-training",
    name: "Tech Training",
    description: "Customized technical training for your team",
    duration: "60 min",
  },
  {
    id: "branding",
    name: "Branding",
    description: "Strategic branding and design solutions",
    duration: "45 min",
  },
  {
    id: "it-mentorship",
    name: "IT Mentorship",
    description: "Personalized guidance from industry experts",
    duration: "60 min",
  },
  {
    id: "software-development",
    name: "Software Development",
    description: "Custom software solutions for your business",
    duration: "45 min",
  },
  {
    id: "business-consultancy",
    name: "Business Consultancy",
    description: "Expert business advice and strategy",
    duration: "60 min",
  },
];

const Appointment = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState(services[0]);
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
    setSelectedTime(null); // Reset time when date changes
  };
  
  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle service selection
  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service);
  };
  
  // Handle moving to next step
  const handleNextStep = () => {
    if (currentStep === 1 && !selectedService) {
      toast({
        title: "Please select a service",
        description: "You need to select a service to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2 && (!date || !selectedTime)) {
      toast({
        title: "Please select a date and time",
        description: "You need to select both date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep((prev) => prev + 1);
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
          service_id: selectedService.id,
          service_name: selectedService.name,
          appointment_date: format(date, 'yyyy-MM-dd'),
          appointment_time: selectedTime
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
        description: `Your appointment for ${selectedService.name} on ${format(date, "PPP")} at ${selectedTime} has been booked.`,
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
  
  // Get days of the current week
  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(date || new Date()),
    end: addDays(startOfWeek(date || new Date()), 6),
  });
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 text-brand-800">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Book an Appointment</h1>
              <p className="text-xl text-gray-700">
                Schedule a consultation with our experts to discuss your technology and business needs.
              </p>
            </div>
          </div>
        </section>

        {/* Appointment Booking Section */}
        <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-accent1-400 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {currentStep > 1 ? <Check className="h-5 w-5" /> : 1}
                    </div>
                    <div className={`ml-3 ${currentStep >= 1 ? 'text-brand-800' : 'text-gray-500'}`}>
                      <p className="font-medium">Service</p>
                    </div>
                  </div>
                  
                  <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-accent1-400' : 'bg-gray-200'}`}></div>
                  
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-accent1-400 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {currentStep > 2 ? <Check className="h-5 w-5" /> : 2}
                    </div>
                    <div className={`ml-3 ${currentStep >= 2 ? 'text-brand-800' : 'text-gray-500'}`}>
                      <p className="font-medium">Date & Time</p>
                    </div>
                  </div>
                  
                  <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-accent1-400' : 'bg-gray-200'}`}></div>
                  
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-accent1-400 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {currentStep > 3 ? <Check className="h-5 w-5" /> : 3}
                    </div>
                    <div className={`ml-3 ${currentStep >= 3 ? 'text-brand-800' : 'text-gray-500'}`}>
                      <p className="font-medium">Details</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="bg-white rounded-xl shadow-md p-8">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-brand-800">Select a Service</h2>
                    <div className="space-y-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceSelect(service)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedService.id === service.id
                              ? "border-accent1-400 bg-accent1-400/10"
                              : "border-gray-200 hover:border-accent1-300"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-lg">{service.name}</h3>
                              <p className="text-gray-600">{service.description}</p>
                            </div>
                            <div>
                              <span className="text-gray-500 text-sm">{service.duration}</span>
                              {selectedService.id === service.id && (
                                <div className="mt-1 w-6 h-6 bg-accent1-400 rounded-full flex items-center justify-center">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <Button onClick={handleNextStep} className="bg-brand-600 hover:bg-brand-700">
                        Continue to Date & Time
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Date & Time Selection */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-brand-800">Select Date & Time</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-medium mb-3">Select Date</h3>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
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
                      
                      <div>
                        <h3 className="font-medium mb-3">Select Time</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              className={`py-2 px-4 border rounded-lg text-center ${
                                selectedTime === time
                                  ? "bg-brand-600 text-white border-brand-600"
                                  : "border-gray-200 hover:border-brand-300"
                              }`}
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        Back
                      </Button>
                      <Button onClick={handleNextStep} className="bg-brand-600 hover:bg-brand-700">
                        Continue to Details
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Personal Details Form */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-brand-800">Your Information</h2>
                    
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
                            className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                            className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                            className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                            className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                          className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          placeholder="Please share any specific topics or questions you'd like to discuss during your appointment."
                        ></textarea>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-medium mb-2">Appointment Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <CalendarPlus className="h-4 w-4 text-brand-600 mr-2" />
                            <span>Service: {selectedService.name}</span>
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 text-brand-600 mr-2" />
                            <span>Date: {date ? format(date, "PPP") : "Not selected"}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-brand-600 mr-2" />
                            <span>Time: {selectedTime || "Not selected"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <Button type="button" variant="outline" onClick={handlePreviousStep}>
                          Back
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-accent1-400 hover:bg-accent1-500"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Booking..." : "Confirm Booking"}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="text-center py-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-brand-800">Appointment Confirmed!</h2>
                    <p className="text-gray-600 mb-8">
                      Your appointment has been scheduled successfully. A confirmation email has been sent to {formData.email} with all the details.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-sm mx-auto mb-8">
                      <div className="text-left space-y-3">
                        <div>
                          <span className="text-gray-500 text-sm">Service</span>
                          <p className="font-medium">{selectedService.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Date</span>
                          <p className="font-medium">{date ? format(date, "PPP") : "Not selected"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Time</span>
                          <p className="font-medium">{selectedTime}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Duration</span>
                          <p className="font-medium">{selectedService.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Button asChild className="w-full bg-brand-600 hover:bg-brand-700">
                        <a href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${date ? format(date, "yyyyMMdd") : ""}T${selectedTime ? selectedTime.replace(/\s/g, "").replace(/AM|PM/g, "") : ""}00
DTEND:${date ? format(date, "yyyyMMdd") : ""}T${selectedTime ? selectedTime.replace(/\s/g, "").replace(/AM|PM/g, "") : ""}00
SUMMARY:${selectedService.name} with DecodersHub
DESCRIPTION:Your appointment with DecodersHub for ${selectedService.name}
LOCATION:123 Business Avenue, Tech City
END:VEVENT
END:VCALENDAR`} download="appointment.ics">
                          Add to Calendar
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/">Return to Homepage</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default Appointment;
