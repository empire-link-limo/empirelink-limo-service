// lib/api.ts

// Types for Strapi responses

interface BlogPostFilters {
  page?: number;
  pageSize?: number;
  category?: string | null;
  featured?: boolean | null;
}

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = ""): string {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${path}`;
}

/**
 * Get full API URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full API URL
 */
export function getApiURL(path = ""): string {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api"}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Record<string, any>} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(
  path: string, 
  urlParamsObject: Record<string, any> = {}, 
  options: RequestInit = {}
): Promise<any> {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    ...options,
  };

  // Build request URL
  const queryString = urlParamsObject
    ? `?${Object.entries(urlParamsObject)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        )
        .join("&")}`
    : "";

  // Trigger API call
  const response = await fetch(
    `${getApiURL(`${path}${queryString}`)}`,
    mergedOptions
  );

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  const data = await response.json();
  return data;
}

/**
 * Transform Strapi response to a more usable format
 * @param {any} data Strapi response data
 * @returns {any} Transformed data
 */
export function transformStrapiResponse(data: any): any {
  // If it's an array
  if (Array.isArray(data)) {
    return data.map((item) => transformStrapiResponse(item));
  }

  // If it's a Strapi data object with attributes
  if (data && data.attributes) {
    const { id, attributes } = data;
    const transformedData = { id, ...attributes };

    // Handle nested objects with attributes
    Object.keys(transformedData).forEach((key) => {
      if (
        transformedData[key] &&
        typeof transformedData[key] === "object" &&
        transformedData[key].data
      ) {
        transformedData[key] = transformStrapiResponse(transformedData[key].data);
      }
    });

    return transformedData;
  }

  // If it's a simple object
  return data;
}

/**
 * Get Site Settings
 * @returns {Promise<any>} Site settings data
 */
export async function getSiteSettings(): Promise<any> {
  const data = await fetchAPI("/site-setting", {
    populate: "*",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get Homepage Data
 * @returns {Promise<any>} Homepage data
 */
export async function getHomepage(): Promise<any> {
  const data = await fetchAPI("/homepage", {
    populate: "deep",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get Vehicles
 * @returns {Promise<any[]>} Array of vehicles
 */
export async function getVehicles(): Promise<any[]> {
  const data = await fetchAPI("/vehicles", {
    populate: "*",
    sort: "name:asc",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get Vehicle by ID
 * @param {string|number} id Vehicle ID
 * @returns {Promise<any>} Vehicle data
 */
export async function getVehicleById(id: string | number): Promise<any> {
  const data = await fetchAPI(`/vehicles/${id}`, {
    populate: "*",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get Services
 * @returns {Promise<any[]>} Array of services
 */
export async function getServices(): Promise<any[]> {
  const data = await fetchAPI("/services", {
    populate: "*",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get Service by slug
 * @param {string} slug Service slug
 * @returns {Promise<any>} Service data
 */
export async function getServiceBySlug(slug: string): Promise<any> {
  const data = await fetchAPI("/services", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "*",
  });
  return transformStrapiResponse(data.data[0]);
}

/**
 * Get Team Members
 * @returns {Promise<any[]>} Array of team members
 */
export async function getTeamMembers(): Promise<any[]> {
  const data = await fetchAPI("/team-members", {
    populate: "*",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get About Hero
 * @returns {Promise<any>} About hero data
 */
export async function getAboutHero(): Promise<any> {
  const data = await fetchAPI("/about-hero", {
    populate: "*",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get Testimonials
 * @returns {Promise<any[]>} Array of testimonials
 */
export async function getTestimonials(): Promise<any[]> {
  const data = await fetchAPI("/testimonials", {
    populate: "*",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get Blog Categories
 * @returns {Promise<any[]>} Array of categories
 */
export async function getBlogCategories(): Promise<any[]> {
  const data = await fetchAPI("/categories", {
    sort: "name:asc",
  });
  return transformStrapiResponse(data.data);
}

/**
 * Get Blog Posts
 * @param {BlogPostFilters} options Query options
 * @returns {Promise<{posts: any[], pagination: any}>} Array of blog posts and pagination info
 */
export async function getBlogPosts(options: BlogPostFilters = {}): Promise<{posts: any[], pagination: any}> {
  const { page = 1, pageSize = 9, category = null, featured = null } = options;
  
  let filters: Record<string, any> = {};
  
  if (category) {
    filters.category = {
      slug: {
        $eq: category,
      },
    };
  }
  
  if (featured !== null) {
    filters.featured = {
      $eq: featured,
    };
  }
  
  const data = await fetchAPI("/blog-posts", {
    sort: "publishDate:desc",
    populate: {
      featuredImage: true,
      category: true,
      seo: true,
    },
    pagination: {
      page,
      pageSize,
    },
    filters,
  });
  
  return {
    posts: transformStrapiResponse(data.data),
    pagination: data.meta.pagination,
  };
}

/**
 * Get Blog Post by slug
 * @param {string} slug Blog post slug
 * @returns {Promise<any>} Blog post data
 */
export async function getBlogPostBySlug(slug: string): Promise<any> {
  const data = await fetchAPI("/blog-posts", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      featuredImage: true,
      category: true,
      seo: true,
    },
  });
  
  return transformStrapiResponse(data.data[0]);
}