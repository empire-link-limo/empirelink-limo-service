// app/services/page.tsx - Server Component
import Image from "next/image"
import Link from "next/link"
import { Award, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServicesPage, getAllServices } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ClientServicesList } from "@/components/client-services-list"
import { ClientWhyChooseUs } from "@/components/client-why-choose-us"
import { ClientCTASection } from "@/components/client-cta-section"

export default async function ServicesPage() {
  // Server-side data fetching
  const servicesPage = await getServicesPage()
  const servicesData = await getAllServices()
  
  // Sort services by ID in ascending order
  const services = [...servicesData].sort((a, b) => a.id - b.id)
  
  // Default values if data is unavailable
  const heroData = servicesPage?.HeroSection || {
    title: "Our Services",
    description: "Comprehensive transportation solutions tailored to your corporate needs",
    backgroundImage: null
  }
  
  const whyChooseUs = servicesPage?.WhyChooseUsSection || {
    title: "Why Choose Luxury Limo",
    description: "What sets our service apart from the rest"
  }
  
  const ctaData = servicesPage?.CTASection || {
    title: "Ready to Elevate Your Corporate Transportation?",
    description: "Contact us today to discuss your transportation needs and discover how we can tailor our services to your requirements.",
    primaryButtonText: "Book Now",
    primaryButtonUrl: "/booking",
    secondaryButtonText: "Contact Us",
    secondaryButtonUrl: "/contact",
    backgroundImage: null
  }
  
  // Get image URLs
  const heroImageUrl = heroData?.backgroundImage ? 
    getStrapiMedia(heroData.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"
    
  const ctaImageUrl = ctaData?.backgroundImage ? 
    getStrapiMedia(ctaData.backgroundImage) : 
    "/placeholder.svg?height=600&width=800"

  return (
    <div className="pt-20">
      {/* SEO */}
      {servicesPage?.SEO && (
        <Seo seo={{
          metaTitle: servicesPage.SEO.metaTitle || "Our Services | Empirelink Limo Service",
          metaDescription: servicesPage.SEO.metaDescription,
          shareImage: servicesPage.SEO.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt="Our Services"
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

      {/* Services List - Client Component */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <ClientServicesList services={services} />
        </div>
      </section>

      {/* Why Choose Us - Client Component */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <ClientWhyChooseUs 
            title={whyChooseUs.title}
            description={whyChooseUs.description}
            benefits={whyChooseUs.benefit || []}
          />
        </div>
      </section>

      {/* CTA Section - Client Component */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <ClientCTASection
            title={ctaData.title}
            description={ctaData.description}
            primaryButtonText={ctaData.primaryButtonText}
            primaryButtonUrl={ctaData.primaryButtonUrl}
            secondaryButtonText={ctaData.secondaryButtonText}
            secondaryButtonUrl={ctaData.secondaryButtonUrl}
            imageUrl={ctaImageUrl}
          />
        </div>
      </section>
    </div>
  )
}