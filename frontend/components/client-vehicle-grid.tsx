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
import { getStrapiMedia } from "@/lib/api"
import { VehicleData } from "@/lib/types"

interface ClientVehicleGridProps {
  vehicles: VehicleData[];
}

export function ClientVehicleGrid({ vehicles }: ClientVehicleGridProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")
  
  // Initialize selectedVehicle and selectedImage if vehicles are available
  if (vehicles.length > 0 && !selectedVehicle) {
    setSelectedVehicle(vehicles[0])
    if (vehicles[0].image) {
      setSelectedImage(getStrapiMedia(vehicles[0].image))
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles && vehicles.length > 0 ? vehicles.map((vehicle, index) => {
        const imageUrl = vehicle.image ? 
          getStrapiMedia(vehicle.image) : 
          "/placeholder.svg?height=600&width=800"
        
        return (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 vehicle-card flex flex-col h-full"
          >
            <div className="h-56 relative">
              <Image 
                src={imageUrl} 
                alt={vehicle.name} 
                fill 
                className="object-contain"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
              <div className="flex items-center text-gold mb-4">
                <Users className="h-5 w-5 mr-2" />
                <span>{vehicle.capacity}</span>
              </div>
              <p className="text-gray-400 mb-6">{vehicle.description}</p>
              {/* This empty div will push the buttons to the bottom using flex-grow */}
              <div className="flex-grow"></div>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 border-gold text-gold hover:bg-gold/10"
                      onClick={() => {
                        setSelectedVehicle(vehicle)
                        if (vehicle.image) {
                          setSelectedImage(getStrapiMedia(vehicle.image))
                        }
                      }}
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
                      <div className="relative h-80 mb-4 bg-black/20 rounded-lg">
                        <Image
                          src={selectedImage || "/placeholder.svg"}
                          alt={selectedVehicle?.name || "Vehicle"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {selectedVehicle?.gallery?.map((img, i) => {
                          const galleryImageUrl = getStrapiMedia(img)
                          return (
                            <div
                              key={i}
                              className="relative h-20 w-32 flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden bg-black/20"
                              onClick={() => setSelectedImage(galleryImageUrl)}
                            >
                              <Image
                                src={galleryImageUrl}
                                alt={`Gallery image ${i + 1}`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )
                        })}
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
                            {selectedVehicle?.features?.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                                <span className="text-gray-300">{feature.text}</span>
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
        )
      }) : [1, 2, 3, 4, 5, 6].map((placeholder) => (
        <motion.div
          key={placeholder}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: placeholder * 0.1 }}
          className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 vehicle-card flex flex-col h-full"
        >
          <div className="h-56 relative">
            <Image 
              src="/placeholder.svg?height=600&width=800" 
              alt="Vehicle placeholder" 
              fill 
              className="object-contain" 
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">Luxury Vehicle</h3>
            <div className="flex items-center text-gold mb-4">
              <Users className="h-5 w-5 mr-2" />
              <span>Premium Capacity</span>
            </div>
            <p className="text-gray-400 mb-6">Loading vehicle details...</p>
            <div className="flex-grow"></div>
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Button variant="outline" className="flex-1 border-gold text-gold hover:bg-gold/10" disabled>
                View Details
              </Button>
              <Button asChild className="flex-1 bg-gold hover:bg-gold-light text-black">
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}