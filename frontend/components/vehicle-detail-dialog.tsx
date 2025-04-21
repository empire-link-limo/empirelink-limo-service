// components/vehicle-detail-dialog.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { Users, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StrapiMedia from "@/components/strapi-image";

// Define TypeScript interfaces for our props and data structures
interface MediaItem {
  id?: number;
  attributes?: {
    url: string;
    width?: number;
    height?: number;
    alternativeText?: string;
    formats?: Record<string, any>;
  };
  url?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
}

interface Feature {
  id?: number;
  text: string;
}

interface Vehicle {
  id: number;
  name: string;
  description: string;
  capacity: string;
  features: Feature[];
  gallery: {
    data: MediaItem[];
  };
  [key: string]: any;
}

interface VehicleDetailDialogProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export default function VehicleDetailDialog({ vehicle, isOpen, onClose }: VehicleDetailDialogProps) {
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(
    vehicle?.gallery?.data?.[0] || null
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{vehicle?.name}</DialogTitle>
          <DialogDescription className="text-gray-400">{vehicle?.description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative h-80 mb-4">
            <StrapiMedia
              data={selectedImage}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {vehicle?.gallery?.data?.map((img: MediaItem, i: number) => (
              <div
                key={i}
                className="relative h-20 w-32 flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden"
                onClick={() => setSelectedImage(img)}
              >
                <StrapiMedia
                  data={img}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center">
                <Users className="h-5 w-5 text-gold mr-2" />
                Capacity
              </h4>
              <p className="text-gray-300 mb-4">{vehicle?.capacity}</p>

              <h4 className="text-lg font-bold mb-3 flex items-center">
                <Award className="h-5 w-5 text-gold mr-2" />
                Premium Features
              </h4>
              <ul className="space-y-2">
                {vehicle?.features?.map((feature: Feature, i: number) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-gold mr-2 mt-0.5" />
                    <span className="text-gray-300">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <h4 className="text-lg font-bold mb-4">Book This Vehicle</h4>
              <p className="text-gray-300 mb-4">
                This premium vehicle is perfect for executive travel and corporate events.
              </p>
              <Button asChild className="w-full bg-gold hover:bg-gold-light text-black">
                <Link href="/booking">Book Now</Link>
              </Button>
              <p className="text-sm text-gray-400 mt-4 text-center">
                Or call us at{" "}
                <a href="tel:+1234567890" className="text-gold hover:underline">
                  +1 (234) 567-8900
                </a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}