"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStrapiMedia } from "@/lib/api"
import { GalleryImageData } from "@/lib/types"

interface ClientGalleryViewProps {
  galleryImages: GalleryImageData[];
  categories: string[];
  gallerySettings: {
    showCategories: boolean;
    enableLightbox: boolean;
    imagesPerRow: number;
    maxImages?: number;
  };
}

export function ClientGalleryView({ 
  galleryImages, 
  categories, 
  gallerySettings 
}: ClientGalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Filter images based on selected category
  const filteredImages = galleryImages.filter(
    (image) => selectedCategory === "All" || 
    (image.categories && image.categories.some(cat => cat.name === selectedCategory))
  )
  
  // Apply maxImages limit if set
  const imagesToDisplay = gallerySettings.maxImages 
    ? filteredImages.slice(0, gallerySettings.maxImages) 
    : filteredImages
  
  // Determine grid columns based on imagesPerRow setting
  const getGridCols = () => {
    switch(gallerySettings.imagesPerRow) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      case 3:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  }
  
  // Open lightbox with specific image
  const openLightbox = (index: number) => {
    if (gallerySettings.enableLightbox) {
      setCurrentImageIndex(index)
      setLightboxOpen(true)
      document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
    }
  }

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto" // Restore scrolling
  }

  // Navigate to next image in lightbox
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToDisplay.length)
  }

  // Navigate to previous image in lightbox
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesToDisplay.length) % imagesToDisplay.length)
  }

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen])

  return (
    <>
      {/* Category Filter - only show if showCategories is true */}
      {gallerySettings.showCategories && (
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
      )}

      {/* Gallery Grid - use dynamic grid columns based on imagesPerRow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`grid ${getGridCols()} gap-6`}
      >
        {imagesToDisplay.length > 0 ? imagesToDisplay.map((image, index) => {
          const imageUrl = image.image ? 
            getStrapiMedia(image.image) : 
            "/placeholder.svg?height=800&width=1200"
          
          // Get category name if available
          const categoryName = image.categories && image.categories.length > 0 
            ? image.categories[0].name 
            : "Vehicle";
          
          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative group overflow-hidden rounded-lg border border-gray-800 ${gallerySettings.enableLightbox ? 'cursor-pointer' : ''}`}
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="bg-gold/20 text-gold px-2 py-1 rounded text-xs inline-block mb-2">
                      {categoryName}
                    </div>
                    <h3 className="text-white font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        }) : Array(15).fill(0).map((_, index) => (
          // Placeholder gallery items
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative aspect-[4/3] rounded-lg bg-gray-900 border border-gray-800 overflow-hidden"
          >
            <div className="absolute inset-0 animate-pulse">
              <div className="bg-gray-800 h-full w-full"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {imagesToDisplay.length === 0 && categories.length > 1 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">No images found</h3>
          <p className="text-gray-400 mb-6">No images available in this category.</p>
          <Button onClick={() => setSelectedCategory("All")} className="bg-gold hover:bg-gold-light text-black">
            View All Images
          </Button>
        </div>
      )}

      {/* Lightbox - only enable if enableLightbox is true */}
      <AnimatePresence>
        {lightboxOpen && gallerySettings.enableLightbox && imagesToDisplay.length > 0 && (
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
              {imagesToDisplay.length > 1 && (
                <>
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
                </>
              )}

              {/* Image container */}
              <div className="relative flex-1 overflow-hidden rounded-lg bg-black/50">
                <div className="w-full h-full flex items-center justify-center" style={{ minHeight: "400px" }}>
                  <Image
                    src={imagesToDisplay[currentImageIndex].image ? 
                      getStrapiMedia(imagesToDisplay[currentImageIndex].image) : 
                      "/placeholder.svg?height=800&width=1200"}
                    alt={imagesToDisplay[currentImageIndex].title}
                    width={1200}
                    height={800}
                    className="object-contain max-h-[70vh] w-auto h-auto"
                    priority
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="bg-black/80 p-4 rounded-b-lg">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="flex-1 min-w-0 pr-4">
                    <span className="bg-gold/20 text-gold px-2 py-1 rounded text-xs">
                      {imagesToDisplay[currentImageIndex].categories && 
                        imagesToDisplay[currentImageIndex].categories.length > 0 
                        ? imagesToDisplay[currentImageIndex].categories[0].name 
                        : "Vehicle"}
                    </span>
                    <h3 className="text-white font-bold mt-2 truncate">{imagesToDisplay[currentImageIndex].title}</h3>
                    <p className="text-gray-300 mt-1 line-clamp-2">{imagesToDisplay[currentImageIndex].description}</p>
                  </div>
                  <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {imagesToDisplay.length}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}