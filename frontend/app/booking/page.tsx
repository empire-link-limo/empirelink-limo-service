// app/booking/page.tsx - Server Component
import { getBookingPage } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ClientBookingContent } from "@/components/client-booking-content"

export default async function BookingPage() {
  // Server-side data fetching
  const bookingPage = await getBookingPage()
  
  // Default values if data is unavailable
  const pageData = bookingPage || {
    title: "Book Your Luxury Transportation",
    description: "Use our convenient booking system to reserve your premium transportation service",
    bookingIframeURL: "https://customer.moovs.app/luxury-limo/iframe",
    ContactInfo: {
      phone: "+1 (234) 567-8900",
      email: "bookings@luxurylimo.com"
    }
  }

  return (
    <div className="pt-20">
      {/* SEO */}
      {bookingPage?.SEO && (
        <Seo seo={{
          metaTitle: bookingPage.SEO.metaTitle || "Book Now | Empirelink Limo Service",
          metaDescription: bookingPage.SEO.metaDescription,
          shareImage: bookingPage.SEO.metaImage,
        }} />
      )}
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page title and description - server rendered */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageData.title}</h1>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {pageData.description}
            </p>
          </div>

          {/* Booking iframe and interactive elements - client rendered */}
          <ClientBookingContent 
            bookingIframeURL={pageData.bookingIframeURL}
            phone={pageData.ContactInfo?.phone}
            email={pageData.ContactInfo?.email}
          />
        </div>
      </div>
    </div>
  )
}