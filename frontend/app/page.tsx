// app/page.tsx - Server Component
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Award, Shield, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStrapiMedia } from "@/lib/api"
import { getHomepage, getFeaturedVehicles, getFeaturedServices, getTestimonials } from "@/lib/strapi"
import Seo from "@/components/seo"
import { ClientHero } from "@/components/client-hero"
import { ClientScroller } from "@/components/client-scroller"
import { ClientAnimation } from "@/components/client-animation"

export default async function Home() {
  // Server-side data fetching
  const homepage = await getHomepage();
  const featuredVehicles = await getFeaturedVehicles(5);
  const featuredServices = await getFeaturedServices(3);
  const testimonials = await getTestimonials();
  
  // Default values if data is unavailable
  const heroData = homepage?.HeroSection || {
    title: "",
    subtitle: "",
    primaryButtonText: "Book Now",
    primaryButtonUrl: "/booking",
    secondaryButtonText: "Explore Fleet",
    secondaryButtonUrl: "/fleet"
  }
  
  const fleetSection = homepage?.FleetSection || {
    title: "Our Premium Fleet",
    description: "Experience unparalleled comfort and style with our meticulously maintained luxury vehicles"
  }
  
  const servicesSection = homepage?.ServicesSection || {
    title: "Our Services",
    description: "Tailored transportation solutions for your corporate needs"
  }
  
  const testimonialsSection = homepage?.TestimonialsSection || {
    title: "Client Testimonials",
    description: "What our corporate clients say about our service"
  }
  
  const ctaSection = homepage?.CTASection || {
    title: "Ready to Experience Premium Corporate Transportation?",
    description: "Book your luxury transportation service today and elevate your corporate travel experience.",
    primaryButtonText: "Book Now",
    primaryButtonUrl: "/booking",
    secondaryButtonText: "Contact Us",
    secondaryButtonUrl: "/contact",
    backgroundImage: null
  }

  return (
    <div className="flex flex-col">
      {/* SEO */}
      {homepage?.SEO && (
        <Seo seo={{
          metaTitle: homepage.SEO.metaTitle || "Empirelink Limo Service | Premium Transportation",
          metaDescription: homepage.SEO.metaDescription,
          shareImage: homepage.SEO.metaImage,
        }} />
      )}
      
      {/* Hero Section - Only animation wrapper is client component */}
      <ClientHero
        title={heroData.title}
        subtitle={heroData.subtitle || heroData.description}
        primaryButtonText={heroData.primaryButtonText}
        primaryButtonUrl={heroData.primaryButtonUrl}
        secondaryButtonText={heroData.secondaryButtonText}
        secondaryButtonUrl={heroData.secondaryButtonUrl}
        backgroundImage={heroData.backgroundImage}
        desktopBackgroundImage={heroData.desktopBackgroundImage}
      />

      {/* Fleet Showcase - Server rendered content with client scroller */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900" aria-labelledby="fleet-section-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="fleet-section-title" className="text-3xl md:text-4xl font-bold mb-4">{fleetSection.title}</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {fleetSection.description}
            </p>
          </div>

          {/* Only the scrolling functionality is in a client component */}
          <ClientScroller>
            {featuredVehicles && featuredVehicles.length > 0 ? featuredVehicles.map((vehicle) => {
              const imageUrl = vehicle.image ? 
                getStrapiMedia(vehicle.image) : 
                "/placeholder.svg?height=600&width=800"
              
              return (
                <div key={vehicle.id} className="flex-none w-80 vehicle-card h-full">
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 flex flex-col h-full">
                    <div className="relative h-48 bg-black/20">
                      <Image
                        src={imageUrl || "/placeholder.svg?height=600&width=800"}
                        alt={`${vehicle.name} luxury vehicle`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                      <p className="text-gold mb-2">{vehicle.capacity}</p>
                      <p className="text-gray-400 mb-4 flex-grow">{vehicle.description}</p>
                      <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10 mt-auto">
                        <Link href={`/fleet/${vehicle.slug}`}>View Details of {vehicle.name}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            }) : [1, 2, 3, 4, 5].map((placeholder) => (
              <div key={placeholder} className="flex-none w-80 vehicle-card h-full">
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 flex flex-col h-full">
                  <div className="relative h-48 bg-black/20">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      alt="Vehicle placeholder"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">Luxury Vehicle</h3>
                    <p className="text-gold mb-2">3-6 passengers</p>
                    <p className="text-gray-400 mb-4 flex-grow">Premium transportation experience</p>
                    <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10 mt-auto">
                      <Link href="/fleet">Explore Our Fleet Options</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </ClientScroller>

          <div className="text-center mt-10">
            <Button asChild className="bg-gold hover:bg-gold-light text-black">
              <Link href="/fleet">View Our Complete Luxury Fleet</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section - Just animations in client component */}
      <section className="py-20 bg-black" aria-labelledby="services-section-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="services-section-title" className="text-3xl md:text-4xl font-bold mb-4">{servicesSection.title}</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {servicesSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
            {featuredServices && featuredServices.length > 0 ? featuredServices.map((service, index) => {
              // Get icon based on service.icon or fallback to defaults
              const iconName = service.icon || ["Award", "Clock", "Shield"][index % 3]
              let IconComponent = Award
              
              if (iconName === "Clock") IconComponent = Clock
              if (iconName === "Shield") IconComponent = Shield
              
              return (
                <ClientAnimation key={service.id} index={index} className="h-full">
                  <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center h-full flex flex-col">
                    <div className="flex justify-center mb-6">
                      <IconComponent className="h-10 w-10 text-gold" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                    <div className="mt-auto w-full overflow-hidden">
                      <Button asChild variant="link" className="text-gold w-full px-0">
                        <Link href={`/services/${service.slug}`} className="flex items-center justify-center w-full">
                          <span className="truncate">Discover {service.title} Services</span> <ChevronRight className="h-4 w-4 ml-1 flex-shrink-0" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ClientAnimation>
              )
            }) : [
              {
                title: "Corporate Transportation",
                description: "Reliable and punctual service for executives and teams",
                icon: Award,
              },
              {
                title: "Airport Transfers",
                description: "Seamless airport pickup and drop-off service",
                icon: Clock,
              },
              {
                title: "Event Transportation",
                description: "Coordinated transportation for corporate events",
                icon: Shield,
              },
            ].map((service, index) => (
              <ClientAnimation key={index} index={index} className="h-full">
                <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center h-full flex flex-col">
                  <div className="flex justify-center mb-6">
                    <service.icon className="h-10 w-10 text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                  <div className="mt-auto w-full overflow-hidden">
                    <Button asChild variant="link" className="text-gold w-full px-0">
                      <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center justify-center w-full">
                        <span className="truncate">Explore Our {service.title}</span> <ChevronRight className="h-4 w-4 ml-1 flex-shrink-0" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </ClientAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Server rendered with client animations */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black" aria-labelledby="testimonials-section-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="testimonials-section-title" className="text-3xl md:text-4xl font-bold mb-4">{testimonialsSection.title}</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">{testimonialsSection.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials && testimonials.length > 0 ? testimonials.map((testimonial, index) => {
              const imageUrl = testimonial.image ? 
                getStrapiMedia(testimonial.image) : 
                "/placeholder.svg?height=100&width=100"
              
              return (
                <ClientAnimation key={testimonial.id} index={index} animation="scale" className="h-full">
                  <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 relative h-full flex flex-col">
                    <div className="flex justify-center mb-6">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold">
                        <Image
                          src={imageUrl || "/placeholder.svg?height=100&width=100"}
                          alt={`${testimonial.name} from ${testimonial.company}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-gold flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                    <div className="text-center mt-auto">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </ClientAnimation>
              )
            }) : [
              {
                name: "Sarah Johnson",
                company: "Global Enterprises",
                quote: "The most reliable and luxurious transportation service we've used for our executives. Impeccable service every time.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Michael Chen",
                company: "Tech Innovations Inc.",
                quote: "Our team relies on Luxury Limo for all our corporate transportation needs. Professional, punctual, and truly premium.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Elizabeth Taylor",
                company: "Financial Partners Group",
                quote: "From airport pickups to event transportation, they consistently exceed our expectations with their attention to detail.",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <ClientAnimation key={index} index={index} animation="scale" className="h-full">
                <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 relative h-full flex flex-col">
                  <div className="flex justify-center mb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold">
                      <Image
                        src={testimonial.image}
                        alt={`${testimonial.name} from ${testimonial.company}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-gold flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="text-center mt-auto">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </ClientAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Complete server component */}
      <section className="py-20 bg-black relative overflow-hidden" aria-labelledby="cta-section-title">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src={ctaSection.backgroundImage ? getStrapiMedia(ctaSection.backgroundImage) : "/placeholder.svg?height=800&width=1600"} 
            alt="" 
            fill 
            className="object-cover" 
            role="presentation"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-section-title" className="text-3xl md:text-4xl font-bold mb-6">
              {ctaSection.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black text-lg">
                <Link href={ctaSection.primaryButtonUrl || "/booking"}>
                  {ctaSection.primaryButtonText || "Book Now"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10 text-lg">
                <Link href={ctaSection.secondaryButtonUrl || "/contact"}>
                  {ctaSection.secondaryButtonText || "Contact Us"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}