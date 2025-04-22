// app/fleet/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVehicle, getAllVehicles } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/api";
import Seo from "@/components/seo";
import { VehicleData } from "../page";

export async function generateStaticParams() {
  const vehicles = await getAllVehicles() as VehicleData[];
  
  return vehicles.map((vehicle) => ({
    slug: vehicle.attributes.slug,
  }));
}

export default async function VehicleDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const vehicle = await getVehicle(slug) as VehicleData;
  
  if (!vehicle) {
    return notFound();
  }
  
  const vehicleData = vehicle.attributes;
  const imageUrl = vehicleData.image?.data ? 
    getStrapiMedia(vehicleData.image) : 
    "/placeholder.svg?height=800&width=1200";
  
  const galleryImages = vehicleData.gallery?.data ? 
    vehicleData.gallery.data.map(img => ({
      id: img.id,
      url: getStrapiMedia({ data: { attributes: { url: img.attributes.url } } })
    })) : [];
  
  return (
    <div className="pt-20">
      {/* SEO */}
      {vehicleData.seo && (
        <Seo seo={{
          metaTitle: vehicleData.seo.metaTitle || `${vehicleData.name} | Empirelink Limo Fleet`,
          metaDescription: vehicleData.seo.metaDescription || vehicleData.description,
          shareImage: vehicleData.seo.metaImage || vehicleData.image,
        }} />
      )}
      
      <div className="container mx-auto px-4 py-12">
        <Link href="/fleet" className="inline-flex items-center text-gold hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Fleet
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
              <Image
                src={imageUrl}
                alt={vehicleData.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img) => (
                  <div key={img.id} className="relative aspect-square rounded overflow-hidden">
                    <Image
                      src={img.url}
                      alt={`${vehicleData.name} view`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{vehicleData.name}</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            
            <div className="flex items-center text-gold mb-6">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-lg">{vehicleData.capacity}</span>
            </div>
            
            <p className="text-gray-300 text-lg mb-8">{vehicleData.description}</p>
            
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Award className="h-5 w-5 text-gold mr-2" />
              Premium Features
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {vehicleData.features?.data?.map((feature) => (
                <div key={feature.id} className="flex items-start">
                  <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                  <span className="text-gray-300">{feature.attributes.name}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-8">
              <h3 className="text-xl font-bold mb-4">Reserve This Vehicle</h3>
              <p className="text-gray-300 mb-6">
                Experience unparalleled luxury and comfort with our {vehicleData.name}. Perfect for corporate events, 
                airport transfers, and special occasions.
              </p>
              <Button asChild className="w-full bg-gold hover:bg-gold-light text-black">
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>
            
            <div className="flex space-x-4">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/fleet">View Other Vehicles</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 border-gold text-gold hover:bg-gold/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}