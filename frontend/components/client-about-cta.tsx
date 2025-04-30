"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ClientAboutCTAProps } from "@/lib/types"

export function ClientAboutCTA({
  title = "Ready to Experience the Difference?",
  description = "Join our growing list of satisfied corporate clients and discover why Luxury Limo is the preferred choice for executive transportation.",
  primaryButtonText = "Book Now",
  primaryButtonUrl = "/booking",
  secondaryButtonText = "Contact Us",
  secondaryButtonUrl = "/contact"
}: ClientAboutCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-300 mb-6">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-gold hover:bg-gold-light text-black">
          <Link href={primaryButtonUrl}>
            {primaryButtonText}
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-white hover:bg-white/10">
          <Link href={secondaryButtonUrl}>
            {secondaryButtonText}
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}