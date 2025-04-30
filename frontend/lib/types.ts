// lib/types.ts

// Common Strapi image type for Strapi 5
export interface StrapiImage {
  id: number;
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  mime?: string;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
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
  description?: string;
  backgroundImage?: StrapiImage;
}

// Home page specifics
export interface HomeHeroSection extends BaseHeroSection {
  subtitle?: string;
  desktopBackgroundImage?: StrapiImage;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export interface FleetSection {
  title: string;
  description?: string;
}

export interface ServicesSection {
  title: string;
  description?: string;
}

export interface TestimonialsSection {
  title: string;
  description?: string;
}

export interface CTASection {
  title: string;
  description?: string;
  backgroundImage?: StrapiImage;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export interface HomepageData {
  id: number;
  HeroSection?: HomeHeroSection;
  FleetSection?: FleetSection;
  ServicesSection?: ServicesSection;
  TestimonialsSection?: TestimonialsSection;
  CTASection?: CTASection;
  SEO?: SEO;
}

// About page specifics
export interface StorySection {
  title: string;
  content: string;
  image?: StrapiImage;
}

export interface ValueItem {
  id: number;
  icon: string;
  title: string;
  description?: string;
}

export interface ValuesSection {
  title: string;
  description?: string;
  valueItems?: ValueItem[];
}

export interface TeamSection {
  title: string;
  description?: string;
  team_members?: TeamMemberData[];
}

export interface AboutPageData {
  id: number;
  HeroSection?: BaseHeroSection;
  StorySection?: StorySection;
  ValuesSection?: ValuesSection;
  TeamSection?: TeamSection;
  CTASection?: CTASection;
  SEO?: SEO;
}

// Team member
export interface TeamMemberData {
  id: number;
  name: string;
  position?: string;
  bio?: string;
  image?: StrapiImage;
}

// Fleet/Vehicles
export interface Feature {
  id: number;
  name: string;
  icon?: string;
}

export interface FeatureComponent {
  id: number;
  text: string;
}

export interface VehicleData {
  id: number;
  name: string;
  slug: string;
  capacity?: string;
  description?: string;
  image?: StrapiImage;
  gallery?: StrapiImage[];
  features?: FeatureComponent[];
  featured?: boolean;
  seo?: SEO;
}

export interface FleetSettings {
  showFilters?: boolean;
  filterByCapacity?: boolean;
  filterByFeatures?: boolean;
  featuredVehicles?: VehicleData[];
} 

export interface FleetPageData {
  id: number;
  HeroSection?: BaseHeroSection;
  FleetSettings?: FleetSettings;
  SEO?: SEO;
}

export interface ServiceData {
  id: number;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: StrapiImage;
  features?: FeatureComponent[];
  featured?: boolean;
  seo?: SEO;
}

export interface BenefitItem {
  icon?: string;
  title: string;
  description?: string;
}

export interface WhyChooseUsSection {
  title: string;
  description?: string;
  benefit?: BenefitItem[];
}

export interface ServicesPageData {
  id: number;
  HeroSection?: BaseHeroSection;
  WhyChooseUsSection?: WhyChooseUsSection;
  CTASection?: CTASection;
  SEO?: SEO;
}

// Blog
export interface CategoryData {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPostData {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  published?: string;
  author?: string;
  featured?: boolean;
  image?: StrapiImage;
  categories?: CategoryData[];
  seo?: SEO;
}

export interface BlogSettings {
  postsPerPage?: number;
  showFeaturedPost?: boolean;
  enableSearchAndFilters?: boolean;
}

export interface NewsletterSection {
  title: string;
  description?: string;
  buttonText?: string;
  image?: StrapiImage;
  mailchimpEndpoint?: string;
}

export interface BlogPageData {
  id: number;
  HeroSection?: BaseHeroSection;
  BlogSettings?: BlogSettings;
  NewsletterSection?: NewsletterSection;
  SEO?: SEO;
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
  successMessage?: string;
  notificationEmail?: string;
}

export interface MapSection {
  title: string;
  description?: string;
  mapEmbedCode?: string;
  locationName?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface ContactPageData {
  id: number;
  HeroSection?: BaseHeroSection;
  FormSection?: FormSection;
  MapSection?: MapSection;
  SEO?: SEO;
}

// Booking page
export interface ContactInfo {
  phone?: string;
  email?: string;
}

export interface BookingPageData {
  id: number;
  title: string;
  description?: string;
  bookingIframeURL?: string;
  ContactInfo?: ContactInfo;
  SEO?: SEO;
}

// Gallery
export interface GallerySettings {
  showCategories?: boolean;
  enableLightbox?: boolean;
  imagesPerRow?: number;
  maxImages?: number;
}

export interface GalleryImageData {
  id: number;
  title: string;
  description?: string;
  image?: StrapiImage;
  categories?: CategoryData[];
}

export interface GalleryPageData {
  id: number;
  HeroSection?: BaseHeroSection;
  GallerySettings?: GallerySettings;
  SEO?: SEO;
}

// Testimonials
export interface TestimonialData {
  id: number;
  name: string;
  company?: string;
  quote: string;
  image?: StrapiImage;
  featured?: boolean;
}

// Global data
export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface GlobalData {
  id: number;
  companyName: string;
  logo?: StrapiImage;
  description?: string;
  phone: string;
  email: string;
  address?: string;
  officeHours?: string;
  footerText?: string;
  whatsappNumber?: string;
  socialLinks?: SocialLink[];
}

// New types for client components
// These types help define props for our client components

export interface ClientHeroProps {
  title: string;
  subtitle?: string;  // Make optional
  primaryButtonText?: string;  // Make optional
  primaryButtonUrl?: string;  // Make optional
  secondaryButtonText?: string;  // Make optional
  secondaryButtonUrl?: string;  // Make optional
  backgroundImage?: any;  // Already optional
  desktopBackgroundImage?: any;  // Already optional
}

export interface ClientScrollerProps {
  children: React.ReactNode;
}

export interface ClientAnimationProps {
  children: React.ReactNode;
  index?: number;
  animation?: "fade" | "scale" | "slide";
}

export interface HeaderClientProps {
  logoUrl: string | null;
  companyName: string;
  navLinks: NavLink[];
  phone?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface FooterClientProps {
  services: ServiceData[];
  companyName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  logo: string | null;
  footerText: string;
  socialLinks: SocialLink[];
}

export interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  backgroundImageUrl: string;
}

export interface SeoProps {
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: any;
    metaRobots?: string;
    keywords?: string;
  };
}

export interface ClientAboutCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export interface ClientBlogFiltersProps {
  categories: CategoryData[];
}

export interface ClientBlogPostsProps {
  posts: BlogPostData[];
  featuredPost: BlogPostData | null | undefined;
  categories: CategoryData[];
  postsPerPage: number;
  showFeaturedPost: boolean;
}

export interface ClientNewsletterProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export interface ClientBookingContentProps {
  bookingIframeURL?: string;
  phone?: string;
  email?: string;
}

export interface ClientContactFormProps {
  formTitle: string;
  successMessage?: string;
  notificationEmail?: string;
}

export interface ClientContactInfoProps {
  phone: string;
  email: string;
  address: string;
  hours: string;
  socialLinks: SocialLink[];
}

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  notificationEmail?: string;
}

export interface ClientMapSectionProps {
  mapEmbedCode?: string;
  locationName?: string;
  address: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface ClientVehicleGridProps {
  vehicles: VehicleData[];
}

export interface ClientGalleryViewProps {
  galleryImages: GalleryImageData[];
  categories: string[];
  gallerySettings: {
    showCategories: boolean;
    enableLightbox: boolean;
    imagesPerRow: number;
    maxImages?: number;
  };
}

export interface ClientServicesListProps {
  services: ServiceData[];
}

export interface ClientWhyChooseUsProps {
  title: string;
  description?: string;
  benefits: BenefitItem[];
}

export interface ClientCTASectionProps {
  title: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  imageUrl: string;
}