"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"
import { cn } from "@/lib/utils"
import { GlobalData } from "@/lib/types"

export function FloatingActionButtons({ global }: { global?: GlobalData }) {
  const [isVisible, setIsVisible] = useState(false)
  const whatsappNumber = global?.whatsappNumber || "+1234567890"
  
  // Format WhatsApp number by removing non-numeric characters
  const formattedWhatsappNumber = whatsappNumber.replace(/\D/g, '')

  // Show scroll button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 90) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Custom easeOut scroll function
  const scrollToTop = () => {
    const duration = 1350; // ms
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const easeOutCubic = (t: number): number => {
      return (--t) * t * t + 1;
    };
    
    const scroll = () => {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, start * (1 - easeOutCubic(progress)));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };
    
    requestAnimationFrame(scroll);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-row gap-4 items-center">
      {/* WhatsApp Button - Always visible and centered with scroll button */}
      <a
        href={`https://wa.me/${formattedWhatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white rounded-full p-3 shadow-lg transform transition-all duration-300 hover:bg-green-600 hover:scale-110 flex items-center justify-center translate-y-[-12.5px]"
        aria-label="Contact via WhatsApp"
        style={{ transform: 'translateY(-12.5px)' }}
      >
        <FaWhatsapp size={25} />
      </a>
      
      {/* Scroll to Top Button - Visible only when scrolled */}
      <button
        className={cn(
          "bg-gold text-black rounded-full p-3 shadow-lg transform transition-all duration-300 hover:bg-gold-light hover:scale-110",
          isVisible ? "opacity-100 animate-subtle-bounce" : "opacity-0 pointer-events-none"
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={25} />
      </button>
    </div>
  )
}