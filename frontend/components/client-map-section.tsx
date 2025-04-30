"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ClientMapSectionProps {
  mapEmbedCode?: string;
  locationName?: string;
  address: string;
  buttonText?: string;
  buttonUrl?: string;
}

export function ClientMapSection({
  mapEmbedCode,
  locationName = "Empirelink Limo Headquarters",
  address,
  buttonText = "Get Directions",
  buttonUrl = "https://maps.google.com"
}: ClientMapSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative h-[400px] rounded-lg overflow-hidden border border-gray-800 shadow-xl map-container"
    >
      {mapEmbedCode ? (
        <div 
          dangerouslySetInnerHTML={{ __html: mapEmbedCode }} 
          className="h-full w-full"
        />
      ) : (
        <>
          <Image 
            src="/placeholder.svg?height=800&width=1600" 
            alt="Map location" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-black/80 p-6 rounded-lg max-w-md backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-bold mb-2">
                {locationName}
              </h3>
              <p className="text-gray-300 mb-4 whitespace-pre-line">
                {address}
              </p>
              <Button asChild className="bg-gold hover:bg-gold-light text-black">
                <a 
                  href={buttonUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  {buttonText}
                </a>
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}