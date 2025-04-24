"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Award, Clock, Shield, Briefcase, Plane, Calendar, MapPin, Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServicesPage, getAllServices } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ServicesPageData, ServiceData } from "@/lib/types"

export default function ServicesPage() {
  const [servicesPage, setServicesPage] = useState<ServicesPageData | null>(null)
  const [services, setServices] = useState<ServiceData[]>([])
  
  useEffect(() => {
    async function fetchData() {
      try {
        const servicesPageData = await getServicesPage()
        const servicesData = await getAllServices()
        
        setServicesPage(servicesPageData)
        setServices(servicesData)
      } catch (error) {
        console.error("Error fetching services page data:", error)
      }
    }
    
    fetchData()
  }, [])
  
  // Default values if data is still loading
  const heroData = servicesPage?.HeroSection || {
    title: "Our Services",
    description: "Comprehensive transportation solutions tailored to your corporate needs",
    backgroundImage: null
  }
  
  const whyChooseUs = servicesPage?.WhyChooseUsSection || {
    title: "Why Choose Luxury Limo",
    description: "What sets our service apart from the rest"
  }
  
  const ctaData = servicesPage?.CTASection || {
    title: "Ready to Elevate Your Corporate Transportation?",
    description: "Contact us today to discuss your transportation needs and discover how we can tailor our services to your requirements.",
    buttonText: "Book Now",
    buttonUrl: "/booking",
    backgroundImage: null
  }
  
  // Get image URLs
  const heroImageUrl = heroData?.backgroundImage ? 
    getStrapiMedia(heroData.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"
    
  const ctaImageUrl = ctaData?.backgroundImage ? 
    getStrapiMedia(ctaData.backgroundImage) : 
    "/placeholder.svg?height=600&width=800"
  
  // Map icon names to components
  const getIconComponent = (iconName: string | undefined) => {
    switch (iconName) {
      case "Briefcase": return <Briefcase className="h-12 w-12 text-gold" />
      case "Plane": return <Plane className="h-12 w-12 text-gold" />
      case "Calendar": return <Calendar className="h-12 w-12 text-gold" />
      case "MapPin": return <MapPin className="h-12 w-12 text-gold" />
      case "Clock": return <Clock className="h-12 w-12 text-gold" />
      case "Award": return <Award className="h-12 w-12 text-gold" />
      case "Shield": return <Shield className="h-12 w-12 text-gold" />
      case "Users": return <Users className="h-12 w-12 text-gold" />
      default: return <Briefcase className="h-12 w-12 text-gold" />
    }
  }

  return (
    <div className="pt-20">
      {/* SEO */}
      {servicesPage?.SEO && (
        <Seo seo={{
          metaTitle: servicesPage.SEO.metaTitle || "Our Services | Empirelink Limo Service",
          metaDescription: servicesPage.SEO.metaDescription,
          shareImage: servicesPage.SEO.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt="Our Services"
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

      {/* Services List */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services && services.length > 0 ? services.map((service, index) => {
              const imageUrl = service.image ? 
                getStrapiMedia(service.image) : 
                "/placeholder.svg?height=600&width=800"
              
              return (
                <div key={service.id} id={service.slug} className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
                  >
                    <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                      <div className="flex items-center mb-4">
                        {getIconComponent(service.icon)}
                        <h2 className="text-2xl md:text-3xl font-bold ml-4">{service.title}</h2>
                      </div>
                      <div className="h-1 w-20 bg-gold mb-6"></div>
                      <p className="text-gray-300 mb-6">{service.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {service.features ? service.features.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                            <span className="text-gray-300">{feature.name}</span>
                          </div>
                        )) : Array(6).fill(0).map((_, i) => (
                          <div key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                            <span className="text-gray-300">Premium Feature</span>
                          </div>
                        ))}
                      </div>
                      <Button asChild className="bg-gold hover:bg-gold-light text-black">
                        <Link href="/booking">Book This Service</Link>
                      </Button>
                    </div>
                    <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                      <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            }) : [
              {
                id: "corporate",
                icon: <Briefcase className="h-12 w-12 text-gold" />,
                title: "Corporate Transportation",
                description:
                  "Reliable and punctual service for executives and teams. Our corporate transportation service ensures your team arrives at meetings, conferences, and events on time and in style.",
                features: [
                  "Dedicated account manager",
                  "Corporate billing options",
                  "Professional chauffeurs",
                  "Real-time tracking",
                  "24/7 dispatch support",
                  "Meet and greet service",
                ],
                image: "/placeholder.svg?height=600&width=800",
              },
              {
                id: "airport",
                icon: <Plane className="h-12 w-12 text-gold" />,
                title: "Airport Transfers",
                description:
                  "Seamless airport pickup and drop-off service. Our chauffeurs monitor flight status in real-time to ensure they're ready when you arrive, regardless of delays or early arrivals.",
                features: [
                  "Flight tracking",
                  "Meet and greet service",
                  "Luggage assistance",
                  "Complimentary wait time",
                  "Terminal navigation assistance",
                  "Curbside pickup",
                ],
                image: "/placeholder.svg?height=600&width=800",
              },
              {
                id: "events",
                icon: <Calendar className="h-12 w-12 text-gold" />,
                title: "Corporate Events",
                description:
                  "Coordinated transportation for corporate events. We handle the logistics of moving your team or guests to and from corporate events, ensuring a seamless experience.",
                features: [
                  "Event coordination",
                  "Multiple vehicle options",
                  "Customized scheduling",
                  "On-site transportation manager",
                  "Group transportation solutions",
                  "VIP service options",
                ],
                image: "/placeholder.svg?height=600&width=800",
              },
            ].map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
                >
                  <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                    <div className="flex items-center mb-4">
                      {service.icon}
                      <h2 className="text-2xl md:text-3xl font-bold ml-4">{service.title}</h2>
                    </div>
                    <div className="h-1 w-20 bg-gold mb-6"></div>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="bg-gold hover:bg-gold-light text-black">
                      <Link href="/booking">Book This Service</Link>
                    </Button>
                  </div>
                  <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">{whyChooseUs.title}</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">{whyChooseUs.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center"
            >
              <div className="flex justify-center mb-6">
                <Award className="h-12 w-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Fleet</h3>
              <p className="text-gray-400">
                Our meticulously maintained vehicles represent the pinnacle of luxury and comfort, ensuring an
                exceptional travel experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center"
            >
              <div className="flex justify-center mb-6">
                <Users className="h-12 w-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4">Professional Chauffeurs</h3>
              <p className="text-gray-400">
                Our chauffeurs are professionally trained, background-checked, and committed to providing discreet,
                exceptional service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center"
            >
              <div className="flex justify-center mb-6">
                <Shield className="h-12 w-12 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4">Reliability</h3>
              <p className="text-gray-400">
                With a 99.8% on-time rate, we understand that punctuality is non-negotiable in the corporate world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-black rounded-lg border border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{ctaData.title}</h2>
                <p className="text-gray-300 mb-6">
                  {ctaData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-gold hover:bg-gold-light text-black">
                    <Link href={ctaData.buttonUrl || "/booking"}>{ctaData.buttonText || "Book Now"}</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white hover:bg-white/10">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={ctaImageUrl}
                  alt="Luxury transportation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}