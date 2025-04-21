// app/fleet/page.tsx
import { getVehicles, getSiteSettings } from '@/lib/api';
import StrapiMedia from '@/components/strapi-image';
import SEO from '@/components/seo';
import Link from "next/link";
import { Users, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const revalidate = 3600; // Revalidate this page every hour

export default async function FleetPage() {
  // Fetch data from Strapi
  const vehicles = await getVehicles();
  const siteSettings = await getSiteSettings();

  return (
    <div className="pt-20">
      {/* Add SEO */}
      <SEO 
        seo={{ 
          metaTitle: "Our Luxury Fleet | Empire Link Limo",
          metaDescription: "Explore our collection of premium vehicles, each maintained to the highest standards of luxury and comfort."
        }} 
        defaultSeo={siteSettings.defaultSeo} 
      />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Luxury Fleet</h1>
          <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our collection of premium vehicles, each maintained to the highest standards of luxury and comfort
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 vehicle-card"
            >
              <div className="relative h-64">
                <StrapiMedia
                  data={vehicle.gallery?.data?.[0] || null}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <div className="flex items-center text-gold mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{vehicle.capacity}</span>
                </div>
                <p className="text-gray-400 mb-6">{vehicle.description}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 border-gold text-gold hover:bg-gold/10"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <Button asChild className="flex-1 bg-gold hover:bg-gold-light text-black">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* This would need to be client-side code for the Dialog functionality */}
      {/* You'll need to create a separate client component for this */}
    </div>
  );
}