"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface ClientNewsletterProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export function ClientNewsletter({
  title = "Subscribe to Our Newsletter",
  description = "Stay updated with the latest insights, industry news, and exclusive offers from Luxury Limo.",
  buttonText = "Subscribe"
}: ClientNewsletterProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1000)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-300 mb-6">
        {description}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input 
          placeholder="Your email address" 
          className="bg-gray-800 border-gray-700" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || isSuccess}
        />
        <Button 
          type="submit" 
          className="bg-gold hover:bg-gold-light text-black"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed!" : buttonText}
        </Button>
      </form>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      {isSuccess && <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>}
      <p className="text-gray-400 text-sm mt-3">We respect your privacy. Unsubscribe at any time.</p>
    </motion.div>
  )
}