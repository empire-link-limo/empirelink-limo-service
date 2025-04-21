// app/services/page.tsx
import { getServices, getSiteSettings } from '@/lib/api';
import StrapiMedia from '@/components/strapi-image';
import SEO from '@/components/seo';
import Link from "next/link";
import { Award, Clock, Shield, Briefcase, Plane, Calendar, MapPin, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JSX } from 'react';

// Define the types for our data
interface Feature {
  id?: number;
  text: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  slug: string;
  features: Feature[];
  image: {
    data: any;
  };
}

export const revalidate = 3600; // Revalidate this page every hour

export default async function ServicesPage() {
  // Fetch data from Strapi
  const services = await getServices() as Service[];
  const siteSettings = await getSiteSettings();

  // Map for icon components with proper typing
  const iconMap: Record<string, JSX.Element> = {
    Briefcase: <Briefcase className="h-12 w-12 text-gold" />,
    Plane: <Plane className="h-12 w-12 text-gold" />,
    Calendar: <Calendar className="h-12 w-12 text-gold" />,
    MapPin: <MapPin className="h-12 w-12 text-gold" />,
    Clock: <Clock className="h-12 w-12 text-gold" />,
    Shield: <Shield className="h-12 w-12 text-gold" />,
    Award: <Award className="h-12 w-12 text-gold" />,
    Users: <Users className="h-12 w-12 text-gold" />,
    // Add more mappings as needed
  };

  return (
    <div className="pt-20">
      {/* Add SEO */}
      <SEO 
        seo={{ 
          metaTitle: "Our Services | Empire Link Limo",
          metaDescription: "Comprehensive transportation solutions tailored to your corporate needs."
        }} 
        defaultSeo={siteSettings.defaultSeo} 
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <StrapiMedia
            data={{url: "/placeholder.svg?height=800&width=1600"}}
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Services</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive transportation solutions tailored to your corporate needs
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} id={service.slug} className="scroll-mt-24">
                <div
                  className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
                >
                  <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                    <div className="flex items-center mb-4">
                      {service.icon && iconMap[service.icon] ? iconMap[service.icon] : <Briefcase className="h-12 w-12 text-gold" />}
                      <h2 className="text-2xl md:text-3xl font-bold ml-4">{service.title}</h2>
                    </div>
                    <div className="h-1 w-20 bg-gold mb-6"></div>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features?.map((feature: Feature, i: number) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                          <span className="text-gray-300">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="bg-gold hover:bg-gold-light text-black">
                      <Link href="/booking">Book This Service</Link>
                    </Button>
                  </div>
                  <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                      <StrapiMedia
                        data={service.image?.data}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-black rounded-lg border border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Elevate Your Corporate Transportation?</h2>
                <p className="text-gray-300 mb-6">
                  Contact us today to discuss your transportation needs and discover how we can tailor our services to
                  your requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-gold hover:bg-gold-light text-black">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white hover:bg-white/10">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <StrapiMedia
                  data={{url: "/placeholder.svg?height=600&width=800"}}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}