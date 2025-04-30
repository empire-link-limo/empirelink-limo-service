// app/blog/page.tsx - Server Component
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Tag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlogPage, getAllPosts, getCategories } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { ClientBlogFilters } from "@/components/client-blog-filters"
import { ClientBlogPosts } from "@/components/client-blog-posts"
import { ClientNewsletter } from "@/components/client-newsletter"

export default async function BlogPage() {
  // Server-side data fetching
  const blogPage = await getBlogPage()
  const postsResponse = await getAllPosts(100)
  const categories = await getCategories()
  
  const posts = postsResponse.data
  
  // Default values if data is unavailable
  const heroData = blogPage?.HeroSection || {
    title: "Our Blog",
    description: "Insights and updates from the world of luxury corporate transportation",
    backgroundImage: null
  }
  
  // Get blog settings with defaults
  const blogSettings = blogPage?.BlogSettings || {
    postsPerPage: 9,
    showFeaturedPost: true,
    enableSearchAndFilters: true
  }
  
  // Get newsletter section
  const newsletterData = blogPage?.NewsletterSection || {
    title: "Subscribe to Our Newsletter",
    description: "Stay updated with the latest insights, industry news, and exclusive offers from Luxury Limo.",
    buttonText: "Subscribe",
    image: null
  }
  
  // Get image URL
  const heroImageUrl = heroData?.backgroundImage ? 
    getStrapiMedia(heroData.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"
  
  const newsletterImageUrl = newsletterData?.image ?
    getStrapiMedia(newsletterData.image) :
    "/placeholder.svg?height=600&width=800"
  
  // Get featured post - only if showFeaturedPost is true
  const featuredPost = blogSettings.showFeaturedPost ? posts.find((post) => post.featured) : null

  return (
    <div className="pt-20">
      {/* SEO */}
      {blogPage?.SEO && (
        <Seo seo={{
          metaTitle: blogPage.SEO.metaTitle || "Blog | Empirelink Limo Service",
          metaDescription: blogPage.SEO.metaDescription,
          shareImage: blogPage.SEO.metaImage,
        }} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image src={heroImageUrl} alt="Blog" fill className="object-cover brightness-50" />
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

      {/* Blog Content */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Search and Filter - only show if enableSearchAndFilters is true */}
          {blogSettings.enableSearchAndFilters && (
            <ClientBlogFilters categories={categories} />
          )}

          {/* Blog Posts with featured post and pagination */}
          <ClientBlogPosts 
            posts={posts} 
            featuredPost={featuredPost} 
            categories={categories}
            postsPerPage={blogSettings.postsPerPage || 9}
            showFeaturedPost={!!blogSettings.showFeaturedPost}
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ClientNewsletter 
                title={newsletterData.title}
                description={newsletterData.description}
                buttonText={newsletterData.buttonText}
              />
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image 
                  src={newsletterImageUrl} 
                  alt="Newsletter" 
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