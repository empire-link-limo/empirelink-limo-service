// app/about/page.tsx
import { getAboutHero, getTeamMembers, getSiteSettings } from '@/lib/api';
import StrapiMedia from '@/components/strapi-image';
import SEO from '@/components/seo';
import Link from "next/link";
import { Award, Clock, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';

export const revalidate = 3600; // Revalidate this page every hour

export default async function AboutPage() {
  // Fetch data from Strapi
  const aboutHero = await getAboutHero();
  const teamMembers = await getTeamMembers();
  const siteSettings = await getSiteSettings();

  // Values data could also come from Strapi
  const values = [
    {
      icon: <Clock className="h-10 w-10 text-gold" />,
      title: "Punctuality",
      description:
        "We understand the value of your time. Our chauffeurs arrive early to ensure you're never kept waiting.",
    },
    {
      icon: <Award className="h-10 w-10 text-gold" />,
      title: "Excellence",
      description:
        "We maintain the highest standards in every aspect of our service, from vehicle maintenance to chauffeur training.",
    },
    {
      icon: <Shield className="h-10 w-10 text-gold" />,
      title: "Safety",
      description:
        "Your safety is our priority. Our vehicles undergo rigorous safety inspections and our chauffeurs are professionally trained.",
    },
    {
      icon: <Users className="h-10 w-10 text-gold" />,
      title: "Client Focus",
      description:
        "We tailor our services to meet your specific needs, ensuring a personalized experience for every client.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Add SEO */}
      <SEO 
        seo={aboutHero.seo} 
        defaultSeo={siteSettings.defaultSeo} 
      />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <StrapiMedia
            data={aboutHero.background?.data}
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{aboutHero.title}</h1>
            <div className="h-1 w-20 bg-gold mb-6"></div>
            {/* Rich Text Rendering */}
            <div className="text-xl text-gray-300 mb-8 prose prose-invert">
              <ReactMarkdown>
                {aboutHero.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="h-1 w-20 bg-gold mb-6"></div>
              <p className="text-gray-300 mb-4">
                Founded in 2005, Luxury Limo began with a simple mission: to provide corporate clients with
                transportation services that truly reflect their professional standards.
              </p>
              <p className="text-gray-300 mb-4">
                What started with a small fleet of three vehicles has grown into one of the most respected luxury
                transportation companies in the region, serving Fortune 500 companies and discerning business
                professionals.
              </p>
              <p className="text-gray-300 mb-6">
                Our commitment to excellence, attention to detail, and understanding of corporate needs has established
                us as the preferred choice for executive transportation.
              </p>
              <Button asChild className="bg-gold hover:bg-gold-light text-black">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <StrapiMedia
                data={{url: "/placeholder.svg?height=800&width=1200"}}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">The principles that guide every aspect of our service</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">Meet the experts behind our exceptional service</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-black p-6 rounded-lg border border-gray-800"
              >
                <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                  <StrapiMedia
                    data={member.image?.data}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gold mb-4">{member.position}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
                <p className="text-gray-300 mb-6">
                  Join our growing list of satisfied corporate clients and discover why Luxury Limo is the preferred
                  choice for executive transportation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-gold hover:bg-gold-light text-black">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white hover:bg-white/10">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
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