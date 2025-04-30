// app/about/page.tsx - Server Component
import Image from "next/image"
import Link from "next/link"
import { Award, Clock, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAboutPage, getTeamMembers } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ClientAnimation } from "@/components/client-animation"
import { ClientAboutCTA } from "@/components/client-about-cta"

export default async function AboutPage() {
  // Server-side data fetching
  const aboutPage = await getAboutPage()
  const teamMembers = await getTeamMembers()
  
  // Default values if data is unavailable
  const heroData = aboutPage?.HeroSection || {
    title: "About Luxury Limo",
    description: "Setting the standard for premium corporate transportation since 2005",
    backgroundImage: null
  }
  
  const storyData = aboutPage?.StorySection || {
    title: "Our Story",
    content: `Founded in 2005, Luxury Limo began with a simple mission: to provide corporate clients with
              transportation services that truly reflect their professional standards.
              
              What started with a small fleet of three vehicles has grown into one of the most respected luxury
              transportation companies in the region, serving Fortune 500 companies and discerning business
              professionals.
              
              Our commitment to excellence, attention to detail, and understanding of corporate needs has established
              us as the preferred choice for executive transportation.`,
    image: null
  }
  
  const valuesData = aboutPage?.ValuesSection || {
    title: "Our Values",
    description: "The principles that guide every aspect of our service",
    valueItems: []
  }
  
  const teamData = aboutPage?.TeamSection || {
    title: "Our Leadership Team",
    description: "Meet the experts behind our exceptional service"
  }
  
  const ctaData = aboutPage?.CTASection || {
    title: "Ready to Experience the Difference?",
    description: "Join our growing list of satisfied corporate clients and discover why Luxury Limo is the preferred choice for executive transportation.",
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
    
  const storyImageUrl = storyData?.image ? 
    getStrapiMedia(storyData.image) : 
    "/placeholder.svg?height=800&width=1200"
    
  const ctaImageUrl = ctaData?.backgroundImage ? 
    getStrapiMedia(ctaData.backgroundImage) : 
    "/placeholder.svg?height=600&width=800"
  
  // Default values array for when Strapi data is not available
  const defaultValues = [
    {
      id: 1,
      icon: "Clock",
      title: "Punctuality",
      description:
        "We understand the value of your time. Our chauffeurs arrive early to ensure you're never kept waiting.",
    },
    {
      id: 2,
      icon: "Award",
      title: "Excellence",
      description:
        "We maintain the highest standards in every aspect of our service, from vehicle maintenance to chauffeur training.",
    },
    {
      id: 3,
      icon: "Shield",
      title: "Safety",
      description:
        "Your safety is our priority. Our vehicles undergo rigorous safety inspections and our chauffeurs are professionally trained.",
    },
    {
      id: 4,
      icon: "Users",
      title: "Client Focus",
      description:
        "We tailor our services to meet your specific needs, ensuring a personalized experience for every client.",
    },
  ]
  
  // Use valueItems from Strapi if available, otherwise use defaults
  const valueItems = valuesData.valueItems && valuesData.valueItems.length > 0 
    ? valuesData.valueItems 
    : defaultValues
  
  // Function to render the correct icon component based on icon name string
  const getIconComponent = (iconName: string | undefined) => {
    switch (iconName) {
      case "Clock": return <Clock className="h-10 w-10 text-gold" />
      case "Award": return <Award className="h-10 w-10 text-gold" />
      case "Shield": return <Shield className="h-10 w-10 text-gold" />
      case "Users": return <Users className="h-10 w-10 text-gold" />
      default: return <Award className="h-10 w-10 text-gold" />
    }
  }

  return (
    <div className="pt-20">
      {/* SEO */}
      {aboutPage?.SEO && (
        <Seo seo={{
          metaTitle: aboutPage.SEO.metaTitle || "About Empirelink Limo Service | Our Story",
          metaDescription: aboutPage.SEO.metaDescription,
          shareImage: aboutPage.SEO.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl || "/placeholder.svg?height=800&width=1600"}
            alt="About Luxury Limo"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <ClientAnimation>
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{heroData.title}</h1>
              <div className="h-1 w-20 bg-gold mb-6"></div>
              <p className="text-xl text-gray-300 mb-8">
                {heroData.description}
              </p>
            </div>
          </ClientAnimation>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ClientAnimation animation="slide">
              <div>
                <h2 className="text-3xl font-bold mb-6">{storyData.title}</h2>
                <div className="h-1 w-20 bg-gold mb-6"></div>
                <div className="text-gray-300 mb-6 space-y-4">
                  {storyData.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                <Button asChild className="bg-gold hover:bg-gold-light text-black">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </ClientAnimation>
            <ClientAnimation animation="slide">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image 
                  src={storyImageUrl || "/placeholder.svg?height=800&width=1600"} 
                  alt="Our story" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </ClientAnimation>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <ClientAnimation>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{valuesData.title}</h2>
              <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
              <p className="text-gray-300 max-w-2xl mx-auto">{valuesData.description}</p>
            </div>
          </ClientAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueItems.map((value, index) => (
              <ClientAnimation key={value.id || index} index={index}>
                <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
                  <div className="flex justify-center mb-6">
                    {getIconComponent(value.icon)}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </ClientAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team - Commented out as in the original */}
      {/* Team section commented out */}

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ClientAboutCTA
                title={ctaData.title}
                description={ctaData.description}
                primaryButtonText={ctaData.primaryButtonText}
                primaryButtonUrl={ctaData.primaryButtonUrl}
                secondaryButtonText={ctaData.secondaryButtonText}
                secondaryButtonUrl={ctaData.secondaryButtonUrl}
              />
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={ctaImageUrl || "/placeholder.svg?height=800&width=1600"}
                  alt="Luxury transportation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}