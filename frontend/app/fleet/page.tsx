"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Award, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "3 passengers",
    description: "Luxury sedan with premium leather interior",
    features: [
      "Premium leather seats",
      "Climate control",
      "Privacy partition",
      "Wi-Fi connectivity",
      "Refreshment cooler",
      "Ambient lighting",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 2,
    name: "Cadillac Escalade",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "6 passengers",
    description: "Spacious SUV with executive amenities",
    features: [
      "Premium leather seats",
      "Climate control",
      "Privacy partition",
      "Wi-Fi connectivity",
      "Entertainment system",
      "Extra luggage space",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 3,
    name: "Lincoln Continental",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "3 passengers",
    description: "Classic luxury with modern technology",
    features: [
      "Premium leather seats",
      "Climate control",
      "Privacy partition",
      "Wi-Fi connectivity",
      "Refreshment cooler",
      "Ambient lighting",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 4,
    name: "Mercedes-Benz Sprinter",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "12 passengers",
    description: "Executive van with conference seating",
    features: [
      "Conference seating configuration",
      "Climate control",
      "Wi-Fi connectivity",
      "Entertainment system",
      "Refreshment cooler",
      "Extra luggage space",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 5,
    name: "Rolls-Royce Phantom",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "3 passengers",
    description: "Ultimate luxury experience",
    features: [
      "Handcrafted interior",
      "Starlight headliner",
      "Privacy partition",
      "Wi-Fi connectivity",
      "Champagne cooler",
      "Bespoke amenities",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 6,
    name: "BMW 7 Series",
    image: "/placeholder.svg?height=600&width=800",
    capacity: "3 passengers",
    description: "Sophisticated luxury with cutting-edge technology",
    features: [
      "Premium leather seats",
      "Climate control",
      "Privacy partition",
      "Wi-Fi connectivity",
      "Refreshment cooler",
      "Advanced entertainment system",
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

export default function FleetPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof vehicles)[0] | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Luxury Fleet</h1>
          <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our collection of premium vehicles, each maintained to the highest standards of luxury and comfort
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 vehicle-card"
            >
              <div className="relative h-64">
                <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <div className="flex items-center text-gold mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{vehicle.capacity}</span>
                </div>
                <p className="text-gray-400 mb-6">{vehicle.description}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 border-gold text-gold hover:bg-gold/10"
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] bg-gray-900 border-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{selectedVehicle?.name}</DialogTitle>
                        <DialogDescription className="text-gray-400">{selectedVehicle?.description}</DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="relative h-80 mb-4">
                          <Image
                            src={selectedImage || selectedVehicle?.image || ""}
                            alt={selectedVehicle?.name || ""}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                          {selectedVehicle?.gallery.map((img, i) => (
                            <div
                              key={i}
                              className="relative h-20 w-32 flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden"
                              onClick={() => setSelectedImage(img)}
                            >
                              <Image
                                src={img || "/placeholder.svg"}
                                alt={`Gallery image ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-bold mb-3 flex items-center">
                              <Users className="h-5 w-5 text-gold mr-2" />
                              Capacity
                            </h4>
                            <p className="text-gray-300 mb-4">{selectedVehicle?.capacity}</p>

                            <h4 className="text-lg font-bold mb-3 flex items-center">
                              <Award className="h-5 w-5 text-gold mr-2" />
                              Premium Features
                            </h4>
                            <ul className="space-y-2">
                              {selectedVehicle?.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                                  <span className="text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-black/50 p-4 rounded-lg">
                            <h4 className="text-lg font-bold mb-4">Book This Vehicle</h4>
                            <p className="text-gray-300 mb-4">
                              This premium vehicle is perfect for executive travel and corporate events.
                            </p>
                            <Button asChild className="w-full bg-gold hover:bg-gold-light text-black">
                              <Link href="/booking">Book Now</Link>
                            </Button>
                            <p className="text-sm text-gray-400 mt-4 text-center">
                              Or call us at{" "}
                              <a href="tel:+1234567890" className="text-gold hover:underline">
                                +1 (234) 567-8900
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button asChild className="flex-1 bg-gold hover:bg-gold-light text-black">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
