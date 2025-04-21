// components/footer.tsx
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import StrapiMedia from "@/components/strapi-image";

// Define the Site Settings type
interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  logo?: {
    data: any;
  };
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  defaultSeo: any;
}

export function Footer({ siteSettings }: { siteSettings: SiteSettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            {siteSettings?.logo?.data ? (
              <div className="h-12 w-48 relative mb-4">
                <StrapiMedia
                  data={siteSettings.logo.data}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <h3 className="text-xl font-playfair font-bold mb-4">
                <span className="gold-gradient">{siteSettings?.companyName || "Empire Link"}</span> Limo
              </h3>
            )}
            <p className="text-gray-400 mb-4">
              Premium limousine and chauffeur services for discerning corporate clients.
            </p>
            <div className="flex space-x-4">
              {siteSettings?.facebookUrl && (
                <a href={siteSettings.facebookUrl} className="text-gray-400 hover:text-gold transition-colors">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {siteSettings?.instagramUrl && (
                <a href={siteSettings.instagramUrl} className="text-gray-400 hover:text-gold transition-colors">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {siteSettings?.twitterUrl && (
                <a href={siteSettings.twitterUrl} className="text-gray-400 hover:text-gold transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
              {siteSettings?.linkedinUrl && (
                <a href={siteSettings.linkedinUrl} className="text-gray-400 hover:text-gold transition-colors">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
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
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              {siteSettings?.phone && (
                <li className="flex items-start">
                  <Phone size={20} className="text-gold mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">{siteSettings.phone}</span>
                </li>
              )}
              {siteSettings?.email && (
                <li className="flex items-start">
                  <Mail size={20} className="text-gold mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">{siteSettings.email}</span>
                </li>
              )}
              {siteSettings?.address && (
                <li className="flex items-start">
                  <MapPin size={20} className="text-gold mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">
                    {siteSettings.address.split('\n').map((line: string, i: number) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </span>
                </li>
              )}
            </ul>
            <Button asChild className="mt-4 bg-gold hover:bg-gold-light text-black">
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} {siteSettings?.companyName || "Luxury Limo Service"}. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}