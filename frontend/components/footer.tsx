// components/footer.tsx (Server Component)
import { getAllServices } from "@/lib/strapi"
import { GlobalData } from "@/lib/types"
import { getStrapiMedia } from "@/lib/api"
import { FooterClient } from "./footer-client"

export async function Footer({ global }: { global?: GlobalData }) {
  // Fetch services on the server
  const services = await getAllServices().catch(error => {
    console.error("Error fetching services:", error)
    return []
  })
  
  // Sort services by ID in ascending order for consistency
  const sortedServices = [...services].sort((a, b) => a.id - b.id)
  
  const currentYear = new Date().getFullYear()
  const companyName = global?.companyName || "Luxury Limo Service"
  const description = global?.description || "Premium limousine and chauffeur services for discerning corporate clients."
  const phone = global?.phone || "+1 (234) 567-8900"
  const email = global?.email || "info@luxurylimo.com"
  const address = global?.address || "123 Luxury Drive, Suite 400\nNew York, NY 10001"
  const logo = global?.logo ? getStrapiMedia(global.logo) : null
  
  // Use global footerText if available, otherwise create default
  const footerText = global?.footerText || `© ${currentYear} ${companyName}. All rights reserved.`
  
  return (
    <FooterClient
      services={sortedServices}
      companyName={companyName}
      description={description}
      phone={phone}
      email={email}
      address={address}
      logo={logo}
      footerText={footerText}
      socialLinks={global?.socialLinks || []}
    />
  )
}