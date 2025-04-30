"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryData } from "@/lib/types"
import { motion } from "framer-motion"

interface ClientBlogFiltersProps {
  categories: CategoryData[];
}

export function ClientBlogFilters({ categories }: ClientBlogFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  
  // We're using URL-based filtering instead of component state
  // to ensure server and client states are in sync
  const updateFilters = (category: string, query: string) => {
    // Update the URL with search params
    const params = new URLSearchParams(window.location.search)
    
    if (category && category !== "All") {
      params.set("category", category)
    } else {
      params.delete("category")
    }
    
    if (query) {
      params.set("search", query)
    } else {
      params.delete("search")
    }
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    window.history.pushState({}, '', newUrl)
    
    // Update local state for UI
    setSelectedCategory(category)
    setSearchQuery(query)
    
    // Dispatch custom event for the posts component to listen for
    window.dispatchEvent(new CustomEvent('blog-filters-changed', { 
      detail: { category, search: query }
    }))
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search articles..."
            className="bg-gray-900 border-gray-800"
            value={searchQuery}
            onChange={(e) => updateFilters(selectedCategory, e.target.value)}
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
            onClick={() => updateFilters("All", searchQuery)}
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
              onClick={() => updateFilters(category.name, searchQuery)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}