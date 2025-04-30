"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStrapiMedia } from "@/lib/api"
import { ClientHeroProps } from "@/lib/types"

export function ClientHero(props: ClientHeroProps) {
  const {
    title,
    subtitle,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    backgroundImage,
    desktopBackgroundImage
  } = props;
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {backgroundImage?.url && (
          <>
            {backgroundImage.mime?.startsWith('video/') ? (
              <>
                <video
                  src={getStrapiMedia(backgroundImage)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="object-cover w-full h-full md:hidden"
                />
                
                {desktopBackgroundImage?.url && desktopBackgroundImage.mime?.startsWith('video/') ? (
                  <video
                    src={getStrapiMedia(desktopBackgroundImage)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hidden md:block object-cover w-full h-full"
                  />
                ) : (
                  <video
                    src={getStrapiMedia(backgroundImage)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hidden md:block object-cover w-full h-full"
                  />
                )}
              </>
            ) : (
              <>
                <Image
                  src={getStrapiMedia(backgroundImage) || "/placeholder.svg?height=1080&width=1920"}
                  alt="Luxury limousine"
                  fill
                  className="object-cover md:hidden"
                  priority
                />
                
                {desktopBackgroundImage?.url ? (
                  <Image
                    src={getStrapiMedia(desktopBackgroundImage) || "/placeholder.svg?height=1080&width=1920"}
                    alt="Luxury limousine"
                    fill
                    className="hidden md:block object-cover"
                    priority
                  />
                ) : (
                  <Image
                    src={getStrapiMedia(backgroundImage) || "/placeholder.svg?height=1080&width=1920"}
                    alt="Luxury limousine"
                    fill
                    className="hidden md:block object-cover"
                    priority
                  />
                )}
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/60 to-black/80"></div>
          </>
        )}
      </div>
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black text-lg">
              <Link href={primaryButtonUrl || "/booking"}>
                {primaryButtonText || "Book Now"}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10 text-lg">
              <Link href={secondaryButtonUrl || "/fleet"}>
                {secondaryButtonText || "Explore Fleet"}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronRight className="h-10 w-10 text-gold rotate-90" />
      </motion.div>
    </section>
  );
}