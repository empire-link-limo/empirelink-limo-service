// app/contact/page.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { getContactPage, getGlobalData } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ContactPageData, GlobalData, SocialLink } from "@/lib/types"

type FormData = {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export default function ContactPage() {
  const [contactPage, setContactPage] = useState<ContactPageData | null>(null)
  const [globalData, setGlobalData] = useState<GlobalData | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  
  useEffect(() => {
    async function fetchData() {
      try {
        const contactPageData = await getContactPage()
        const globalInfo = await getGlobalData()
        
        setContactPage(contactPageData)
        setGlobalData(globalInfo)
      } catch (error) {
        console.error("Error fetching contact page data:", error)
      }
    }
    
    fetchData()
  }, [])
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError("")
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      reset()
      setIsSubmitted(true)
    } catch (error) {
      setError("There was a problem submitting your form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Default values if data is still loading
  const heroData = contactPage?.attributes?.hero || {
    title: "Contact Us",
    description: "Get in touch with our team to discuss your transportation needs",
    backgroundImage: null
  }
  
  const formSection = contactPage?.attributes?.formSection || {
    title: "Send Us a Message",
    successMessage: "Thank you for contacting us. A member of our team will get back to you shortly."
  }
  
  const mapSection = contactPage?.attributes?.mapSection || {
    title: "Our Location",
    description: "Visit our office or use our convenient booking system to reserve your transportation"
  }
  
  // Get image URLs
  const heroImageUrl = heroData?.backgroundImage?.data ? 
    getStrapiMedia(heroData.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"
  
  // Get contact details from global data
  const contactDetails = {
    phone: globalData?.attributes?.phone || "+1 (234) 567-8900",
    email: globalData?.attributes?.email || "info@luxurylimo.com",
    address: globalData?.attributes?.address || 
      "123 Luxury Drive, Suite 400\nNew York, NY 10001",
    hours: globalData?.attributes?.officeHours || "Monday-Friday: 9am-6pm"
  }
  
  // Extract social links
  const socialLinks: SocialLink[] = globalData?.attributes?.socialLinks || []

  return (
    <div className="pt-20">
      {/* SEO */}
      {contactPage?.attributes?.seo && (
        <Seo seo={{
          metaTitle: contactPage.attributes.seo.metaTitle || "Contact Us | Empirelink Limo Service",
          metaDescription: contactPage.attributes.seo.metaDescription,
          shareImage: contactPage.attributes.seo.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt="Contact Us"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{heroData.title}</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              {heroData.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
              <div className="h-1 w-20 bg-gold mb-8"></div>

              <div className="space-y-8">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Phone</h3>
                    <p className="text-gray-300">{contactDetails.phone}</p>
                    <p className="text-gray-400 text-sm mt-1">Available 24/7 for bookings and support</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Email</h3>
                    <p className="text-gray-300">{contactDetails.email}</p>
                    <p className="text-gray-400 text-sm mt-1">We'll respond within 2 hours during business hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-gold mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold mb-2">Office Location</h3>
                    <p className="text-gray-300 whitespace-pre-line">
                      {contactDetails.address}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{contactDetails.hours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link: SocialLink, index: number) => {
                      const platform = link.platform?.toLowerCase() || "facebook"
                      let iconPath = ""
                      
                      switch (platform) {
                        case "facebook":
                          iconPath = "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          break
                        case "instagram":
                          iconPath = "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          break
                        case "twitter":
                          iconPath = "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                          break
                        case "linkedin":
                          iconPath = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                          break
                        case "youtube":
                          iconPath = "M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                          break
                        default:
                          iconPath = "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      }
                      
                      return (
                        <a 
                          href={link.url} 
                          key={index} 
                          className="bg-gray-800 hover:bg-gold transition-colors p-3 rounded-full"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
                          </svg>
                        </a>
                      )
                    })
                  ) : (
                    // Default social links if none provided
                    [
                      { platform: "facebook", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
                      { platform: "instagram", path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" },
                      { platform: "twitter", path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                      { platform: "linkedin", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
                    ].map((social, index) => (
                      <a href="#" key={index} className="bg-gray-800 hover:bg-gold transition-colors p-3 rounded-full">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d={social.path} />
                        </svg>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-lg border border-gray-800 p-8"
            >
              <h2 className="text-2xl font-bold mb-6">{formSection.title}</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-900/30 border border-green-800 rounded-lg p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-900/50 p-3 rounded-full">
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent Successfully</h3>
                  <p className="text-gray-300 mb-6">
                    {formSection.successMessage}
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} className="bg-gold hover:bg-gold-light text-black">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {error && (
                    <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300 mb-4">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        className="bg-gray-800 border-gray-700"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        className="bg-gray-800 border-gray-700"
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input id="phone" className="bg-gray-800 border-gray-700" {...register("phone")} />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company Name
                      </label>
                      <Input id="company" className="bg-gray-800 border-gray-700" {...register("company")} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      className="bg-gray-800 border-gray-700"
                      {...register("message", { required: "Message is required" })}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="bg-gold hover:bg-gold-light text-black w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                       <Send className="h-5 w-5 mr-2" />
                       Send Message
                     </>
                   )}
                 </Button>
               </form>
             )}
           </motion.div>
         </div>
       </div>
     </section>

     {/* Map Section */}
     <section className="py-20 bg-gradient-to-b from-black to-gray-900">
       <div className="container mx-auto px-4">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="text-center mb-12"
         >
           <h2 className="text-2xl md:text-3xl font-bold mb-4">{mapSection.title}</h2>
           <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
           <p className="text-gray-300 max-w-2xl mx-auto">
             {mapSection.description}
           </p>
         </motion.div>

         <div className="relative h-[400px] rounded-lg overflow-hidden">
           <Image src="/placeholder.svg?height=800&width=1600" alt="Map location" fill className="object-cover" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-black/80 p-6 rounded-lg max-w-md">
               <h3 className="text-xl font-bold mb-2">Luxury Limo Headquarters</h3>
               <p className="text-gray-300 mb-4 whitespace-pre-line">
                 {contactDetails.address}
               </p>
               <Button asChild className="bg-gold hover:bg-gold-light text-black">
                 <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                   Get Directions
                 </a>
               </Button>
             </div>
           </div>
         </div>
       </div>
     </section>
   </div>
 )
}