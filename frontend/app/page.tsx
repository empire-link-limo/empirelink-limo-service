// app/page.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Star, Award, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStrapiMedia } from "@/lib/api"
import { getHomepage, getAllVehicles, getAllServices, getTestimonials } from "@/lib/strapi"
import Seo from "@/components/seo"

// Define TypeScript interfaces for Strapi data
interface StrapiImage {
  data?: {
    id: number;
    attributes: {
      url: string;
      width?: number;
      height?: number;
      alternativeText?: string;
    };
  } | null;
}

interface HeroSection {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  backgroundImage?: StrapiImage;
}

interface FleetSection {
  title: string;
  description: string;
}

interface ServicesSection {
  title: string;
  description: string;
}

interface TestimonialsSection {
  title: string;
  description: string;
}

interface CTASection {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundImage?: StrapiImage;
}

interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: StrapiImage;
}

interface HomepageData {
  id: number;
  attributes: {
    hero?: HeroSection;
    fleetSection?: FleetSection;
    servicesSection?: ServicesSection;
    testimonialsSection?: TestimonialsSection;
    ctaSection?: CTASection;
    seo?: SEO;
  };
}

interface VehicleData {
  id: number;
  attributes: {
    name: string;
    slug: string;
    capacity: string;
    description: string;
    image?: StrapiImage;
    gallery?: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
        };
      }>;
    };
    features?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
        };
      }>;
    };
  };
}

interface ServiceData {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    icon?: string;
    image?: StrapiImage;
    features?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
        };
      }>;
    };
  };
}

interface TestimonialData {
  id: number;
  attributes: {
    name: string;
    company: string;
    quote: string;
    image?: StrapiImage;
  };
}

