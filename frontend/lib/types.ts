// lib/types.ts

// Common Strapi image type
export interface StrapiImage {
    data?: {
      id: number;
      attributes: {
        url: string;
        width?: number;
        height?: number;
        alternativeText?: string;
      };
    } | null;
  }
  
  // SEO type used across different content types
  export interface SEO {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: StrapiImage;
    metaRobots?: string;
    keywords?: string;
  }
  
  // Hero section - base interface
  export interface BaseHeroSection {
    title: string;
    description: string;
    backgroundImage?: StrapiImage;
  }
  
  // Home page specifics
  export interface HomeHeroSection extends BaseHeroSection {
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
  }
  
  export interface FleetSection {
    title: string;
    description: string;
  }
  
  export interface ServicesSection {
    title: string;
    description: string;
  }
  
  export interface TestimonialsSection {
    title: string;
    description: string;
  }
  
  export interface CTASection {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    image?: StrapiImage;
    backgroundImage?: StrapiImage;
  }
  
  export interface HomepageData {
    id: number;
    attributes: {
      hero?: HomeHeroSection;
      fleetSection?: FleetSection;
      servicesSection?: ServicesSection;
      testimonialsSection?: TestimonialsSection;
      ctaSection?: CTASection;
      seo?: SEO;
    };
  }
  
  // About page specifics
  export interface StorySection {
    title: string;
    content: string;
    image?: StrapiImage;
  }
  
  export interface ValueItem {
    icon: string;
    title: string;
    description: string;
  }
  
  export interface ValuesSection {
    title: string;
    description: string;
    values: {
      data: Array<{
        id: number;
        attributes: ValueItem;
      }>;
    };
  }
  
  export interface TeamSection {
    title: string;
    description: string;
  }
  
  export interface AboutPageData {
    id: number;
    attributes: {
      hero?: BaseHeroSection;
      storySection?: StorySection;
      valuesSection?: ValuesSection;
      teamSection?: TeamSection;
      ctaSection?: CTASection;
      seo?: SEO;
      values?: {
        data: Array<{
          id: number;
          attributes: ValueItem;
        }>;
      };
    };
  }
  
  // Team member
  export interface TeamMemberData {
    id: number;
    attributes: {
      name: string;
      position: string;
      bio: string;
      image?: StrapiImage;
    };
  }
  
  // Fleet/Vehicles
  export interface Feature {
    id: number;
    attributes: {
      name: string;
    };
  }
  
  export interface VehicleData {
    id: number;
    attributes: {
      name: string;
      slug: string;
      capacity: string;
      description: string;
      image?: StrapiImage;
      gallery?: {
        data: Array<{
          id: number;
          attributes: {
            url: string;
          };
        }>;
      };
      features?: {
        data: Feature[];
      };
      seo?: SEO;
    };
  }
  
  export interface FleetPageData {
    id: number;
    attributes: {
      hero?: BaseHeroSection;
      seo?: SEO;
    };
  }
  
  // Services
  export interface ServiceData {
    id: number;
    attributes: {
      title: string;
      slug: string;
      description: string;
      icon?: string;
      image?: StrapiImage;
      features?: {
        data: Feature[];
      };
      seo?: SEO;
    };
  }
  
  export interface WhyChooseUsSection {
    title: string;
    description: string;
  }
  
  export interface ServicesPageData {
    id: number;
    attributes: {
      hero?: BaseHeroSection;
      whyChooseUsSection?: WhyChooseUsSection;
      ctaSection?: CTASection;
      seo?: SEO;
    };
  }
  
  // Blog
  export interface CategoryData {
    id: number;
    attributes: {
      name: string;
      slug: string;
    };
  }
  
  export interface BlogPostData {
    id: number;
    attributes: {
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      Published: string;
      author: string;
      featured: boolean;
      image?: StrapiImage;
      category?: {
        data: CategoryData | null;
      };
      seo?: SEO;
    };
  }
  
  export interface BlogPageData {
    id: number;
    attributes: {
      hero?: BaseHeroSection;
      seo?: SEO;
    };
  }
  
  export interface BlogPostsResponse {
    data: BlogPostData[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }
  
  // Contact page
  export interface FormSection {
    title: string;
    successMessage: string;
    notificationEmail?: string;
  }
  
  export interface MapSection {
    title: string;
    description: string;
    mapEmbedCode?: string;
    locationName?: string;
    buttonText?: string;
    buttonUrl?: string;
  }
  
  export interface ContactPageData {
    id: number;
    attributes: {
      hero?: BaseHeroSection;
      formSection?: FormSection;
      mapSection?: MapSection;
      seo?: SEO;
    };
  }
  
  // Booking page
  export interface ContactInfo {
    phone: string;
    email: string;
  }
  
  export interface BookingPageData {
    id: number;
    attributes: {
      title: string;
      description: string;
      bookingIframeUrl: string;
      contactInfo: ContactInfo;
      seo?: SEO;
    };
  }
  
  // Gallery
  export interface GalleryImageData {
    id: number;
    attributes: {
      title: string;
      description?: string;
      image?: StrapiImage;
      category?: {
        data: CategoryData | null;
      };
    };
  }
  
  export interface GalleryPageData {
    id: number;
    attributes: {
      hero?: BaseHeroSection;
      seo?: SEO;
    };
  }
  
  // Testimonials
  export interface TestimonialData {
    id: number;
    attributes: {
      name: string;
      company: string;
      quote: string;
      image?: StrapiImage;
    };
  }
  
  // Global data
  export interface SocialLink {
    id: number;
    platform: string;
    url: string;
  }
  
  export interface GlobalData {
    id: number;
    attributes: {
      companyName: string;
      phone: string;
      email: string;
      address: string;
      officeHours?: string;
      footerText?: string;
      socialLinks?: SocialLink[];
    };
  }