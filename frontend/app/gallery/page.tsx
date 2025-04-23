"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Gallery categories
const categories = ["All", "Vehicles", "Events", "Interiors", "Chauffeurs", "Corporate"]

// Gallery images with metadata
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Mercedes-Benz S-Class exterior",
    category: "Vehicles",
    description: "Mercedes-Benz S-Class - Our flagship luxury sedan",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Cadillac Escalade exterior",
    category: "Vehicles",
    description: "Cadillac Escalade - Spacious luxury SUV",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Lincoln Continental exterior",
    category: "Vehicles",
    description: "Lincoln Continental - Classic American luxury",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Mercedes-Benz Sprinter interior",
    category: "Interiors",
    description: "Mercedes-Benz Sprinter - Executive conference seating",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "S-Class interior detail",
    category: "Interiors",
    description: "S-Class interior - Premium leather and ambient lighting",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Corporate event transportation",
    category: "Events",
    description: "Corporate event transportation service",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Professional chauffeur",
    category: "Chauffeurs",
    description: "Our professional chauffeurs are trained to provide exceptional service",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Airport transfer service",
    category: "Corporate",
    description: "Executive airport transfer service",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Rolls-Royce Phantom",
    category: "Vehicles",
    description: "Rolls-Royce Phantom - The pinnacle of luxury",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Corporate roadshow",
    category: "Corporate",
    description: "Multi-city roadshow transportation logistics",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Chauffeur opening door",
    category: "Chauffeurs",
    description: "White glove door service for all clients",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Gala event arrival",
    category: "Events",
    description: "Red carpet arrival at corporate gala event",
  },
  {
    id: 13,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "BMW 7 Series interior",
    category: "Interiors",
    description: "BMW 7 Series - Cutting-edge technology and comfort",
  },
  {
    id: 14,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Executive team transportation",
    category: "Corporate",
    description: "Executive team transportation for board meetings",
  },
  {
    id: 15,
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Mercedes-Benz Sprinter exterior",
    category: "Vehicles",
    description: "Mercedes-Benz Sprinter - Luxury group transportation",
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Filter images based on selected category
  const filteredImages = galleryImages.filter(
    (image) => selectedCategory === "All" || image.category === selectedCategory,
  )

  // Open lightbox with specific image
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  }

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto" // Restore scrolling
  }

  // Navigate to next image in lightbox
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length)
  }

  // Navigate to previous image in lightbox
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length)
  }

  // Handle keyboard navigation in lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  return (
    <div className="pt-20" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Luxury Fleet Gallery"
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
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              Explore our collection of luxury vehicles, corporate events, and premium services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={
                    selectedCategory === category
                      ? "bg-gold hover:bg-gold-light text-black"
                      : "border-gray-700 hover:bg-gray-800"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-800"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="bg-gold/20 text-gold px-2 py-1 rounded text-xs inline-block mb-2">
                        {image.category}
                      </div>
                      <h3 className="text-white font-bold">{image.description}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No images found</h3>
              <p className="text-gray-400 mb-6">No images available in this category.</p>
              <Button onClick={() => setSelectedCategory("All")} className="bg-gold hover:bg-gold-light text-black">
                View All Images
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button
                className="absolute right-0 top-0 z-10 p-2 text-white bg-black/50 rounded-full m-4 hover:bg-gold/80 transition-colors"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation buttons */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white bg-black/50 rounded-full ml-4 hover:bg-gold/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white bg-black/50 rounded-full mr-4 hover:bg-gold/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Image container */}
              <div className="relative flex-1 overflow-hidden rounded-lg">
                <div className="relative h-full w-full">
                  <Image
                    src={filteredImages[currentImageIndex].src || "/placeholder.svg"}
                    alt={filteredImages[currentImageIndex].alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="bg-black/80 p-4 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="bg-gold/20 text-gold px-2 py-1 rounded text-xs">
                      {filteredImages[currentImageIndex].category}
                    </span>
                    <h3 className="text-white font-bold mt-2">{filteredImages[currentImageIndex].description}</h3>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {currentImageIndex + 1} / {filteredImages.length}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
