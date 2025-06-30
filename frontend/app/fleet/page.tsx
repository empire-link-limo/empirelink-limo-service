// app/fleet/page.tsx - Server Component
import Image from "next/image"
import Link from "next/link"
import { getFleetPage, getAllVehicles, getGlobalData } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ClientVehicleGrid } from "@/components/client-vehicle-grid"

export default async function FleetPage() {
  // Server-side data fetching
  const fleetPage = await getFleetPage()
  const vehicles = await getAllVehicles()
  const globalData = await getGlobalData() // Fetch global data for phone number
  
  // Default values if data is unavailable
  const heroData = fleetPage?.HeroSection || {
    title: "Our Luxury Fleet",
    description: "Explore our collection of premium vehicles, each maintained to the highest standards of luxury and comfort",
    backgroundImage: null
  }
  
  // Get image URL
  const heroImageUrl = heroData?.backgroundImage ? 
    getStrapiMedia(heroData.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"

  // Get phone from global data
  const phone = globalData?.phone

  return (
    <div className="pt-20">
      {/* SEO */}
      {fleetPage?.SEO && (
        <Seo seo={{
          metaTitle: fleetPage.SEO.metaTitle || "Our Fleet | Empirelink Limo Service",
          metaDescription: fleetPage.SEO.metaDescription,
          shareImage: fleetPage.SEO.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt="Our Fleet"
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
      
      {/* Fleet Grid - Client Component */}
      <div className="container mx-auto px-4 py-12">
        <ClientVehicleGrid vehicles={vehicles} phone={phone} />
      </div>
    </div>
  )
}