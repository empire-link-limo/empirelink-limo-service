// lib/strapi.ts
import { fetchAPI } from "./api";
import {
  ContactPageData,
  GlobalData,
  BookingPageData,
  VehicleData,
  ServiceData,
  BlogPostData,
  BlogPostsResponse,
  CategoryData,
  TeamMemberData,
  GalleryImageData,
  TestimonialData,
  HomepageData,
  AboutPageData,
  FleetPageData,
  ServicesPageData,
  BlogPageData,
  GalleryPageData
} from "./types";

// Global data
export async function getGlobalData(): Promise<GlobalData> {
  const globalRes = await fetchAPI("/global", {
    populate: ["socialLinks", "logo"],
  });
  return globalRes.data;
}

// Homepage data
export async function getHomepage(): Promise<HomepageData> {
  const homepageRes = await fetchAPI("/homepage", {
    populate: {
      HeroSection: {
        populate: {
          backgroundImage: {
            fields: ["url", "width", "height", "alternativeText", "mime"]
          },
          desktopBackgroundImage: {
            fields: ["url", "width", "height", "alternativeText", "mime"]
          }
        }
      },
      FleetSection: true,
      ServicesSection: true,
      TestimonialsSection: true,
      CTASection: {
        populate: ["backgroundImage"],
      },
      SEO: {
        populate: ["metaImage"],
      },
    },
  });
  return homepageRes.data;
}

// SEO Settings
export async function getSeoSettings() {
  const seoRes = await fetchAPI("/seo-setting", {
    populate: ["defaultImage"],
  });
  return seoRes.data;
}

// Vehicles
export async function getAllVehicles(): Promise<VehicleData[]> {
  const vehiclesRes = await fetchAPI("/vehicles", {
    populate: ["image", "features", "gallery"],
    sort: "name:asc",
  });
  return vehiclesRes.data;
}

// Get featured vehicles
export async function getFeaturedVehicles(limit: number = 5): Promise<VehicleData[]> {
  const vehiclesRes = await fetchAPI("/vehicles", {
    filters: {
      featured: true,
    },
    populate: ["image", "features", "gallery"],
    sort: "name:asc",
    pagination: {
      pageSize: limit,
    },
  });
  return vehiclesRes.data;
}

export async function getVehicle(slug: string): Promise<VehicleData | null> {
  const vehiclesRes = await fetchAPI("/vehicles", {
    filters: {
      slug:  slug,
    },
    populate: ["image", "features", "gallery", "seo.metaImage"],
  });
  
  return vehiclesRes.data.length > 0 ? vehiclesRes.data[0] : null;
}

// Services
export async function getAllServices(): Promise<ServiceData[]> {
  const servicesRes = await fetchAPI("/services", {
    populate: ["image", "features"],
    sort: "title:asc",
  });
  return servicesRes.data;
}

// Get featured services
export async function getFeaturedServices(limit: number = 3): Promise<ServiceData[]> {
  const servicesRes = await fetchAPI("/services", {
    filters: {
      featured: true,
    },
    populate: ["image", "features"],
    sort: "title:asc",
    pagination: {
      pageSize: limit,
    },
  });
  return servicesRes.data;
}

export async function getService(slug: string): Promise<ServiceData | null> {
  const servicesRes = await fetchAPI("/services", {
    filters: {
      slug: slug,
    },
    populate: ["image", "features", "seo.metaImage"],
  });
  
  return servicesRes.data.length > 0 ? servicesRes.data[0] : null;
}

// Testimonials
export async function getTestimonials(): Promise<TestimonialData[]> {
  const testimonialsRes = await fetchAPI("/testimonials", {
    populate: ["image"],
  });
  return testimonialsRes.data;
}

// Team Members
export async function getTeamMembers(): Promise<TeamMemberData[]> {
  const teamRes = await fetchAPI("/team-members", {
    populate: ["image"],
    sort: "name:asc",
  });
  return teamRes.data;
}

