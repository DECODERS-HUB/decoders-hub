
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AIChat from "@/components/ui/AIChat";
import { Mail, MapPin, Phone, Clock, MessageCircle, Users } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us - DECODERS HUB";
  }, []);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 text-brand-800">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-gray-700">
                We're here to help. Reach out with any questions or inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-6">
                  <Phone className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Our friendly team is here to help.</p>
                <a 
                  href="tel:+2348109220648" 
                  className="text-lg font-medium text-brand-600 hover:text-brand-700 transition-colors"
                >
                  +234(0)8109220648
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="mx-auto w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">We'll respond within 24 hours.</p>
                <a 
                  href="mailto:hub.decoders@gmail.com" 
                  className="text-lg font-medium text-brand-600 hover:text-brand-700 transition-colors"
                >
                  hub.decoders@gmail.com
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center md:col-span-2 lg:col-span-1">
                <div className="mx-auto w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">Come say hello at our office.</p>
                <address className="text-lg font-medium text-brand-600 not-italic">
                  Kwara State, Nigeria
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-brand-800">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have a question or want to learn more about our services? Fill out the form below and one of our consultants will get back to you shortly.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Select a service</option>
                      <option value="tech-training">Tech Training</option>
                      <option value="branding">Branding</option>
                      <option value="it-mentorship">IT Mentorship</option>
                      <option value="software-development">Software Development</option>
                      <option value="business-consultancy">Business Consultancy</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full bg-accent1-400 hover:bg-accent1-500" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
              
              <div className="space-y-8">
                <div className="h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
                  {/* Placeholder for a map - in a real implementation, you would use Google Maps or similar */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">Google Maps Integration</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-brand-800">Office Hours</h3>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-50 p-3 rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Monday - Friday</p>
                      <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-50 p-3 rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Saturday</p>
                      <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-50 p-3 rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Sunday</p>
                      <p className="text-gray-600">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Contact Options */}
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-brand-800 text-center">Other Ways to Connect</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-6">
                  <div className="bg-brand-100 p-3 rounded-lg mr-4">
                    <MessageCircle className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold">Live Chat Support</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Need immediate assistance? Chat with our support team in real-time for quick answers to your questions.
                </p>
                <Button className="bg-brand-600 hover:bg-brand-700 w-full">
                  Start Chat
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-6">
                  <div className="bg-brand-100 p-3 rounded-lg mr-4">
                    <Users className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold">Schedule a Meetup</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Prefer face-to-face discussions? Schedule an in-person or virtual meeting with our consulting team.
                </p>
                <Button asChild className="bg-brand-600 hover:bg-brand-700 w-full">
                  <Link to="/appointment">Book Appointment</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-xl font-bold mb-4">Follow Us on Social Media</h3>
              <div className="flex justify-center space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-600 hover:bg-brand-50 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-600 hover:bg-brand-50 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-600 hover:bg-brand-50 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-600 hover:bg-brand-50 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-600 hover:bg-brand-50 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                  </svg>
                </a>
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

export default Contact;
