// components/header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import StrapiMedia from "@/components/strapi-image";

// Define the Site Settings type
interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  logo?: {
    data: any;
  };
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  defaultSeo: any;
}

// Site settings are passed as props from the parent layout
export function Header({ siteSettings }: { siteSettings: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/fleet", label: "Fleet" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-black/90 backdrop-blur-sm py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          {siteSettings?.logo?.data ? (
            <div className="h-10 w-40 relative">
              <StrapiMedia
                data={siteSettings.logo.data}
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <h1 className="text-2xl font-playfair font-bold">
              <span className="gold-gradient">{siteSettings?.companyName || "Empire Link"}</span> Limo
            </h1>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
            <Link href="/booking">Book Now</Link>
          </Button>
          <Button asChild className="bg-gold hover:bg-gold-light text-black">
            <a href={`tel:${siteSettings?.phone}`} className="flex items-center gap-2">
              <Phone size={16} />
              <span className="hidden lg:inline">Call Us</span>
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
        // components/header.tsx (continued)
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-sm"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-gold py-2 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10 w-full">
                  <Link href="/booking" onClick={() => setIsOpen(false)}>
                    Book Now
                  </Link>
                </Button>
                <Button asChild className="bg-gold hover:bg-gold-light text-black w-full">
                  <a href={`tel:${siteSettings?.phone}`} className="flex items-center justify-center gap-2">
                    <Phone size={16} />
                    <span>Call Us</span>
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}