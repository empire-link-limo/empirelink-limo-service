// app/page.tsx
import { getHomepage, getVehicles, getServices, getTestimonials } from '@/lib/api';
import StrapiMedia from '@/components/strapi-image';
import SEO from '@/components/seo';
import Link from "next/link";
import { ChevronRight, ChevronLeft, Star, Award, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 3600; // Revalidate this page every hour

export default async function Home() {
  // Fetch data from Strapi
  const homepageData = await getHomepage();
  const vehicles = await getVehicles();
  const services = await getServices();
  const testimonials = await getTestimonials();

  // Reference to scrollContainer will be created client-side through useRef

  return (
    <div className="flex flex-col">
      {/* Add SEO */}
      <SEO seo={homepageData.seo} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StrapiMedia
            data={homepageData.heroBackground.data}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="opacity-100">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gold-gradient">{homepageData.heroTitle}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {homepageData.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black text-lg">
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10 text-lg">
                <Link href="/fleet">Explore Fleet</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-10 w-10 text-gold rotate-90" />
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Fleet</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience unparalleled comfort and style with our meticulously maintained luxury vehicles
            </p>
          </div>

          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex overflow-x-auto gap-6 py-4 px-2 horizontal-scroll">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex-none w-80 vehicle-card"
                >
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800">
                    <div className="relative h-48">
                      <StrapiMedia
                        data={vehicle.gallery?.data?.[0] || null}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                      <p className="text-gold mb-2">{vehicle.capacity}</p>
                      <p className="text-gray-400 mb-4">{vehicle.description}</p>
                      <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                        <Link href={`/fleet/${vehicle.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-gold hover:bg-gold-light text-black">
              <Link href="/fleet">View All Vehicles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Tailored transportation solutions for your corporate needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => {
              // Define icon component based on icon name from Strapi
              let IconComponent;
              switch (service.icon) {
                case "Award":
                  IconComponent = <Award className="h-10 w-10 text-gold" />;
                  break;
                case "Clock":
                  IconComponent = <Clock className="h-10 w-10 text-gold" />;
                  break;
                case "Shield":
                  IconComponent = <Shield className="h-10 w-10 text-gold" />;
                  break;
                default:
                  IconComponent = <Award className="h-10 w-10 text-gold" />;
              }

              return (
                <div
                  key={service.id}
                  className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center"
                >
                  <div className="flex justify-center mb-6">{IconComponent}</div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <Button asChild variant="link" className="text-gold">
                    <Link href={`/services#${service.slug}`}>
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">What our corporate clients say about our service</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-900 p-8 rounded-lg border border-gray-800 relative"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold">
                    <StrapiMedia
                      data={testimonial.image.data}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="text-gold flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                <div className="text-center">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <StrapiMedia
            data={homepageData.ctaBackground.data}
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {homepageData.ctaTitle}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {homepageData.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black text-lg">
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10 text-lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}