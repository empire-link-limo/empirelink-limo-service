import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsBlogSettings extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_settings';
  info: {
    displayName: 'Blog Settings';
  };
  attributes: {
    enableSearchAndFilters: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    postsPerPage: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<9>;
    showFeaturedPost: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface SectionsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_infos';
  info: {
    displayName: 'Contact Info';
  };
  attributes: {
    email: Schema.Attribute.Text;
    phone: Schema.Attribute.String;
  };
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_sections';
  info: {
    description: '';
    displayName: 'CTA Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    primaryButtonText: Schema.Attribute.String;
    primaryButtonUrl: Schema.Attribute.String;
    secondaryButtonText: Schema.Attribute.String;
    secondaryButtonUrl: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFleetSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_fleet_sections';
  info: {
    displayName: 'Fleet Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFleetSettings extends Struct.ComponentSchema {
  collectionName: 'components_sections_fleet_settings';
  info: {
    displayName: 'Fleet Settings';
  };
  attributes: {
    featuredVehicles: Schema.Attribute.Relation<
      'oneToMany',
      'api::vehicle.vehicle'
    >;
    filterByCapacity: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    filterByFeatures: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    showFilters: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface SectionsFormSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_form_sections';
  info: {
    displayName: 'Form Section';
  };
  attributes: {
    notificationEmail: Schema.Attribute.Email;
    successMessage: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsGallerySettings extends Struct.ComponentSchema {
  collectionName: 'components_sections_gallery_settings';
  info: {
    displayName: 'Gallery Settings';
  };
  attributes: {
    enableLightbox: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    imagesPerRow: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    maxImages: Schema.Attribute.Integer;
    showCategories: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    description: 'Hero section with support for separate mobile and desktop backgrounds';
    displayName: 'Home Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images' | 'videos'>;
    desktopBackgroundImage: Schema.Attribute.Media<'images' | 'videos'>;
    primaryButtonText: Schema.Attribute.String;
    primaryButtonUrl: Schema.Attribute.Text;
    secondaryButtonText: Schema.Attribute.String;
    secondaryButtonUrl: Schema.Attribute.Text;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsMapSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_map_sections';
  info: {
    displayName: 'Map Section';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    locationName: Schema.Attribute.Text;
    mapEmbedCode: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsNewsletterSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_newsletter_sections';
  info: {
    displayName: 'Newsletter Section';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mailchimpEndpoint: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsOtherHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_other_hero_sections';
  info: {
    displayName: 'Other Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsServicesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_sections';
  info: {
    displayName: 'Services Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStorySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_story_sections';
  info: {
    displayName: 'Story Section';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTeamSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_team_sections';
  info: {
    displayName: 'Team Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    team_members: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-member.team-member'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials_sections';
  info: {
    displayName: 'Testimonials Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsValuesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_values_sections';
  info: {
    description: '';
    displayName: 'Values Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    valueItems: Schema.Attribute.Component<'shared.value-item', true>;
  };
}

export interface SectionsWhyChooseUsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_choose_us_sections';
  info: {
    displayName: 'Why Choose Us Section';
  };
  attributes: {
    benefit: Schema.Attribute.Component<'shared.benefits', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBenefits extends Struct.ComponentSchema {
  collectionName: 'components_shared_benefits';
  info: {
    displayName: 'benefits';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    metaRobots: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'X', 'LinkedIn']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedValueItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_value_items';
  info: {
    displayName: 'Value Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.blog-settings': SectionsBlogSettings;
      'sections.contact-info': SectionsContactInfo;
      'sections.cta-section': SectionsCtaSection;
      'sections.fleet-section': SectionsFleetSection;
      'sections.fleet-settings': SectionsFleetSettings;
      'sections.form-section': SectionsFormSection;
      'sections.gallery-settings': SectionsGallerySettings;
      'sections.hero-section': SectionsHeroSection;
      'sections.map-section': SectionsMapSection;
      'sections.newsletter-section': SectionsNewsletterSection;
      'sections.other-hero-section': SectionsOtherHeroSection;
      'sections.services-section': SectionsServicesSection;
      'sections.story-section': SectionsStorySection;
      'sections.team-section': SectionsTeamSection;
      'sections.testimonials-section': SectionsTestimonialsSection;
      'sections.values-section': SectionsValuesSection;
      'sections.why-choose-us-section': SectionsWhyChooseUsSection;
      'shared.benefits': SharedBenefits;
      'shared.feature': SharedFeature;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.value-item': SharedValueItem;
    }
  }
}
