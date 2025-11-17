"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { LetterFx, Text } from "@once-ui-system/core";

// Lazy load heavy components to improve FCP - these load after initial paint
const StarField = dynamic(() => import("@/components/StarField").then(mod => ({ default: mod.StarField })), {
  ssr: false,
  loading: () => null, // Don't show loading state for background
});

const CountdownWatch = dynamic(() => import("@/components/CountdownWatch").then(mod => ({ default: mod.CountdownWatch })), {
  ssr: false,
});

const SocialMediaIcons = dynamic(() => import("@/components/SocialMediaIcons").then(mod => ({ default: mod.SocialMediaIcons })), {
  ssr: false,
});

const ThemeToggle = dynamic(() => import("@/components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
});

const AnalyticsWrapper = dynamic(() => import("@/components/AnalyticsWrapper").then(mod => ({ default: mod.AnalyticsWrapper })), {
  ssr: false,
});

export function ClientContent() {
  const [mounted, setMounted] = useState(false);
  const [deferredComponents, setDeferredComponents] = useState(false);
  const badgeTextRef = useRef<HTMLDivElement>(null);
  const [enhanceBadgeText, setEnhanceBadgeText] = useState(false);

  // Mark as mounted after first render
  useEffect(() => {
    setMounted(true);
    
    // Enhance badge text with LetterFx after FCP
    requestAnimationFrame(() => {
      setTimeout(() => {
        setEnhanceBadgeText(true);
      }, 300);
    });
    
    // Defer non-critical components until after FCP
    // This gives the browser time to paint critical content first
    const timer = setTimeout(() => {
      setDeferredComponents(true);
    }, 150); // Small delay to allow FCP to complete

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Theme toggle - can load immediately but not critical */}
      {mounted && (
        <div style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}>
          <ThemeToggle />
        </div>
      )}
      
      {/* StarField - background effect, low priority */}
      {mounted && <StarField />}
      
      {/* Replace countdown placeholder with actual component */}
      {deferredComponents && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: "600px" }}>
          <CountdownWatch />
        </div>
      )}
      
      {/* Replace social icons placeholder with actual component */}
      {deferredComponents && (
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)" }}>
          <SocialMediaIcons />
        </div>
      )}
      
      {/* Enhance badge text with LetterFx animation after FCP */}
      {enhanceBadgeText && badgeTextRef.current && (
        <div ref={badgeTextRef} style={{ display: "none" }}>
          <Text>
            <LetterFx trigger="instant">Talk. Laugh. Be Real. – No filters, just friendships.</LetterFx>
          </Text>
        </div>
      )}
      
      {/* Analytics - lowest priority, load last */}
      {deferredComponents && <AnalyticsWrapper />}
    </>
  );
}
