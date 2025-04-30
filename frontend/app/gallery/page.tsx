// app/gallery/page.tsx - Server Component with fixed gallerySettings
import Image from "next/image"
import { getGalleryPage, getGalleryImages, getCategories } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ClientGalleryView } from "@/components/client-gallery-view"

export default async function GalleryPage() {
  // Server-side data fetching
  const galleryPage = await getGalleryPage()
  const galleryImages = await getGalleryImages()
  const categoriesData = await getCategories()
  
  // Process categories
  const categoryNames = ["All", ...categoriesData.map(cat => cat.name)]
  
  // Default values if data is unavailable
  const heroData = galleryPage?.HeroSection || {
    title: "Our Gallery",
    description: "Explore our collection of luxury vehicles, corporate events, and premium services",
    backgroundImage: null
  }
  
  // Get gallery settings with default values to ensure required properties exist
  const gallerySettingsData = galleryPage?.GallerySettings || {}
  
  // Create a properly typed gallerySettings object with default values for missing properties
  const gallerySettings = {
    showCategories: gallerySettingsData.showCategories ?? true,
    enableLightbox: gallerySettingsData.enableLightbox ?? true,
    imagesPerRow: gallerySettingsData.imagesPerRow ?? 3,
    maxImages: gallerySettingsData.maxImages
  }
  
  // Get image URL
  const heroImageUrl = heroData?.backgroundImage ? 
    getStrapiMedia(heroData.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"

  return (
    <div className="pt-20">
      {/* SEO */}
      {galleryPage?.SEO && (
        <Seo seo={{
          metaTitle: galleryPage.SEO.metaTitle || "Gallery | Empirelink Limo Service",
          metaDescription: galleryPage.SEO.metaDescription,
          shareImage: galleryPage.SEO.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt="Luxury Fleet Gallery"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{heroData.title}</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              {heroData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section - Client Component */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <ClientGalleryView 
            galleryImages={galleryImages}
            categories={categoryNames}
            gallerySettings={gallerySettings}
          />
        </div>
      </section>
    </div>
  )
}