// Blog Posts
export async function getAllPosts(pageSize: number = 10, page: number = 1): Promise<BlogPostsResponse> {
  const postsRes = await fetchAPI("/blog-posts", {
    populate: ["image", "categories"],
    sort: "published:desc",
    pagination: {
      page,
      pageSize,
    },
  });
  return postsRes;
}

export async function getPostBySlug(slug: string): Promise<BlogPostData | null> {
  try {
    if (!slug || typeof slug !== 'string') {
      console.error(`Invalid slug provided: ${slug}`);
      return null;
    }
    
    const data = await fetchAPI("/blog-posts", {
      filters: {
        slug: slug,
      },
      populate: "*", // Use full population for debugging
    });
    
    if (!data || !data.data || data.data.length === 0) {
      console.log(`No post found with slug: ${slug}`);
      return null;
    }
    
    const post = data.data[0];
    return post;
  } catch (error) {
    console.error(`Error fetching post with slug: ${slug}`, error);
    return null;
  }
}

// Categories
export async function getCategories(): Promise<CategoryData[]> {
  const categoriesRes = await fetchAPI("/categories", {
    sort: "name:asc",
  });
  return categoriesRes.data;
}

// Gallery Images
export async function getGalleryImages(): Promise<GalleryImageData[]> {
  const galleryRes = await fetchAPI("/gallery-images", {
    populate: ["image", "categories"],
  });
  return galleryRes.data;
}

// Page data functions
export async function getAboutPage(): Promise<AboutPageData> {
  const aboutRes = await fetchAPI("/about-page", {
    populate: {
      HeroSection: {
        populate: ["backgroundImage"],
      },
      StorySection: {
        populate: ["image"],
      },
      ValuesSection: {
        populate: ["valueItems"],
      },
      TeamSection: {
        populate: ["team_members.image"],
      },
      CTASection: {
        populate: ["backgroundImage"],
      },
      SEO: {
        populate: ["metaImage"],
      },
    },
  });
  return aboutRes.data;
}

export async function getFleetPage(): Promise<FleetPageData> {
  const fleetRes = await fetchAPI("/fleet-page", {
    populate: {
      HeroSection: {
        populate: ["backgroundImage"],
      },
      FleetSettings: {
        populate: ["featuredVehicles.image", "featuredVehicles.features"],
      },
      SEO: {
        populate: ["metaImage"],
      },
    },
  });
  return fleetRes.data;
}

export async function getServicesPage(): Promise<ServicesPageData> {
  const servicesRes = await fetchAPI("/services-page", {
    populate: {
      HeroSection: {
        populate: ["backgroundImage"],
      },
      WhyChooseUsSection: {
        populate: ["benefit"],
      },
      CTASection: {
        populate: ["backgroundImage"],
      },
      SEO: {
        populate: ["metaImage"],
      },
    },
  });
  return servicesRes.data;
}

export async function getBlogPage(): Promise<BlogPageData> {
  const blogRes = await fetchAPI("/blog-page", {
    populate: {
      HeroSection: {
        populate: ["backgroundImage"],
      },
      BlogSettings: true,
      NewsletterSection: {
        populate: ["image"],
      },
      SEO: {
        populate: ["metaImage"],
      },
    },
  });
  return blogRes.data;
}

export async function getContactPage(): Promise<ContactPageData> {
  const contactPageRes = await fetchAPI("/contact-page", {
    populate: {
      HeroSection: {
        populate: ["backgroundImage"],
      },
      FormSection: true,
      MapSection: true,
      SEO: {
        populate: ["metaImage"],
      },
    },
  });
  return contactPageRes.data;
}

export async function getGalleryPage(): Promise<GalleryPageData> {
  const galleryRes = await fetchAPI("/gallery-page", {
    populate: {
      HeroSection: {
        populate: ["backgroundImage"],
      },
      GallerySettings: true,
      SEO: {
        populate: ["metaImage"],
      },
    },
  });
  return galleryRes.data;
}

export async function getBookingPage(): Promise<BookingPageData> {
  const bookingPageRes = await fetchAPI("/booking-page", {
    populate: ["ContactInfo", "SEO.metaImage"],
  });
  return bookingPageRes.data;
}