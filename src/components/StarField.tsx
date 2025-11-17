"use client";

import { useState, useEffect } from "react";

export function StarField() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number; size: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Generate random stars with varying sizes - reduced count for better performance
    const updateStars = () => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      let starCount = 50; // Reduced from 150
      
      if (width < 768) {
        starCount = 30; // Reduced from 80
      } else if (width >= 3840) {
        starCount = 100; // Reduced from 300
      } else if (width >= 2560) {
        starCount = 70; // Reduced from 200
      }
      
      const newStars = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 1 + Math.random() * 2,
        size: Math.random() * 2 + 1,
      }));
      setStars(newStars);
    };

    // Delay initial render slightly to not block LCP
    const timeoutId = setTimeout(updateStars, 100);
    
    // Update on resize (debounced)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateStars, 250);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        @keyframes drift {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }
      `}</style>
      <div
        className="starfield-background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
          background: `
            radial-gradient(ellipse at top, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
          `,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Aurora-like background effects */}
        <div
          className="aurora-bg aurora-bg-1"
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            pointerEvents: "none",
            transform: "translateZ(0)",
            willChange: "transform, filter",
            backfaceVisibility: "hidden",
          }}
        />
        <div
          className="aurora-bg aurora-bg-2"
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
            animationDelay: "5s",
            transform: "translateZ(0)",
            willChange: "transform, filter",
            backfaceVisibility: "hidden",
          }}
        />
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: "#ffffff",
              boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8), 0 0 ${star.size * 6}px rgba(99, 102, 241, 0.4)`,
              animation: `twinkle ${star.duration}s ease-in-out infinite, drift ${star.duration * 3}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              opacity: 0.8,
              transform: "translateZ(0)",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          />
        ))}
      </div>
    </>
  );
}

