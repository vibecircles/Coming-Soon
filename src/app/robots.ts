import { MetadataRoute } from 'next';
import { baseURL } from '@/resources/once-ui.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}

