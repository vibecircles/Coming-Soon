"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Fade, Flex, Logo, NavIcon, Row, Kbar, useTheme, ThemeSwitcher, Text } from "@once-ui-system/core";
import { layout, routes } from "@/resources/once-ui.config";
import { Sidebar, NavigationItem } from "./Sidebar";

export function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const pathname = usePathname();
  const [marketCap, setMarketCap] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSidebarVisible(false);
  }, [pathname]);

  useEffect(() => {
    setIsMac(navigator.userAgent.toLowerCase().indexOf('mac') !== -1);
  }, []);

  // Fetch market cap from GeckoTerminal
  useEffect(() => {
    const fetchMarketCap = async () => {
      try {
        const poolAddress = "0x3ad8aefb80aa991d986913a517c63850e2b83a8b";
        const network = "polygon_pos";
        const response = await fetch(
          `https://api.geckoterminal.com/api/v2/networks/${network}/pools/${poolAddress}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch market cap");
        }
        
        const data = await response.json();
        
        // Extract market cap from the pool data
        // GeckoTerminal API structure: data.data.attributes
        let marketCapValue: number | null = null;
        
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const poolData = data.data[0];
          if (poolData.attributes) {
            // Try different possible fields for market cap/FDV
            marketCapValue = poolData.attributes.fdv_usd || 
                            poolData.attributes.market_cap_usd || 
                            poolData.attributes.base_token?.market_cap_usd ||
                            null;
            
            // If not found, try to calculate from price and supply
            if (!marketCapValue) {
              const price = poolData.attributes.base_token?.price_usd || 
                           poolData.attributes.token_price_usd;
              const supply = poolData.attributes.base_token?.total_supply ||
                            poolData.attributes.token_total_supply;
              if (price && supply) {
                marketCapValue = parseFloat(price) * parseFloat(supply);
              }
            }
          }
        } else if (data.data && data.data.attributes) {
          // Handle single object response
          const poolData = data.data;
          marketCapValue = poolData.attributes.fdv_usd || 
                          poolData.attributes.market_cap_usd || 
                          poolData.attributes.base_token?.market_cap_usd ||
                          null;
          
          if (!marketCapValue) {
            const price = poolData.attributes.base_token?.price_usd || 
                         poolData.attributes.token_price_usd;
            const supply = poolData.attributes.base_token?.total_supply ||
                          poolData.attributes.token_total_supply;
            if (price && supply) {
              marketCapValue = parseFloat(price) * parseFloat(supply);
            }
          }
        }
        
        if (marketCapValue && marketCapValue > 0) {
          // Format the number
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(marketCapValue);
          setMarketCap(formatted);
        } else {
          setMarketCap("N/A");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching market cap:", error);
        setMarketCap("N/A");
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchMarketCap();

    // Update every 30 seconds
    const interval = setInterval(fetchMarketCap, 30000);

    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  
  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => {
        setNavigationItems(data);
      })
      .catch((err) => console.error("Navigation fetch failed", err));
  }, []);

  // Function to convert navigation items to Kbar items recursively
  const convertToKbarItems = (items: NavigationItem[]) => {
    const kbarItems: any[] = [];
    
    items.forEach((item) => {
      if (item.children) {
        // This is a section/category
        // Add children items with this section name
        const childItems = convertToKbarItems(item.children);
        childItems.forEach(child => {
          child.section = item.title;
        });
        kbarItems.push(...childItems);
      } else {
        const correctedSlug = item.slug.replace(/^src\\content\\/, '').replace(/\\/g, '/');
        
        const defaultKeywords = `${item.title.toLowerCase()}, docs, documentation`;
        const keywords = item.keywords || defaultKeywords;
        
        kbarItems.push({
          id: correctedSlug,
          name: item.label || item.title,
          section: "Documentation",
          shortcut: [],
          keywords: keywords,
          href: `/${correctedSlug}`,
          icon: item.navIcon || "document",
        });
      }
    });
    
    return kbarItems;
  };

  const docsItems = convertToKbarItems(navigationItems);
  const { theme, setTheme } = useTheme();

  const navigationKbarItems = [
    {
      id: "home",
      name: "Home",
      section: "Navigation",
      shortcut: [],
      keywords: "home, landing page",
      href: "/",
      icon: "home",
    }
  ];
  
  if (routes['/roadmap']) {
    navigationKbarItems.push({
      id: "roadmap",
      name: "Roadmap",
      section: "Navigation",
      shortcut: [],
      keywords: "roadmap, roadmap page",
      href: "/roadmap",
      icon: "roadmap",
    });
  }

  const kbar = [
    ...navigationKbarItems,
    ...docsItems,
    {
      id: "theme-toggle",
      name: theme === 'dark' ? "Light mode" : "Dark mode",
      section: "Theme",
      shortcut: [],
      keywords: "light mode, dark mode, theme, toggle, switch, appearance",
      perform: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      },
      icon: theme === 'dark' ? "light" : "dark",
    },
  ];

  useEffect(() => {
    if (sidebarVisible) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Add styles to prevent scrolling but maintain position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position when sidebar is closed
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      // Cleanup function to ensure body scroll is restored
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [sidebarVisible]);

  return (
    <>
      <Fade
        pattern={{ display: true, size: "2" }}
        zIndex={3}
        pointerEvents="none"
        height="64"
        position="fixed"
        fillWidth
        top="0"
        left="0"
      />
      <Flex as="header" horizontal="center" position="sticky" top="0" zIndex={9} fillWidth vertical="center" paddingY="12" paddingX="l">
        <Row maxWidth={layout.header.width} vertical="center" horizontal="between" gap="l" fillWidth>
          <Row fillWidth vertical="center" gap="8">
            <NavIcon hide m={{hide: false}} onClick={toggleSidebar}/>
            <Logo className="dark-flex" wordmark="/trademark/type-dark.svg" size="s" href="/"/>
            <Logo className="light-flex" wordmark="/trademark/type-light.svg" size="s" href="/"/>
            {/* Market Cap Display - Next to Theme Switcher */}
            <Row 
              vertical="center" 
              gap="8"
              s={{hide: true}}
              m={{hide: false}}
              style={{ marginLeft: 'auto' }}
            >
              {isLoading ? (
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Loading...
                </Text>
              ) : (
                <Row vertical="center" gap="8" background="neutral-alpha-weak" paddingX="12" paddingY="4" radius="full">
                  <Text variant="label-default-xs" onBackground="neutral-weak">
                    Market Cap:
                  </Text>
                  <Text variant="label-strong-s" onBackground="neutral-strong">
                    {marketCap || "N/A"}
                  </Text>
                </Row>
              )}
              <ThemeSwitcher />
            </Row>
          </Row>
          <Row vertical="center" gap="8">
            <Kbar hide="m" items={kbar} radius="full" background="neutral-alpha-weak">
              <Button data-border="rounded" size="s" variant="tertiary" weight="default">
                <Row vertical="center" gap="16" style={{marginLeft: '-0.5rem'}} paddingRight="8">
                  <Row background="neutral-alpha-medium" paddingX="8" paddingY="4" radius="full" data-scaling="90" textVariant="body-default-xs" onBackground="neutral-medium">{isMac ? 'Cmd' : 'Ctrl'} k</Row>
                  Search docs...
                </Row>
              </Button>
            </Kbar>
          </Row>
        </Row>
      </Flex>

      {sidebarVisible && (
        <Sidebar 
          maxWidth={100}
          style={{height: "calc(100vh - var(--static-space-64))", backdropFilter: "blur(2rem)"}} 
          padding="8" 
          background="overlay" 
          position="fixed"
          borderTop="neutral-alpha-weak"
          left="0" 
          top="64"
          zIndex={9}
        />
      )}
    </>
  );
};
