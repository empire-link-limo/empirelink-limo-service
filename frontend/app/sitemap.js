// app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://www.empirelinklimo.com' // Replace with your actual domain
  
  // Static pages based on your actual folder structure
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95, // High priority for booking page
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  // Dynamic pages from Strapi backend
  const dynamicPages = await getDynamicPages(baseUrl)
  
  return [...staticPages, ...dynamicPages]
}

async function getDynamicPages(baseUrl) {
  const pages = []
  
  try {
    // Replace with your actual Strapi URL
    const strapiUrl = 'https://backend.empirelinklimo.com/api'
    
    // Fetch individual services (for /services/[slug] pages)
    try {
      const servicesRes = await fetch(`${strapiUrl}/services?populate=*`, {
        next: { revalidate: 3600 } // Cache for 1 hour
      })
      
      if (servicesRes.ok) {
        const services = await servicesRes.json()
        
        if (services.data && Array.isArray(services.data)) {
          services.data.forEach(service => {
            if (service.attributes && service.attributes.slug) {
              pages.push({
                url: `${baseUrl}/services/${service.attributes.slug}`,
                lastModified: new Date(service.attributes.updatedAt || service.attributes.publishedAt),
                changeFrequency: 'monthly',
                priority: 0.8,
              })
            }
          })
        }
      }
    } catch (error) {
      console.log('Services API not available or error occurred:', error.message)
    }

    // Fetch individual fleet vehicles (for /fleet/[slug] pages)
    try {
      const fleetRes = await fetch(`${strapiUrl}/vehicles?populate=*`, {
        next: { revalidate: 3600 }
      })
      
      if (fleetRes.ok) {
        const vehicles = await fleetRes.json()
        
        if (vehicles.data && Array.isArray(vehicles.data)) {
          vehicles.data.forEach(vehicle => {
            if (vehicle.attributes && vehicle.attributes.slug) {
              pages.push({
                url: `${baseUrl}/fleet/${vehicle.attributes.slug}`,
                lastModified: new Date(vehicle.attributes.updatedAt || vehicle.attributes.publishedAt),
                changeFrequency: 'monthly',
                priority: 0.8,
              })
            }
          })
        }
      }
    } catch (error) {
      console.log('Fleet API not available or error occurred:', error.message)
    }

    // Fetch blog posts (for /blog/[slug] pages)
    try {
      const blogRes = await fetch(`${strapiUrl}/articles?populate=*`, {
        next: { revalidate: 1800 } // Cache for 30 minutes (blog updates more frequently)
      })
      
      if (blogRes.ok) {
        const posts = await blogRes.json()
        
        if (posts.data && Array.isArray(posts.data)) {
          posts.data.forEach(post => {
            if (post.attributes && post.attributes.slug) {
              pages.push({
                url: `${baseUrl}/blog/${post.attributes.slug}`,
                lastModified: new Date(post.attributes.updatedAt || post.attributes.publishedAt),
                changeFrequency: 'weekly',
                priority: 0.6,
              })
            }
          })
        }
      }
    } catch (error) {
      console.log('Blog API not available or error occurred:', error.message)
    }

    // Optional: Add any other Strapi content types you might have
    // Examples: locations, testimonials, packages, etc.
    
    try {
      const locationsRes = await fetch(`${strapiUrl}/locations?populate=*`, {
        next: { revalidate: 3600 }
      })
      
      if (locationsRes.ok) {
        const locations = await locationsRes.json()
        
        if (locations.data && Array.isArray(locations.data)) {
          locations.data.forEach(location => {
            if (location.attributes && location.attributes.slug) {
              pages.push({
                url: `${baseUrl}/locations/${location.attributes.slug}`,
                lastModified: new Date(location.attributes.updatedAt || location.attributes.publishedAt),
                changeFrequency: 'monthly',
                priority: 0.7,
              })
            }
          })
        }
      }
    } catch (error) {
      console.log('Locations API not available or error occurred:', error.message)
    }

  } catch (error) {
    console.error('Error fetching dynamic pages for sitemap:', error)
  }
  
  return pages
}

// Optional: You can also export metadata for better SEO
export const metadata = {
  title: 'Sitemap',
  description: 'XML sitemap for NYC Limousine Service',
}