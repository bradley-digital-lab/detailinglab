import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Protect crawler budget by blocking internal gateways
    },
    sitemap: 'https://detailinglab.vercel.app/sitemap.xml',
  };
}
