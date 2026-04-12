import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const rootUrl = 'https://detailinglab.vercel.app';

  // Geofence target vectors for local dominating search presence
  const serviceAreas = ['harrogate', 'leeds', 'york', 'wetherby', 'ripon'];

  const dynamicRoutes = serviceAreas.map((area) => ({
    url: `${rootUrl}/services/${area}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: rootUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${rootUrl}/legal/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2, // Deprioritize legal docs vs sales pages
    },
    {
      url: `${rootUrl}/legal/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: `${rootUrl}/legal/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    ...dynamicRoutes,
  ];
}
