"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface ClientBookingContentProps {
  bookingIframeURL?: string;
  phone?: string;
  email?: string;
}

export function ClientBookingContent({
  bookingIframeURL = "https://customer.moovs.app/luxury-limo/iframe",
  phone = "+1 (234) 567-8900",
  email = "bookings@luxurylimo.com"
}: ClientBookingContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 rounded-lg border border-gray-800 p-6 md:p-8 relative min-h-[720px]"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
          </div>
        )}
        <iframe
          src={bookingIframeURL}
          width="100%"
          height="720"
          className="border-0"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400 mb-4">Having trouble with the booking system?</p>
        <p className="text-gray-300">
          Contact us directly at{" "}
          <a href={`tel:${phone}`} className="text-gold hover:underline">
            {phone}
          </a>{" "}
          or{" "}
          <a href={`mailto:${email}`} className="text-gold hover:underline">
            {email}
          </a>
        </p>
      </motion.div>
    </>
  )
}