"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Check, Briefcase, Plane, Calendar, MapPin, Clock, Award, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStrapiMedia } from "@/lib/api"
import { ServiceData } from "@/lib/types"

interface ClientServicesListProps {
  services: ServiceData[];
}

export function ClientServicesList({ services }: ClientServicesListProps) {
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
    <div className="space-y-24">
      {services && services.length > 0 ? services.map((service, index) => {
        const imageUrl = service.image ? 
          getStrapiMedia(service.image) : 
          "/placeholder.svg?height=600&width=800"
        
        return (
          <div key={service.id} id={service.slug} className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              // Use animate for the first item, whileInView for others
              {...(index === 0 
                ? { animate: { opacity: 1, y: 0 } } 
                : { whileInView: { opacity: 1, y: 0 } }
              )}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
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
                      <span className="text-gray-300">{feature.text}</span>
                    </div>
                  )) : Array(6).fill(0).map((_, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                      <span className="text-gray-300">Premium Feature</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-gold hover:bg-gold-light text-black">
                    <Link href="/booking">Book This Service</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
                    <Link href={`/services/${service.slug}`}>View Details</Link>
                  </Button>
                </div>
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
          slug: "corporate-transportation"
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
          slug: "airport-transfers"
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
          slug: "corporate-events"
        },
      ].map((service, index) => (
        <div key={service.id} id={service.id} className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            // Use animate for the first item, whileInView for others
            {...(index === 0 
              ? { animate: { opacity: 1, y: 0 } } 
              : { whileInView: { opacity: 1, y: 0 } }
            )}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
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
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-gold hover:bg-gold-light text-black">
                  <Link href="/booking">Book This Service</Link>
                </Button>
                <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
                  <Link href={`/services/${service.slug}`}>View Details</Link>
                </Button>
              </div>
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
  )
}