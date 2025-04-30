// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { SplashScreen } from "@/components/splash-screen"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingActionButtons } from "@/components/FloatingActionButtons"
import { ThemeProvider } from "@/components/theme-provider"
import GoogleAnalytics from "@/components/google-analytics"
import { getGlobalData } from "@/lib/strapi"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Luxury Limo Service | Corporate Transportation",
  description:
    "Premium limousine and chauffeur services for corporate clients. Experience luxury, reliability, and professionalism.",
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch global data from Strapi
  const globalData = await getGlobalData().catch(error => {
    console.error("Failed to fetch global data:", error);
    return undefined;
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Note: Google Analytics remains on the client side */}
        <GoogleAnalytics id={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-black text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SplashScreen />
          <div className="flex min-h-screen flex-col">
            <Header global={globalData} />
            <main className="flex-1">{children}</main>
            <Footer global={globalData} />
            <FloatingActionButtons global={globalData} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}