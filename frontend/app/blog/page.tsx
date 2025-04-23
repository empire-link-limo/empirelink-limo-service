"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, Tag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = ["All", "Corporate Travel", "Luxury Vehicles", "Business Tips", "Industry News", "Events"]

const blogPosts = [
  {
    id: 1,
    title: "5 Ways to Optimize Your Corporate Travel Program",
    excerpt:
      "Discover strategies to enhance efficiency and reduce costs in your corporate transportation program without sacrificing quality.",
    image: "/placeholder.svg?height=600&width=800",
    date: "March 15, 2023",
    author: "Jonathan Reynolds",
    category: "Corporate Travel",
    featured: true,
  },
  {
    id: 2,
    title: "The Evolution of Luxury Fleet Vehicles in 2023",
    excerpt:
      "Explore the latest innovations in luxury vehicles and how they're enhancing the executive transportation experience.",
    image: "/placeholder.svg?height=600&width=800",
    date: "February 28, 2023",
    author: "Alexandra Chen",
    category: "Luxury Vehicles",
    featured: false,
  },
  {
    id: 3,
    title: "How to Choose the Right Vehicle for Your Corporate Event",
    excerpt:
      "A comprehensive guide to selecting the perfect transportation solution for different types of corporate events.",
    image: "/placeholder.svg?height=600&width=800",
    date: "January 20, 2023",
    author: "Michael Thompson",
    category: "Corporate Travel",
    featured: false,
  },
  {
    id: 4,
    title: "Sustainability in Corporate Transportation: The Future is Green",
    excerpt:
      "Learn how luxury transportation companies are adopting sustainable practices without compromising on luxury and comfort.",
    image: "/placeholder.svg?height=600&width=800",
    date: "December 12, 2022",
    author: "Sarah Johnson",
    category: "Industry News",
    featured: false,
  },
  {
    id: 5,
    title: "Executive Travel Safety: What You Need to Know",
    excerpt: "Essential safety considerations and protocols for executive transportation in today's changing world.",
    image: "/placeholder.svg?height=600&width=800",
    date: "November 5, 2022",
    author: "Robert Williams",
    category: "Business Tips",
    featured: false,
  },
  {
    id: 6,
    title: "Maximizing Productivity During Corporate Travel",
    excerpt: "Tips and strategies for making the most of your time while on the move for business purposes.",
    image: "/placeholder.svg?height=600&width=800",
    date: "October 18, 2022",
    author: "Jennifer Adams",
    category: "Business Tips",
    featured: false,
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find((post) => post.featured)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=800&width=1600" alt="Blog" fill className="object-cover brightness-50" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              Insights and updates from the world of luxury corporate transportation
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
                      src={featuredPost.image || "/placeholder.svg"}
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
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <User className="h-4 w-4 mr-1" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        <span>{featuredPost.category}</span>
                      </div>
                    </div>
                    <Button asChild className="mt-auto bg-gold hover:bg-gold-light text-black self-start">
                      <Link href={`/blog/${featuredPost.id}`}>
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
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
              >
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-xs mb-3">
                    <div className="flex items-center mr-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                    <Link href={`/blog/${post.id}`}>Read Article</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
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
