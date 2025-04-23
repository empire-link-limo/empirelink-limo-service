"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Star, Award, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "3 passengers",
    description: "Luxury sedan with premium leather interior",
  },
  {
    id: 2,
    name: "Cadillac Escalade",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "6 passengers",
    description: "Spacious SUV with executive amenities",
  },
  {
    id: 3,
    name: "Lincoln Continental",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "3 passengers",
    description: "Classic luxury with modern technology",
  },
  {
    id: 4,
    name: "Mercedes-Benz Sprinter",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "12 passengers",
    description: "Executive van with conference seating",
  },
  {
    id: 5,
    name: "Rolls-Royce Phantom",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "3 passengers",
    description: "Ultimate luxury experience",
  },
]

const services = [
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
]

const testimonials = [
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
]

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Luxury limousine"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gold-gradient">Elevate</span> Your Corporate Travel
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Premium limousine and chauffeur services for discerning corporate clients
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black text-lg">
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10 text-lg">
                <Link href="/fleet">Explore Fleet</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Fleet</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience unparalleled comfort and style with our meticulously maintained luxury vehicles
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
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  className="flex-none w-80 vehicle-card"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800">
                    <div className="relative h-48">
                      <Image
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                      <p className="text-gold mb-2">{vehicle.capacity}</p>
                      <p className="text-gray-400 mb-4">{vehicle.description}</p>
                      <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                        <Link href={`/fleet/${vehicle.id}`}>View Details</Link>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Tailored transportation solutions for your corporate needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">What our corporate clients say about our service</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
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
                      src={testimonial.image || "/placeholder.svg"}
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
          <Image src="/placeholder.svg?height=800&width=1600" alt="Background" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Premium Corporate Transportation?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book your luxury transportation service today and elevate your corporate travel experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black text-lg">
                <Link href="/booking">Book Now</Link>
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
