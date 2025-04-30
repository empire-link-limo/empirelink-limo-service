"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ClientCTASectionProps {
  title: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  imageUrl: string;
}

export function ClientCTASection({
  title,
  description = "Contact us today to discuss your transportation needs and discover how we can tailor our services to your requirements.",
  primaryButtonText = "Book Now",
  primaryButtonUrl = "/booking",
  secondaryButtonText = "Contact Us",
  secondaryButtonUrl = "/contact",
  imageUrl
}: ClientCTASectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-black rounded-lg border border-gray-800 p-8 md:p-12"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
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
        </div>
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Luxury transportation"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  )
}