import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'

import classNames from "classnames";

import { baseURL, meta, schema, fonts, effects, style, dataStyle } from "@/resources/once-ui.config";
import { Meta, Schema,  Column, Flex, opacity, SpacingToken, Background} from "@once-ui-system/core";
import { Providers } from '@/components/Providers';

export async function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  };
}

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    canonical: meta.home.canonical,
    image: meta.home.image,
    robots: meta.home.robots,
    alternates: meta.home.alternates,
  });

  // Enhance with additional SEO metadata
  return {
    ...metadata,
    keywords: meta.home.keywords,
    authors: [{ name: meta.home.author }],
    openGraph: {
      ...metadata.openGraph,
      type: meta.home.openGraph.type,
      siteName: meta.home.openGraph.siteName,
      locale: meta.home.openGraph.locale,
      images: [
        {
          url: `${baseURL}${meta.home.image}`,
          width: 1200,
          height: 630,
          alt: meta.home.imageAlt,
        },
      ],
    },
    twitter: {
      card: meta.home.twitter.card,
      title: meta.home.title,
      description: meta.home.description,
      creator: meta.home.twitter.creator,
      site: meta.home.twitter.site,
      images: [`${baseURL}${meta.home.image}`],
    },
    verification: {
      // Add verification codes when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
    category: "Social Networking",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={meta.home.title}
        description={meta.home.description}
        path={meta.home.path}
      />
      <head>
        {/* Resource hints for faster font loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data - non-blocking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": schema.type,
              name: schema.name,
              description: schema.description,
              url: schema.url,
              logo: schema.logo,
              email: schema.email,
              sameAs: schema.sameAs,
              contactPoint: {
                "@type": "ContactPoint",
                email: schema.email,
                contactType: "Customer Service",
              },
            }),
          }}
        />
        {/* Theme initialization - optimized to not block FCP */}
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const config = ${JSON.stringify({
                    theme: style.theme,
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    'solid-style': style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    'viz-style': dataStyle.variant,
                  })};
                  
                  // Apply defaults immediately
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Quick theme resolution - defer localStorage access
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply theme with minimal blocking
                  const resolvedTheme = config.theme === 'system' 
                    ? resolveTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : config.theme;
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Defer localStorage reads to avoid blocking
                  requestIdleCallback ? requestIdleCallback(() => {
                    try {
                      const savedTheme = localStorage.getItem('data-theme');
                      if (savedTheme) {
                        root.setAttribute('data-theme', resolveTheme(savedTheme));
                      }
                      Object.keys(config).forEach(key => {
                        const value = localStorage.getItem('data-' + key);
                        if (value) root.setAttribute('data-' + key, value);
                      });
                    } catch(e) {}
                  }) : setTimeout(() => {
                    try {
                      const savedTheme = localStorage.getItem('data-theme');
                      if (savedTheme) {
                        root.setAttribute('data-theme', resolveTheme(savedTheme));
                      }
                      Object.keys(config).forEach(key => {
                        const value = localStorage.getItem('data-' + key);
                        if (value) root.setAttribute('data-' + key, value);
                      });
                    } catch(e) {}
                  }, 0);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column as="body" background="page" fillWidth margin="0" padding="0">
          <Background
            position="absolute"
            mask={{
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
              cursor: effects.mask.cursor,
            }}
            gradient={{
              display: effects.gradient.display,
              opacity: effects.gradient.opacity as opacity,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
            }}
            dots={{
              display: effects.dots.display,
              opacity: effects.dots.opacity as opacity,
              size: effects.dots.size as SpacingToken,
              color: effects.dots.color,
            }}
            grid={{
              display: effects.grid.display,
              opacity: effects.grid.opacity as opacity,
              color: effects.grid.color,
              width: effects.grid.width,
              height: effects.grid.height,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as opacity,
              size: effects.lines.size as SpacingToken,
              thickness: effects.lines.thickness,
              angle: effects.lines.angle,
              color: effects.lines.color,
            }}
          />
          {children}
        </Column>
      </Providers>
    </Flex>
  );
}
