
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <nav className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="font-heading text-xl md:text-2xl font-bold text-brand-700">
            DECODERS<span className="text-accent1-400">HUB</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                  location.pathname === item.path
                    ? "text-brand-600"
                    : "text-brand-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Button asChild className="bg-accent1-400 hover:bg-accent1-500 text-white font-medium">
            <Link to="/appointment">Book Appointment</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-brand-800" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-white z-40 animate-fade-in">
          <div className="flex flex-col p-6 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-lg font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-brand-600"
                    : "text-brand-900"
                }`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="bg-accent1-400 hover:bg-accent1-500 text-white w-full mt-4">
              <Link to="/appointment" onClick={toggleMenu}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
