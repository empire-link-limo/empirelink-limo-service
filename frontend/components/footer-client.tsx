"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { FooterClientProps } from "@/lib/types"

export function FooterClient({
  services,
  companyName,
  description,
  phone,
  email,
  address,
  logo,
  footerText,
  socialLinks
}: FooterClientProps) {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            {logo && (
              <div className="mb-4">
                <Image 
                  src={logo} 
                  alt={companyName} 
                  width={200}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-playfair font-bold mb-4">
              <span className="gold-gradient">{companyName}</span>
            </h3>
            <p className="text-gray-400 mb-4">
              {description}
            </p>
            <div className="flex space-x-4">
              {socialLinks && socialLinks.length > 0 ? (
                socialLinks.map((social, idx) => {
                  let SocialIcon;
                  switch (social.platform.toLowerCase()) {
                    case 'facebook': SocialIcon = FaFacebookF; break;
                    case 'instagram': SocialIcon = FaInstagram; break;
                    case 'x': SocialIcon = FaXTwitter; break;
                    case 'linkedin': SocialIcon = FaLinkedinIn; break;
                    default: SocialIcon = FaFacebookF;
                  }
                  
                  return (
                    <a 
                      key={idx} 
                      href={social.url} 
                      className="text-gray-400 hover:text-gold transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon size={20} />
                      <span className="sr-only">{social.platform}</span>
                    </a>
                  );
                })
              ) : (
                <>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                    <FaFacebookF size={20} />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                    <FaInstagram size={20} />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                    <FaXTwitter size={20} />
                    <span className="sr-only">X</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                    <FaLinkedinIn size={20} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-gray-400 hover:text-gold transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {services && services.length > 0 ? (
                // Actual services
                services.map((service) => (
                  <li key={service.id}>
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="text-gray-400 hover:text-gold transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback if no services found
                <>
                  <li>
                    <Link href="/services#corporate" className="text-gray-400 hover:text-gold transition-colors">
                      Corporate Transportation
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#airport" className="text-gray-400 hover:text-gold transition-colors">
                      Airport Transfers
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#events" className="text-gray-400 hover:text-gold transition-colors">
                      Corporate Events
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#roadshows" className="text-gray-400 hover:text-gold transition-colors">
                      Roadshows
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#hourly" className="text-gray-400 hover:text-gold transition-colors">
                      Hourly Charters
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={20} className="text-gold mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{phone}</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="text-gold mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{email}</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="text-gold mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400 whitespace-pre-line">{address}</span>
              </li>
            </ul>
            <Button asChild className="mt-4 bg-gold hover:bg-gold-light text-black">
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p dangerouslySetInnerHTML={{ __html: footerText }} />
          <div className="mt-2 space-x-4">
            <span>Website created by{" "}
              <Link href="https://bilal1203.github.io/" className="hover:text-gold transition-colors">
                Ahmad Bilal
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}