"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, Tag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getBlogPage, getAllPosts, getCategories } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/api"
import Seo from "@/components/seo"
import { BlogPageData, BlogPostData, BlogPostsResponse, CategoryData } from "@/lib/types"

export default function BlogPage() {
  const [blogPage, setBlogPage] = useState<BlogPageData | null>(null)
  const [posts, setPosts] = useState<BlogPostData[]>([])
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const blogPageData = await getBlogPage()
        const postsData = await getAllPosts(100) as BlogPostsResponse
        const categoriesData = await getCategories()
        
        setBlogPage(blogPageData)
        setPosts(postsData.data)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching blog page data:", error)
      }
    }
    
    fetchData()
  }, [])
  
  // Default values if data is still loading
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
  
  // Filter posts by category - fixed to check all categories
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || 
      (post.categories && post.categories.some(cat => cat.name === selectedCategory))
    
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      
    return matchesCategory && matchesSearch
  })

  // Get featured post - only if showFeaturedPost is true
  const featuredPost = blogSettings.showFeaturedPost ? posts.find((post) => post.featured) : null

  // Use all filtered posts (including featured post if it matches filters)
  const regularPosts = filteredPosts
  
  // Apply pagination
  const postsPerPage = blogSettings.postsPerPage || 9
  const totalPages = Math.ceil(regularPosts.length / postsPerPage)
  const paginatedPosts = regularPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{heroData.title}</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              {heroData.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Search and Filter - only show if enableSearchAndFilters is true */}
          {blogSettings.enableSearchAndFilters && (
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="w-full md:w-1/3">
                  <Input
                    placeholder="Search articles..."
                    className="bg-gray-900 border-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    key="All"
                    variant={selectedCategory === "All" ? "default" : "outline"}
                    className={
                      selectedCategory === "All"
                        ? "bg-gold hover:bg-gold-light text-black"
                        : "border-gray-700 hover:bg-gray-800"
                    }
                    onClick={() => setSelectedCategory("All")}
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      className={
                        selectedCategory === category.name
                          ? "bg-gold hover:bg-gold-light text-black"
                          : "border-gray-700 hover:bg-gray-800"
                      }
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Featured Post */}
          {featuredPost && blogSettings.showFeaturedPost && selectedCategory === "All" && searchQuery === "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredPost.image ? 
                        getStrapiMedia(featuredPost.image) : 
                        "/placeholder.svg?height=600&width=800"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col">
                    <div className="mb-2">
                      <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm">Featured</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-gray-400 text-sm mb-6">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(featuredPost.published || Date.now()).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <User className="h-4 w-4 mr-1" />
                        <span>{featuredPost.author || "Admin"}</span>
                      </div>
                      {featuredPost.categories && featuredPost.categories.length > 0 && (
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          <span>{featuredPost.categories[0]?.name || "Uncategorized"}</span>
                        </div>
                      )}
                    </div>
                    <Button asChild className="mt-auto bg-gold hover:bg-gold-light text-black self-start">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.length > 0 ? paginatedPosts.map((post, index) => {
              const imageUrl = post.image ? 
                getStrapiMedia(post.image) : 
                "/placeholder.svg?height=600&width=800"
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
                >
                  <div className="relative h-48">
                    <Image src={imageUrl} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-400 text-xs mb-3">
                      <div className="flex items-center mr-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(post.published || Date.now()).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex items-center">
                          <Tag className="h-3 w-3 mr-1" />
                          <span>{post.categories[0]?.name || "Uncategorized"}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author || "Admin"}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                      <Link href={`/blog/${post.slug}`}>Read Article</Link>
                    </Button>
                  </div>
                </motion.div>
              )
            }) : <></>}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-gray-700"
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    className={
                      pageNum === currentPage
                        ? "bg-gold hover:bg-gold-light text-black"
                        : "border-gray-700"
                    }
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-gray-700"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <Button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="bg-gold hover:bg-gold-light text-black"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{newsletterData.title}</h2>
                <p className="text-gray-300 mb-6">
                  {newsletterData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Your email address" className="bg-gray-800 border-gray-700" />
                  <Button className="bg-gold hover:bg-gold-light text-black">
                    {newsletterData.buttonText || "Subscribe"}
                  </Button>
                </div>
                <p className="text-gray-400 text-sm mt-3">We respect your privacy. Unsubscribe at any time.</p>
              </div>
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