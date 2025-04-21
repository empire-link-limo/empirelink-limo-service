// app/blog/page.tsx
import Link from "next/link";
import { getBlogPosts, getBlogCategories, getSiteSettings } from '@/lib/api';
import StrapiMedia from '@/components/strapi-image';
import SEO from '@/components/seo';
import { Calendar, User, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types definition
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  publishDate: string;
  author: string;
  featured: boolean;
  featuredImage: {
    data: any;
  };
  category: Category;
}

export const revalidate = 3600; // Revalidate this page every hour

// This would need to be a Client Component for filtering/search
// For SSR, we're using URL params for initial filtering
export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { category?: string; page?: string } 
}) {
  // Get query parameters
  const page = Number(searchParams?.page) || 1;
  const category = searchParams?.category || null;
  
  // Fetch data from Strapi
  const { posts, pagination } = await getBlogPosts({
    page,
    pageSize: 9,
    category,
  });
  const categories = await getBlogCategories();
  const siteSettings = await getSiteSettings();
  
  // Find featured post
  const featuredPost = posts.find((post: BlogPost) => post.featured);

  return (
    <div className="pt-20">
      {/* Add SEO */}
      <SEO 
        seo={{ 
          metaTitle: "Blog | Empire Link Limo",
          metaDescription: "Insights and updates from the world of luxury corporate transportation."
        }} 
        defaultSeo={siteSettings.defaultSeo} 
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <StrapiMedia
            data={{url: "/placeholder.svg?height=800&width=1600"}}
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            <p className="text-xl text-gray-300 mb-8">
              Insights and updates from the world of luxury corporate transportation
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Categories filter - this part would need a client component wrapper for live filtering */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/blog" passHref>
                <Button
                  variant={!category ? "default" : "outline"}
                  className={
                    !category
                      ? "bg-gold hover:bg-gold-light text-black"
                      : "border-gray-700 hover:bg-gray-800"
                  }
                >
                  All
                </Button>
              </Link>
              {categories.map((cat: Category) => (
                <Link key={cat.id} href={`/blog?category=${cat.slug}`} passHref>
                  <Button
                    variant={category === cat.slug ? "default" : "outline"}
                    className={
                      category === cat.slug
                        ? "bg-gold hover:bg-gold-light text-black"
                        : "border-gray-700 hover:bg-gray-800"
                    }
                  >
                    {cat.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && !category && (
            <div className="mb-16">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-auto">
                    <StrapiMedia
                      data={featuredPost.featuredImage?.data}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col">
                    <div className="mb-2">
                      <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm">Featured</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-gray-400 text-sm mb-6">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(featuredPost.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <User className="h-4 w-4 mr-1" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        <span>{featuredPost.category?.name}</span>
                      </div>
                    </div>
                    <Button asChild className="mt-auto bg-gold hover:bg-gold-light text-black self-start">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts
              .filter((post: BlogPost) => !post.featured || category)
              .map((post: BlogPost) => (
                <div
                  key={post.id}
                  className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
                >
                  <div className="relative h-48">
                    <StrapiMedia
                      data={post.featuredImage?.data}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-400 text-xs mb-3">
                      <div className="flex items-center mr-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        <span>{post.category?.name}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                      <Link href={`/blog/${post.slug}`}>Read Article</Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pageCount > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                {Array.from({ length: pagination.pageCount }).map((_, i) => (
                  <Link 
                    key={i} 
                    href={`/blog?page=${i + 1}${category ? `&category=${category}` : ''}`}
                    passHref
                  >
                    <Button
                      variant={pagination.page === i + 1 ? "default" : "outline"}
                      className={
                        pagination.page === i + 1
                          ? "bg-gold hover:bg-gold-light text-black"
                          : "border-gray-700 hover:bg-gray-800"
                      }
                    >
                      {i + 1}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No Posts Message */}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-gray-400 mb-6">
                {category 
                  ? `No posts found in the "${categories.find(c => c.slug === category)?.name || category}" category.` 
                  : 'No posts found.'}
              </p>
              <Button
                asChild
                className="bg-gold hover:bg-gold-light text-black"
              >
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-300 mb-6">
                  Stay updated with the latest insights, industry news, and exclusive offers from Empire Link Limo.
                </p>
                {/* Newsletter form would need a client component wrapper */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Your email address" className="bg-gray-800 border-gray-700" />
                  <Button className="bg-gold hover:bg-gold-light text-black">Subscribe</Button>
                </div>
                <p className="text-gray-400 text-sm mt-3">We respect your privacy. Unsubscribe at any time.</p>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <StrapiMedia
                  data={{url: "/placeholder.svg?height=600&width=800"}}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}