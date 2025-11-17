"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load analytics after page is interactive
const Analytics = dynamic(() => import("@vercel/analytics/next").then(mod => ({ default: mod.Analytics })), {
  ssr: false,
});

const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then(mod => ({ default: mod.SpeedInsights })), {
  ssr: false,
});

export function AnalyticsWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay loading analytics until after page is interactive and LCP has occurred
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 3000); // Wait 3 seconds to ensure LCP has completed

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

