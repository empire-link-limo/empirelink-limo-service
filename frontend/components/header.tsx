// components/header.tsx (Server Component)
import { getStrapiMedia } from "@/lib/api"
import { GlobalData } from "@/lib/types"
import { HeaderClient } from "./header-client"

export function Header({ global }: { global?: GlobalData }) {
  // Get the logo URL if it exists
  const logoUrl = global?.logo ? getStrapiMedia(global.logo) : null
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/fleet", label: "Fleet" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <HeaderClient 
      logoUrl={logoUrl} 
      companyName={global?.companyName || "Empire Link"} 
      navLinks={navLinks}
      phone={global?.phone}
    />
  )
}