export default function Home() {
  const [homepage, setHomepage] = useState<HomepageData | null>(null)
  const [vehicles, setVehicles] = useState<VehicleData[]>([])
  const [services, setServices] = useState<ServiceData[]>([])
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const homepageData = await getHomepage() as HomepageData
        const vehiclesData = await getAllVehicles() as VehicleData[]
        const servicesData = await getAllServices() as ServiceData[]
        const testimonialsData = await getTestimonials() as TestimonialData[]
        
        setHomepage(homepageData)
        setVehicles(vehiclesData)
        setServices(servicesData?.length > 0 ? servicesData.slice(0, 3) : [])
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error("Error fetching homepage data:", error)
      }
    }
    
    fetchData()
  }, [])
  
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Default values if data is still loading
  const heroData = homepage?.attributes?.hero || {
    title: "<span class='gold-gradient'>Elevate</span> Your Corporate Travel",
    subtitle: "Premium limousine and chauffeur services for discerning corporate clients",
    primaryButtonText: "Book Now",
    primaryButtonUrl: "/booking",
    secondaryButtonText: "Explore Fleet",
    secondaryButtonUrl: "/fleet"
  }
  
  const fleetSection = homepage?.attributes?.fleetSection || {
    title: "Our Premium Fleet",
    description: "Experience unparalleled comfort and style with our meticulously maintained luxury vehicles"
  }
  
  const servicesSection = homepage?.attributes?.servicesSection || {
    title: "Our Services",
    description: "Tailored transportation solutions for your corporate needs"
  }
  
  const testimonialsSection = homepage?.attributes?.testimonialsSection || {
    title: "Client Testimonials",
    description: "What our corporate clients say about our service"
  }
  
  const ctaSection = homepage?.attributes?.ctaSection || {
    title: "Ready to Experience Premium Corporate Transportation?",
    description: "Book your luxury transportation service today and elevate your corporate travel experience.",
    buttonText: "Book Now",
    buttonUrl: "/booking"
  }
  
  // Get image URLs
  const heroImageUrl = homepage?.attributes?.hero?.backgroundImage?.data ?
    getStrapiMedia(homepage.attributes.hero.backgroundImage) : 
    "/placeholder.svg?height=1080&width=1920"
    
  const ctaImageUrl = homepage?.attributes?.ctaSection?.backgroundImage?.data ?
    getStrapiMedia(homepage.attributes.ctaSection.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"

  return (
    <div className="flex flex-col">
      {/* SEO */}
      {homepage?.attributes?.seo && (
        <Seo seo={{
          metaTitle: homepage.attributes.seo.metaTitle || "Empirelink Limo Service | Premium Transportation",
          metaDescription: homepage.attributes.seo.metaDescription,
          shareImage: homepage.attributes.seo.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
        <Image
          src={heroImageUrl || "/placeholder.svg?height=1080&width=1920"}
          alt="Luxury limousine"
          fill
          className="object-cover brightness-50"
          priority
        />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span dangerouslySetInnerHTML={{ __html: heroData.title }} />
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {heroData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black text-lg">
                <Link href={heroData.primaryButtonUrl}>{heroData.primaryButtonText}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10 text-lg">
                <Link href={heroData.secondaryButtonUrl}>{heroData.secondaryButtonText}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-10 w-10 text-gold rotate-90" />
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{fleetSection.title}</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {fleetSection.description}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 py-4 px-2 horizontal-scroll">
              {vehicles && vehicles.length > 0 ? vehicles.map((vehicle) => {
                const vehicleData = vehicle.attributes
                const imageUrl = vehicleData.image?.data ? 
                  getStrapiMedia(vehicleData.image) : 
                  "/placeholder.svg?height=600&width=800"
                
                return (
                  <motion.div
                    key={vehicle.id}
                    className="flex-none w-80 vehicle-card"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800">
                      <div className="relative h-48">
                      <Image
                        src={imageUrl || "/placeholder.svg?height=600&width=800"}
                        alt={vehicleData.name}
                        fill
                        className="object-cover"
                      />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{vehicleData.name}</h3>
                        <p className="text-gold mb-2">{vehicleData.capacity}</p>
                        <p className="text-gray-400 mb-4">{vehicleData.description}</p>
                        <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                          <Link href={`/fleet/${vehicleData.slug}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              }) : [1, 2, 3, 4, 5].map((placeholder) => (
                <motion.div
                  key={placeholder}
                  className="flex-none w-80 vehicle-card"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800">
                    <div className="relative h-48">
                      <Image
                        src="/placeholder.svg?height=600&width=800"
                        alt="Vehicle placeholder"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">Luxury Vehicle</h3>
                      <p className="text-gold mb-2">3-6 passengers</p>
                      <p className="text-gray-400 mb-4">Premium transportation experience</p>
                      <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                        <Link href="/fleet">View Details</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-gold hover:bg-gold-light text-black">
              <Link href="/fleet">View All Vehicles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{servicesSection.title}</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {servicesSection.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services && services.length > 0 ? services.map((service, index) => {
              const serviceData = service.attributes
              const iconName = serviceData.icon || ["Award", "Clock", "Shield"][index % 3]
              let IconComponent = Award
              
              if (iconName === "Clock") IconComponent = Clock
              if (iconName === "Shield") IconComponent = Shield
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <IconComponent className="h-10 w-10 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{serviceData.title}</h3>
                  <p className="text-gray-400 mb-6">{serviceData.description}</p>
                  <Button asChild variant="link" className="text-gold">
                    <Link href={`/services#${serviceData.slug}`}>
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </motion.div>
              )
            }) : [
              {
                title: "Corporate Transportation",
                description: "Reliable and punctual service for executives and teams",
                icon: <Award className="h-10 w-10 text-gold" />,
              },
              {
                title: "Airport Transfers",
                description: "Seamless airport pickup and drop-off service",
                icon: <Clock className="h-10 w-10 text-gold" />,
              },
              {
                title: "Event Transportation",
                description: "Coordinated transportation for corporate events",
                icon: <Shield className="h-10 w-10 text-gold" />,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center"
              >
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <Button asChild variant="link" className="text-gold">
                  <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    Learn More <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{testimonialsSection.title}</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">{testimonialsSection.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials && testimonials.length > 0 ? testimonials.map((testimonial, index) => {
              const testimonialData = testimonial.attributes
              const imageUrl = testimonialData.image?.data ? 
                getStrapiMedia(testimonialData.image) : 
                "/placeholder.svg?height=100&width=100"
              
              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 p-8 rounded-lg border border-gray-800 relative"
                >
                  <div className="flex justify-center mb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold">
                    <Image
                      src={imageUrl || "/placeholder.svg?height=100&width=100"}
                      alt={testimonialData.name}
                      fill
                      className="object-cover"
                    />
                    </div>
                  </div>
                  <div className="text-gold flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-6">"{testimonialData.quote}"</p>
                  <div className="text-center">
                    <h4 className="font-bold">{testimonialData.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonialData.company}</p>
                  </div>
                </motion.div>
              )
            }) : [
              {
                name: "Sarah Johnson",
                company: "Global Enterprises",
                quote:
                  "The most reliable and luxurious transportation service we've used for our executives. Impeccable service every time.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Michael Chen",
                company: "Tech Innovations Inc.",
                quote:
                  "Our team relies on Luxury Limo for all our corporate transportation needs. Professional, punctual, and truly premium.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Elizabeth Taylor",
                company: "Financial Partners Group",
                quote:
                  "From airport pickups to event transportation, they consistently exceed our expectations with their attention to detail.",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-8 rounded-lg border border-gray-800 relative"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="text-gold flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                <div className="text-center">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
        <Image 
          src={ctaImageUrl || "/placeholder.svg?height=800&width=1600"} 
          alt="Background" 
          fill 
          className="object-cover" 
        />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {ctaSection.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black text-lg">
                <Link href={ctaSection.buttonUrl || "/booking"}>{ctaSection.buttonText || "Book Now"}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10 text-lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}