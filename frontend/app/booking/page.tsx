"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Your Luxury Transportation</h1>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Use our convenient booking system to reserve your premium transportation service
            </p>
          </motion.div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 md:p-8 relative min-h-[720px]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg z-10">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
              </div>
            )}
            <iframe
              src="https://customer.moovs.app/luxury-limo/iframe"
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
              <a href="tel:+1234567890" className="text-gold hover:underline">
                +1 (234) 567-8900
              </a>{" "}
              or{" "}
              <a href="mailto:bookings@luxurylimo.com" className="text-gold hover:underline">
                bookings@luxurylimo.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
