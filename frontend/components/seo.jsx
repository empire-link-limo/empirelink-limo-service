// components/seo.jsx
import Head from "next/head";
import { getStrapiMedia } from "@/lib/api";

const Seo = ({ seo }) => {
  // Default values for SEO
  const defaults = {
    metaTitle: "Empirelink Limo Service | Premium Corporate Transportation",
    metaDescription: "Luxury limousine and chauffeur services for corporate clients. Experience elegance, reliability, and professionalism.",
    shareImage: null,
  };

  // Use defaults if no SEO data
  const fullSeo = {
    ...defaults,
    ...seo,
  };

  const imageUrl = getStrapiMedia(fullSeo.shareImage);

  return (
    <Head>
      <title>{fullSeo.metaTitle}</title>
      <meta name="description" content={fullSeo.metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {fullSeo.metaRobots && (
        <meta name="robots" content={fullSeo.metaRobots} />
      )}
      
      {fullSeo.keywords && (
        <meta name="keywords" content={fullSeo.keywords} />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullSeo.metaTitle} />
      <meta property="og:description" content={fullSeo.metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ''} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullSeo.metaTitle} />
      <meta name="twitter:description" content={fullSeo.metaDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Head>
  );
};

export default Seo;