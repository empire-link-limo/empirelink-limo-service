"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, Tag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStrapiMedia } from "@/lib/api"
import { BlogPostData, CategoryData } from "@/lib/types"

interface ClientBlogPostsProps {
  posts: BlogPostData[];
  featuredPost: BlogPostData | null | undefined;
  categories: CategoryData[];
  postsPerPage: number;
  showFeaturedPost: boolean;
}

export function ClientBlogPosts({ 
  posts, 
  featuredPost, 
  categories,
  postsPerPage,
  showFeaturedPost
}: ClientBlogPostsProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPostData[]>(posts)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFeaturedPostState, setShowFeaturedPostState] = useState(true)
  
  // Handle URL params for initial load and browser navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('category')
    const searchParam = params.get('search')
    
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    
    if (searchParam) {
      setSearchQuery(searchParam)
    }
    
    // Filter posts based on URL params
    filterPosts(categoryParam || "All", searchParam || "")
    
    // Listen for filter changes from the filter component
    const handleFilterChange = (e: CustomEvent) => {
      const { category, search } = e.detail
      setSelectedCategory(category)
      setSearchQuery(search)
      filterPosts(category, search)
      setCurrentPage(1) // Reset to first page on filter change
    }
    
    window.addEventListener('blog-filters-changed', handleFilterChange as EventListener)
    
    return () => {
      window.removeEventListener('blog-filters-changed', handleFilterChange as EventListener)
    }
  }, [posts])
  
  // Update filtered posts when filters change
  const filterPosts = (category: string, query: string) => {
    const filtered = posts.filter((post) => {
      const matchesCategory = category === "All" || 
        (post.categories && post.categories.some(cat => cat.name === category))
      
      const matchesSearch =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        (post.excerpt?.toLowerCase() || "").includes(query.toLowerCase())
        
      return matchesCategory && matchesSearch
    })
    
    setFilteredPosts(filtered)
    
    // Hide featured post if it doesn't match the filters
    if (featuredPost) {
      const categoryMatch = category === "All" || 
        (featuredPost.categories && featuredPost.categories.some(cat => cat.name === category));
      
      const searchMatch = query === "" || 
        featuredPost.title.toLowerCase().includes(query.toLowerCase()) ||
        (featuredPost.excerpt?.toLowerCase() || "").includes(query.toLowerCase());
      
      setShowFeaturedPostState(!!categoryMatch && !!searchMatch);
    }
  }
  
  // Apply pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )
  
  // Should we show the featured post?
  const shouldShowFeaturedPost = 
    !!featuredPost && 
    showFeaturedPost && 
    showFeaturedPostState && 
    selectedCategory === "All" && 
    searchQuery === ""
    
  return (
    <>
      {/* Featured Post */}
      {shouldShowFeaturedPost && (
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
              // Reset filters
              setSelectedCategory("All")
              setSearchQuery("")
              filterPosts("All", "")
              
              // Update URL
              window.history.pushState({}, '', window.location.pathname)
              
              // Dispatch event to notify filter component
              window.dispatchEvent(new CustomEvent('blog-filters-reset'))
            }}
            className="bg-gold hover:bg-gold-light text-black"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </>
  )
}