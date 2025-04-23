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
    populate: ["socialLinks"],
  });
  return globalRes.data;
}

// Homepage data
export async function getHomepage(): Promise<HomepageData> {
  const homepageRes = await fetchAPI("/homepage", {
    populate: {
      hero: {
        populate: ["backgroundImage"],
      },
      fleetSection: true,
      servicesSection: true,
      testimonialsSection: true,
      ctaSection: {
        populate: ["backgroundImage"],
      },
      seo: {
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

export async function getVehicle(slug: string): Promise<VehicleData | null> {
  const vehiclesRes = await fetchAPI("/vehicles", {
    filters: {
      slug: {
        $eq: slug,
      },
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

export async function getService(slug: string): Promise<ServiceData | null> {
  const servicesRes = await fetchAPI("/services", {
    filters: {
      slug: {
        $eq: slug,
      },
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
    populate: ["image", "category"],
    sort: "Published:desc",
    pagination: {
      page,
      pageSize,
    },
  });
  return postsRes;
}

export async function getPostBySlug(slug: string): Promise<BlogPostData | null> {
  const postsRes = await fetchAPI("/blog-posts", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ["image", "category", "author", "seo.metaImage"],
  });
  
  return postsRes.data.length > 0 ? postsRes.data[0] : null;
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
    populate: ["image", "category"],
  });
  return galleryRes.data;
}

// Page data functions
export async function getAboutPage(): Promise<AboutPageData> {
  const aboutRes = await fetchAPI("/about-page", {
    populate: {
      hero: {
        populate: ["backgroundImage"],
      },
      storySection: {
        populate: ["image"],
      },
      valuesSection: {
        populate: ["values"],
      },
      teamSection: true,
      ctaSection: {
        populate: ["image"],
      },
      seo: {
        populate: ["metaImage"],
      },
      values: {
        populate: "*",
      },
    },
  });
  return aboutRes.data;
}

export async function getFleetPage(): Promise<FleetPageData> {
  const fleetRes = await fetchAPI("/fleet-page", {
    populate: {
      hero: {
        populate: ["backgroundImage"],
      },
      seo: {
        populate: ["metaImage"],
      },
    },
  });
  return fleetRes.data;
}

export async function getServicesPage(): Promise<ServicesPageData> {
  const servicesRes = await fetchAPI("/services-page", {
    populate: {
      hero: {
        populate: ["backgroundImage"],
      },
      whyChooseUsSection: true,
      ctaSection: {
        populate: ["image"],
      },
      seo: {
        populate: ["metaImage"],
      },
    },
  });
  return servicesRes.data;
}

export async function getBlogPage(): Promise<BlogPageData> {
  const blogRes = await fetchAPI("/blog-page", {
    populate: {
      hero: {
        populate: ["backgroundImage"],
      },
      seo: {
        populate: ["metaImage"],
      },
    },
  });
  return blogRes.data;
}

export async function getContactPage(): Promise<ContactPageData> {
  const contactPageRes = await fetchAPI("/contact-page", {
    populate: {
      hero: {
        populate: ["backgroundImage"],
      },
      formSection: true,
      mapSection: true,
      seo: {
        populate: ["metaImage"],
      },
    },
  });
  return contactPageRes.data;
}

export async function getGalleryPage(): Promise<GalleryPageData> {
  const galleryRes = await fetchAPI("/gallery-page", {
    populate: {
      hero: {
        populate: ["backgroundImage"],
      },
      seo: {
        populate: ["metaImage"],
      },
    },
  });
  return galleryRes.data;
}

export async function getBookingPage(): Promise<BookingPageData> {
  const bookingPageRes = await fetchAPI("/booking-page", {
    populate: ["contactInfo", "seo.metaImage"],
  });
  return bookingPageRes.data;
}