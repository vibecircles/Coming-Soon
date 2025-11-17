import { MetadataRoute } from 'next';
import { baseURL, meta } from '@/resources/once-ui.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // Add more routes here as you create them
    // {
    //   url: `${baseURL}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.8,
    // },
  ];

  return routes;
}


