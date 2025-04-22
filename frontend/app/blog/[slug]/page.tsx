// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPostBySlug, getAllPosts } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/api";
import Seo from "@/components/seo";
import { BlogPostData, BlogPostsResponse } from "../page";

export async function generateStaticParams() {
  const posts = await getAllPosts(100) as BlogPostsResponse;
  
  return posts.data.map((post) => ({
    slug: post.attributes.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug) as BlogPostData;
  
  if (!post) {
    return notFound();
  }
  
  const postData = post.attributes;
  const imageUrl = postData.image?.data ? 
    getStrapiMedia(postData.image) : 
    "/placeholder.svg?height=800&width=1200";
  
  return (
    <div className="pt-20">
      {/* SEO */}
      {postData.seo && (
        <Seo seo={{
          metaTitle: postData.seo.metaTitle || postData.title,
          metaDescription: postData.seo.metaDescription || postData.excerpt,
          shareImage: postData.seo.metaImage || postData.image,
        }} />
      )}
      
      <div className="container mx-auto px-4 py-12">
        <Link href="/blog" className="inline-flex items-center text-gold hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{postData.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-400 text-sm mb-6 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(postData.Published).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{postData.author}</span>
              </div>
              
              {postData.category?.data && (
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{postData.category.data.attributes.name}</span>
                </div>
              )}
            </div>
            
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={postData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <p className="text-lg text-gray-300 italic border-l-4 border-gold pl-4">{postData.excerpt}</p>
          </header>
          
          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-playfair prose-headings:text-white prose-a:text-gold"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
                <Link href="/blog">Back to Blog</Link>
              </Button>
              
              <Button asChild className="bg-gold hover:bg-gold-light text-black">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}