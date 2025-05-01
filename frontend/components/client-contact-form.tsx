"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import ReCAPTCHA from "react-google-recaptcha"

interface ClientContactFormProps {
  formTitle: string;
  successMessage?: string;
  notificationEmail?: string;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  notificationEmail?: string;
}

export function ClientContactForm({
  formTitle,
  successMessage = "Thank you for contacting us. A member of our team will get back to you shortly.",
  notificationEmail
}: ClientContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  
  const onSubmit = async (data: FormData) => {
    // Verify reCAPTCHA completion
    if (!captchaValue) {
      setError("Please complete the CAPTCHA verification")
      return
    }
    
    setIsSubmitting(true)
    setError("")
    
    try {
      // If we have a notification email, add it to the form data
      if (notificationEmail) {
        data.notificationEmail = notificationEmail;
      }
      
      // Add reCAPTCHA token to the request
      const requestData = {
        ...data,
        recaptchaToken: captchaValue
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }
      
      reset()
      setIsSubmitted(true)
      
      // Reset the reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
      setCaptchaValue(null)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("There was a problem submitting your form. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // reCAPTCHA change handler
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value)
    if (value) {
      setError("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-lg border border-gray-800 p-4 sm:p-6 md:p-8 w-full max-w-full overflow-hidden"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{formTitle}</h2>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-900/30 border border-green-800 rounded-lg p-4 sm:p-6 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-green-900/50 p-3 rounded-full">
              <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">Message Sent Successfully</h3>
          <p className="text-gray-300 mb-4 sm:mb-6">
            {successMessage}
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="bg-gold hover:bg-gold-light text-black">
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 w-full">
          {error && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 sm:p-4 text-red-300 mb-3 sm:mb-4">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 sm:mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                className="bg-gray-800 border-gray-700 w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 sm:mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                className="bg-gray-800 border-gray-700 w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1 sm:mb-2">
                Phone Number
              </label>
              <Input id="phone" className="bg-gray-800 border-gray-700 w-full" {...register("phone")} />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1 sm:mb-2">
                Company Name
              </label>
              <Input id="company" className="bg-gray-800 border-gray-700 w-full" {...register("company")} />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1 sm:mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              rows={4}
              className="bg-gray-800 border-gray-700 w-full"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>
          
          {/* reCAPTCHA component with responsive wrapper */}
          <div className="mt-4 sm:mt-6 overflow-x-auto">
            <div className="transform scale-90 origin-left sm:scale-100 md:scale-100">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY"}
                onChange={handleCaptchaChange}
                theme="dark"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="bg-gold hover:bg-gold-light text-black w-full"
            disabled={isSubmitting || !captchaValue}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle
                     className="opacity-25"
                     cx="12"
                     cy="12"
                     r="10"
                     stroke="currentColor"
                     strokeWidth="4"
                   ></circle>
                   <path
                     className="opacity-75"
                     fill="currentColor"
                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                   ></path>
                 </svg>
               </span>
               Sending...
             </>
           ) : (
             <>
               <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
               Send Message
             </>
           )}
         </Button>
       </form>
     )}
   </motion.div>
  )
}