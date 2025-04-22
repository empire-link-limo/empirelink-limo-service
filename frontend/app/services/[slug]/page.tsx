// app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getService, getAllServices } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/api";
import Seo from "@/components/seo";
import { ServiceData } from "../page";

export async function generateStaticParams() {
  const services = await getAllServices() as ServiceData[];
  
  return services.map((service) => ({
    slug: service.attributes.slug,
  }));
}

export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = await getService(slug) as ServiceData;
  
  if (!service) {
    return notFound();
  }
  
  const serviceData = service.attributes;
  const imageUrl = serviceData.image?.data ? 
    getStrapiMedia(serviceData.image) : 
    "/placeholder.svg?height=800&width=1200";
  
  return (
    <div className="pt-20">
      {/* SEO */}
      {serviceData.seo && (
        <Seo seo={{
          metaTitle: serviceData.seo.metaTitle || `${serviceData.title} | Empirelink Limo Services`,
          metaDescription: serviceData.seo.metaDescription || serviceData.description,
          shareImage: serviceData.seo.metaImage || serviceData.image,
        }} />
      )}
      
      <div className="container mx-auto px-4 py-12">
        <Link href="/services" className="inline-flex items-center text-gold hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{serviceData.title}</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            
            <p className="text-gray-300 text-lg mb-8">{serviceData.description}</p>
            
            <h2 className="text-xl font-bold mb-4">Service Features</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {serviceData.features?.data?.map((feature) => (
                <div key={feature.id} className="flex items-start">
                  <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                  <span className="text-gray-300">{feature.attributes.name}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-8">
              <h3 className="text-xl font-bold mb-4">Book This Service</h3>
              <p className="text-gray-300 mb-6">
                Experience our premium {serviceData.title} service with professionally trained chauffeurs 
                and meticulously maintained luxury vehicles.
              </p>
              <Button asChild className="w-full bg-gold hover:bg-gold-light text-black">
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>
            
            <div className="flex space-x-4">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/services">View Other Services</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 border-gold text-gold hover:bg-gold/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          
          <div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
              <Image
                src={imageUrl}
                alt={serviceData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="h-5 w-5 text-gold mr-2" />
                Why Choose Our {serviceData.title}
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                  <span>Professional, experienced chauffeurs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                  <span>Premium, meticulously maintained vehicles</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                  <span>Punctual service with real-time tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                  <span>Personalized attention to detail</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}