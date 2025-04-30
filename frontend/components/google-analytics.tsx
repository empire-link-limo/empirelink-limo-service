'use client'

import Script from "next/script"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

type GoogleAnalyticsProps = {
  id?: string
}

/**
 * Google Analytics component for Next.js applications
 * - Loads Google Analytics scripts
 * - Tracks page views on route changes
 * - Supports GA4
 */
export default function GoogleAnalytics({ id }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only run if GA ID exists and we're in the browser
    if (!id || typeof window === 'undefined') return

    // Track page views when the route changes in SPA navigation
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // Send pageview with the new URL
    window.gtag?.('config', id, {
      page_path: url,
    })
  }, [id, pathname, searchParams])

  // Don't render anything if ID is missing
  if (!id) return null
  
  return (
    <>
      {/* Load the GA script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      
      {/* Initialize GA */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname + window.location.search,
          });
        `}
      </Script>
    </>
  )
}