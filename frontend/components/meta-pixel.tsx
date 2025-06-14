// components/meta-pixel.tsx
'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    fbq: any;
  }
}

interface MetaPixelProps {
  pixelId?: string;
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);

  // Don't render anything if pixelId is not provided
  if (!pixelId) {
    console.warn('Meta Pixel ID not found. Please set NEXT_PUBLIC_META_PIXEL_ID in your environment variables.');
    return null;
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `
        }}
      />
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}