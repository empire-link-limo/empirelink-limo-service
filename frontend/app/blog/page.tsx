// app/blog/page.tsx
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
  const [categories, setCategories] = useState<string[]>(["All"])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  useEffect(() => {
    async function fetchData() {
      try {
        const blogPageData = await getBlogPage()
        const postsData = await getAllPosts(100) as BlogPostsResponse
        const categoriesData = await getCategories()
        
        setBlogPage(blogPageData)
        setPosts(postsData.data)
        
        const categoryOptions = categoriesData.map((category: CategoryData) => category.attributes.name)
        setCategories(["All", ...categoryOptions])
      } catch (error) {
        console.error("Error fetching blog page data:", error)
      }
    }
    
    fetchData()
  }, [])
  
  // Default values if data is still loading
  const heroData = blogPage?.attributes?.hero || {
    title: "Our Blog",
    description: "Insights and updates from the world of luxury corporate transportation",
    backgroundImage: null
  }
  
  // Get image URL
  const heroImageUrl = heroData?.backgroundImage?.data ? 
    getStrapiMedia(heroData.backgroundImage) : 
    "/placeholder.svg?height=800&width=1600"
  
  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const postData = post.attributes
    const categoryName = postData.category?.data?.attributes?.name
    
    const matchesCategory = selectedCategory === "All" || categoryName === selectedCategory
    const matchesSearch =
      postData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      postData.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      
    return matchesCategory && matchesSearch
  })
  
  // Get featured post
  const featuredPost = posts.find((post) => post.attributes.featured)

  return (
    <div className="pt-20">
      {/* SEO */}
      {blogPage?.attributes?.seo && (
        <Seo seo={{
          metaTitle: blogPage.attributes.seo.metaTitle || "Blog | Empirelink Limo Service",
          metaDescription: blogPage.attributes.seo.metaDescription,
          shareImage: blogPage.attributes.seo.metaImage,
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
          {/* Search and Filter */}
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
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={
                      selectedCategory === category
                        ? "bg-gold hover:bg-gold-light text-black"
                        : "border-gray-700 hover:bg-gray-800"
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === "All" && searchQuery === "" && (
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
                      src={featuredPost.attributes.image?.data ? 
                        getStrapiMedia(featuredPost.attributes.image) : 
                        "/placeholder.svg?height=600&width=800"}
                      alt={featuredPost.attributes.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col">
                    <div className="mb-2">
                      <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm">Featured</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.attributes.title}</h2>
                    <p className="text-gray-300 mb-6">{featuredPost.attributes.excerpt}</p>
                    <div className="flex items-center text-gray-400 text-sm mb-6">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(featuredPost.attributes.Published).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <User className="h-4 w-4 mr-1" />
                        <span>{featuredPost.attributes.author || "Admin"}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        <span>{featuredPost.attributes.category?.data?.attributes?.name || "Uncategorized"}</span>
                      </div>
                    </div>
                    <Button asChild className="mt-auto bg-gold hover:bg-gold-light text-black self-start">
                      <Link href={`/blog/${featuredPost.attributes.slug}`}>
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
            {filteredPosts.length > 0 ? filteredPosts.map((post, index) => {
              const postData = post.attributes
              const imageUrl = postData.image?.data ? 
                getStrapiMedia(postData.image) : 
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
                    <Image src={imageUrl} alt={postData.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-400 text-xs mb-3">
                      <div className="flex items-center mr-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(postData.Published).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        <span>{postData.category?.data?.attributes?.name || "Uncategorized"}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{postData.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{postData.excerpt}</p>
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <User className="h-4 w-4 mr-1" />
                      <span>{postData.author || "Admin"}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                      <Link href={`/blog/${postData.slug}`}>Read Article</Link>
                    </Button>
                  </div>
                </motion.div>
              )
            }) : <></>}
          </div>

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
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-300 mb-6">
                  Stay updated with the latest insights, industry news, and exclusive offers from Luxury Limo.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Your email address" className="bg-gray-800 border-gray-700" />
                  <Button className="bg-gold hover:bg-gold-light text-black">Subscribe</Button>
                </div>
                <p className="text-gray-400 text-sm mt-3">We respect your privacy. Unsubscribe at any time.</p>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=600&width=800" alt="Newsletter" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}