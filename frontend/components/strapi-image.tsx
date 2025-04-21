// components/strapi-media.tsx
import Image from 'next/image';
import { getStrapiURL } from '@/lib/api';

interface MediaAttributes {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

interface StrapiMediaProps {
  data: {
    attributes?: MediaAttributes;
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  } | null;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export default function StrapiMedia({ 
  data, 
  className = '', 
  fill = false,
  priority = false,
  sizes = '100vw'
}: StrapiMediaProps) {
  if (!data) {
    return (
      <div className={`bg-gray-200 ${className}`} style={{ width: '100%', height: '100%' }} />
    );
  }
  
  const imageAttributes = data.attributes || data;
  const imageUrl = getStrapiURL(imageAttributes.url || '');
  const alt = imageAttributes.alternativeText || '';
  
  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        className={className}
        fill
        sizes={sizes}
        priority={priority}
      />
    );
  }
  
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={imageAttributes.width || 1000}
      height={imageAttributes.height || 1000}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}