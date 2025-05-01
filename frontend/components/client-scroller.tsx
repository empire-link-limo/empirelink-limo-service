"use client"

import { useRef } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { ClientScrollerProps } from "@/lib/types"

export function ClientScroller({ children }: ClientScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative overflow-hidden">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 md:left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 py-4 px-2 horizontal-scroll">
        {children}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 md:right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}