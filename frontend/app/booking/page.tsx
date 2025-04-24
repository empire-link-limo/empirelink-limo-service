// app/booking/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getBookingPage } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { BookingPageData } from "@/lib/types"

export default function BookingPage() {
  const [bookingPage, setBookingPage] = useState<BookingPageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const bookingPageData = await getBookingPage()
        setBookingPage(bookingPageData)
      } catch (error) {
        console.error("Error fetching booking page data:", error)
      }
    }
    
    fetchData()
  }, [])
  
  // Default values if data is still loading
  const pageData = bookingPage || {
    title: "Book Your Luxury Transportation",
    description: "Use our convenient booking system to reserve your premium transportation service",
    bookingIframeURL: "https://customer.moovs.app/luxury-limo/iframe",
    ContactInfo: {
      phone: "+1 (234) 567-8900",
      email: "bookings@luxurylimo.com"
    }
  }

  return (
    <div className="pt-20">
      {/* SEO */}
      {bookingPage?.SEO && (
        <Seo seo={{
          metaTitle: bookingPage.SEO.metaTitle || "Book Now | Empirelink Limo Service",
          metaDescription: bookingPage.SEO.metaDescription,
          shareImage: bookingPage.SEO.metaImage,
        }} />
      )}
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageData.title}</h1>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {pageData.description}
            </p>
          </motion.div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 md:p-8 relative min-h-[720px]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg z-10">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
              </div>
            )}
            <iframe
              src={pageData.bookingIframeURL || "https://customer.moovs.app/luxury-limo/iframe"}
              width="100%"
              height="720"
              className="border-0"
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Having trouble with the booking system?</p>
            <p className="text-gray-300">
              Contact us directly at{" "}
              <a href={`tel:${pageData.ContactInfo?.phone || "+1234567890"}`} className="text-gold hover:underline">
                {pageData.ContactInfo?.phone || "+1 (234) 567-8900"}
              </a>{" "}
              or{" "}
              <a href={`mailto:${pageData.ContactInfo?.email || "bookings@luxurylimo.com"}`} className="text-gold hover:underline">
                {pageData.ContactInfo?.email || "bookings@luxurylimo.com"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}