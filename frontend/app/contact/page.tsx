// app/contact/page.tsx - Server Component
import Image from "next/image"
import { getContactPage, getGlobalData } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ClientContactForm } from "@/components/client-contact-form"
import { ClientContactInfo } from "@/components/client-contact-info"
import { ClientMapSection } from "@/components/client-map-section"

export default async function ContactPage() {
  // Server-side data fetching
  const contactPage = await getContactPage()
  const globalData = await getGlobalData()
  
  // Default values if data is unavailable
  const heroData = contactPage?.HeroSection || {
    title: "Contact Us",
    description: "Get in touch with our team to discuss your transportation needs",
    backgroundImage: null
  }
  
  const formSection = contactPage?.FormSection || {
    title: "Send Us a Message",
    successMessage: "Thank you for contacting us. A member of our team will get back to you shortly."
  }
  
  const mapSection = contactPage?.MapSection || {
    title: "Our Location",
    description: "Visit our office or use our convenient booking system to reserve your transportation"
  }
  
  // Get image URLs
  const heroImageUrl = heroData?.backgroundImage ? 
    getStrapiMedia(heroData.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"
  
  // Get contact details from global data
  const contactDetails = {
    phone: globalData?.phone || "+1 (234) 567-8900",
    email: globalData?.email || "info@luxurylimo.com",
    address: globalData?.address || 
      "123 Luxury Drive, Suite 400\nNew York, NY 10001",
    hours: globalData?.officeHours || "Monday-Friday: 9am-6pm"
  }
  
  // Extract social links
  const socialLinks = globalData?.socialLinks || []

  return (
    <div className="pt-20">
      {/* SEO */}
      {contactPage?.SEO && (
        <Seo seo={{
          metaTitle: contactPage.SEO.metaTitle || "Contact Us | Empirelink Limo Service",
          metaDescription: contactPage.SEO.metaDescription,
          shareImage: contactPage.SEO.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt="Contact Us"
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

      {/* Contact Information and Form */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ClientContactInfo 
              phone={contactDetails.phone}
              email={contactDetails.email}
              address={contactDetails.address}
              hours={contactDetails.hours}
              socialLinks={socialLinks}
            />

            {/* Contact Form - Simplified props */}
            <ClientContactForm 
              formTitle={formSection.title}
              successMessage={formSection.successMessage}
            />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{mapSection.title}</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            {mapSection.description && (
              <p className="text-gray-300 max-w-2xl mx-auto">
                {mapSection.description}
              </p>
            )}
          </div>

          <ClientMapSection 
            mapEmbedCode={mapSection.mapEmbedCode}
            locationName={mapSection.locationName}
            address={contactDetails.address}
            buttonText={mapSection.buttonText}
            buttonUrl={mapSection.buttonUrl}
          />
        </div>
      </section>
    </div>
  )
}