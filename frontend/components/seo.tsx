// components/seo.tsx
import Head from 'next/head';

interface SEOProps {
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords?: string;
    metaImage?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
  defaultSeo?: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords?: string;
    metaImage?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

export default function SEO({ seo, defaultSeo }: SEOProps) {
  const title = seo?.metaTitle || defaultSeo?.metaTitle || 'Empire Link Limo';
  const description = seo?.metaDescription || defaultSeo?.metaDescription || 'Premium limousine and chauffeur services for corporate clients';
  const keywords = seo?.metaKeywords || defaultSeo?.metaKeywords || '';
  
  const imageUrl = seo?.metaImage?.data?.attributes?.url || 
                   defaultSeo?.metaImage?.data?.attributes?.url || 
                   '/placeholder.svg';
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
}