"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { HeaderClientProps } from "@/lib/types"

export function HeaderClient({ logoUrl, companyName, navLinks, phone }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-black/90 backdrop-blur-sm py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo with fixed width */}
        <Link href="/" className="flex items-center flex-shrink-0">
          {logoUrl ? (
            <div className="h-16 flex items-center w-48 flex-shrink-0">
              <Image 
                src={logoUrl} 
                alt={companyName || "Company Logo"} 
                width={200}
                height={80}
                priority
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ) : (
            <h1 className="text-2xl font-playfair font-bold flex-shrink-0">
              <span className="gold-gradient">{companyName}</span> Limo
            </h1>
          )}
        </Link>

        {/* Desktop Navigation with responsive spacing */}
        <nav className="hidden md:flex items-center lg:space-x-8 md:space-x-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-300 hover:text-gold transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
          <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
            <Link href="/booking">Book Now</Link>
          </Button>
          <Button asChild className="bg-gold hover:bg-gold-light text-black">
            <a href={`tel:${phone}`} className="flex items-center gap-2">
              <Phone size={16} />
              <span className="hidden lg:inline">Call Us</span>
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
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
                  <a href={`tel:${phone}`} className="flex items-center justify-center gap-2">
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
  )
}