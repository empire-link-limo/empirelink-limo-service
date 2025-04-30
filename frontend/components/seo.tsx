"use client"

import Head from "next/head"
import { getStrapiMedia } from "@/lib/api"
import { SeoProps } from "@/lib/types"

export default function Seo({ seo }: SeoProps) {
  // Default values for SEO
  const defaults = {
    metaTitle: "Empirelink Limo Service | Premium Corporate Transportation",
    metaDescription: "Luxury limousine and chauffeur services for corporate clients. Experience elegance, reliability, and professionalism.",
    shareImage: null,
    metaRobots: undefined,
    keywords: undefined,
  };

  // Use defaults if no SEO data
  const fullSeo = {
    ...defaults,
    ...seo,
  };

  // Get image URL
  const imageUrl = fullSeo.shareImage ? getStrapiMedia(fullSeo.shareImage) : null;
  
  // Default image size (if available)
  const imageWidth = fullSeo.shareImage?.width || 1200;
  const imageHeight = fullSeo.shareImage?.height || 630;

  return (
    <Head>
      <title>{fullSeo.metaTitle}</title>
      <meta name="description" content={fullSeo.metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {fullSeo.metaRobots && (
        <meta name="robots" content={fullSeo.metaRobots} />
      )}
      
      {fullSeo.keywords && (
        <meta name="keywords" content={fullSeo.keywords} />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullSeo.metaTitle} />
      <meta property="og:description" content={fullSeo.metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ''} />
      
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:width" content={imageWidth.toString()} />
          <meta property="og:image:height" content={imageHeight.toString()} />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullSeo.metaTitle} />
      <meta name="twitter:description" content={fullSeo.metaDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Head>
  )
}