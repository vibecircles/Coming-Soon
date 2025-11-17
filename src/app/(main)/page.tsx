"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Heading,
  Text,
  Column,
  Badge,
  Line,
  LetterFx,
} from "@once-ui-system/core";
import { 
  FaTwitter, 
  FaInstagram, 
  FaTiktok, 
  FaFacebook,
  FaThreads,
  FaBookOpen,
  FaSun,
  FaMoon
} from "react-icons/fa6";

function StarField() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    // Generate random stars with varying sizes - reduce count on mobile
    const updateStars = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const starCount = isMobile ? 80 : 150;
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

    updateStars();
    
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
      };
    }
  }, []);

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
            }}
          />
        ))}
      </div>
    </>
  );
}

function CountdownWatch() {
  // Set target time (e.g., countdown to midnight, or a specific date)
  const getTargetTime = useCallback(() => {
    const target = new Date(2029, 0, 10, 0, 0, 0, 0); // January 10, 2029 at midnight
    return target;
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const prevTimeRef = useRef({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isAnimating, setIsAnimating] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = getTargetTime();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Trigger animation if value changed
        if (days !== prevTimeRef.current.days) {
          setIsAnimating(prev => ({ ...prev, days: true }));
          setTimeout(() => setIsAnimating(prev => ({ ...prev, days: false })), 600);
        }
        if (hours !== prevTimeRef.current.hours) {
          setIsAnimating(prev => ({ ...prev, hours: true }));
          setTimeout(() => setIsAnimating(prev => ({ ...prev, hours: false })), 600);
        }
        if (minutes !== prevTimeRef.current.minutes) {
          setIsAnimating(prev => ({ ...prev, minutes: true }));
          setTimeout(() => setIsAnimating(prev => ({ ...prev, minutes: false })), 600);
        }
        if (seconds !== prevTimeRef.current.seconds) {
          setIsAnimating(prev => ({ ...prev, seconds: true }));
          setTimeout(() => setIsAnimating(prev => ({ ...prev, seconds: false })), 600);
        }

        prevTimeRef.current = { days, hours, minutes, seconds };
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [getTargetTime]);

  const formatTime = (value: number, isDays = false) => {
    return isDays ? value.toString().padStart(3, "0") : value.toString().padStart(2, "0");
  };

  const TimeUnit = ({ value, label, isAnimating }: { value: string; label: string; isAnimating: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Column
        align="center"
        gap="xs"
        style={{
          position: "relative",
        }}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "relative",
            padding: "24px 32px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              0 0 40px rgba(99, 102, 241, 0.3),
              ${isHovered ? "0 0 60px rgba(99, 102, 241, 0.5)" : ""}
            `,
            minWidth: "100px",
            transition: "box-shadow 0.3s ease-out",
            cursor: "pointer",
          }}
          className="countdown-time-unit countdown-time-unit-wrapper"
        >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.2) 100%)",
            backgroundSize: "200% 200%",
            opacity: 0.6,
            animation: "gradient-shift 4s ease infinite",
          }}
          className="countdown-shimmer"
        />
        <Heading
          variant="display-strong-xl"
          className={`countdown-number ${isAnimating ? "number-flip" : ""}`}
          style={{
            fontFamily: "monospace",
            letterSpacing: "8px",
            fontSize: "56px",
            lineHeight: "1",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            position: "relative",
            zIndex: 1,
            textShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
            fontWeight: "700",
            transition: "all 0.3s ease",
            animation: isAnimating ? "number-flip 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          }}
        >
          {value}
        </Heading>
        {/* Glow effect on hover */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
          className="countdown-time-unit-glow"
        />
      </div>
      <Text
        variant="code-default-xs"
        style={{
          opacity: 0.9,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginTop: "8px",
          fontSize: "11px",
          transition: "opacity 0.3s ease",
        }}
      >
        {label}
      </Text>
    </Column>
  );
  };

  return (
    <div
      className="scale-in countdown-container"
      style={{
        position: "relative",
        padding: "48px",
        borderRadius: "32px",
        background: `
          linear-gradient(135deg, 
            rgba(99, 102, 241, 0.15) 0%, 
            rgba(168, 85, 247, 0.12) 50%,
            rgba(236, 72, 153, 0.1) 100%
          )
        `,
        backgroundSize: "200% 200%",
        backdropFilter: "blur(30px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.4),
          0 0 100px rgba(99, 102, 241, 0.25),
          inset 0 0 60px rgba(99, 102, 241, 0.1)
        `,
        minWidth: "600px",
        maxWidth: "100%",
        width: "100%",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-out",
        animation: "gradient-shift 8s ease infinite",
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `
            radial-gradient(circle, 
              rgba(99, 102, 241, 0.15) 0%, 
              transparent 70%
            )
          `,
          pointerEvents: "none",
        }}
        className="countdown-rotate"
      />
      
      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          width: "60px",
          height: "60px",
          borderTop: "2px solid rgba(99, 102, 241, 0.4)",
          borderLeft: "2px solid rgba(99, 102, 241, 0.4)",
          borderRadius: "16px 0 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          width: "60px",
          height: "60px",
          borderTop: "2px solid rgba(168, 85, 247, 0.4)",
          borderRight: "2px solid rgba(168, 85, 247, 0.4)",
          borderRadius: "0 16px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          width: "60px",
          height: "60px",
          borderBottom: "2px solid rgba(236, 72, 153, 0.4)",
          borderLeft: "2px solid rgba(236, 72, 153, 0.4)",
          borderRadius: "0 0 0 16px",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          width: "60px",
          height: "60px",
          borderBottom: "2px solid rgba(99, 102, 241, 0.4)",
          borderRight: "2px solid rgba(99, 102, 241, 0.4)",
          borderRadius: "0 0 16px 0",
        }}
      />

      <Column align="center" gap="l" style={{ position: "relative", zIndex: 1 }}>
        <Text
          variant="code-default-s"
          style={{
            opacity: 0.9,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "8px",
            fontSize: "12px",
            background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "600",
          }}
        >
          ⏱️ Countdown Watch
        </Text>

        {/* Small days icon display */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "8px 16px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: `
                0 4px 16px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 0 20px rgba(99, 102, 241, 0.2)
              `,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Text
              variant="code-default-xs"
              style={{
                fontSize: "10px",
                opacity: 0.8,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Days
            </Text>
            <Text
              variant="code-default-s"
              className={isAnimating.days ? "number-flip" : ""}
              style={{
                fontFamily: "monospace",
                fontSize: "18px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 10px rgba(99, 102, 241, 0.4)",
                animation: isAnimating.days ? "number-flip 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
              }}
            >
              {formatTime(timeLeft.days, true)}
            </Text>
          </div>
        </div>

        <div
          className="countdown-time-units-container"
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <TimeUnit value={formatTime(timeLeft.hours)} label="Hours" isAnimating={isAnimating.hours} />
          <div
            className="glow-text countdown-separator"
            style={{
              fontSize: "48px",
              color: "rgba(255, 255, 255, 0.5)",
              fontWeight: "300",
              marginBottom: "24px",
              textShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
              transition: "all 0.3s ease",
            }}
          >
            :
          </div>
          <TimeUnit value={formatTime(timeLeft.minutes)} label="Minutes" isAnimating={isAnimating.minutes} />
          <div
            className="glow-text countdown-separator"
            style={{
              fontSize: "48px",
              color: "rgba(255, 255, 255, 0.5)",
              fontWeight: "300",
              marginBottom: "24px",
              textShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
              transition: "all 0.3s ease",
            }}
          >
            :
          </div>
          <TimeUnit value={formatTime(timeLeft.seconds)} label="Seconds" isAnimating={isAnimating.seconds} />
        </div>

        <Text
          variant="body-default-s"
          style={{
            opacity: 0.7,
            marginTop: "16px",
            fontSize: "13px",
            letterSpacing: "1px",
          }}
        >
          Time remaining until launch
        </Text>
      </Column>
    </div>
  );
}

function SocialMediaIcons() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const socialLinks = [
    { name: "facebook", icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61577760104699", color: "rgba(24, 119, 242, 0.8)", gradient: "linear-gradient(135deg, rgba(24, 119, 242, 0.3) 0%, rgba(24, 119, 242, 0.1) 100%)" },
    { name: "instagram", icon: FaInstagram, url: "https://www.instagram.com/vibecircles/", color: "rgba(225, 48, 108, 0.8)", gradient: "linear-gradient(135deg, rgba(225, 48, 108, 0.3) 0%, rgba(131, 58, 180, 0.3) 50%, rgba(253, 193, 7, 0.2) 100%)" },
    { name: "threads", icon: FaThreads, url: "https://www.threads.com/@vibecircles", color: "rgba(0, 0, 0, 0.8)", gradient: "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%)" },
    { name: "twitter", icon: FaTwitter, url: "https://x.com/vibecircles", color: "rgba(29, 161, 242, 0.8)", gradient: "linear-gradient(135deg, rgba(29, 161, 242, 0.3) 0%, rgba(29, 161, 242, 0.1) 100%)" },
    { name: "tiktok", icon: FaTiktok, url: "https://www.tiktok.com/@vibecircles", color: "rgba(0, 242, 234, 0.8)", gradient: "linear-gradient(135deg, rgba(0, 242, 234, 0.3) 0%, rgba(255, 0, 80, 0.3) 100%)" },
    { name: "docs", icon: FaBookOpen, url: "https://docs.vibescircles.co.za", color: "rgba(99, 102, 241, 0.8)", gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.2) 100%)" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "32px",
      }}
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        const isHovered = hoveredIcon === social.name;
        
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIcon(social.name)}
            onMouseLeave={() => setHoveredIcon(null)}
            className="social-icon"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: isHovered 
                ? social.gradient 
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${isHovered ? social.color : "rgba(255, 255, 255, 0.2)"}`,
              boxShadow: isHovered
                ? `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 40px ${social.color}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isHovered
                ? "scale(1.15) translateY(-4px)"
                : "scale(1) translateY(0)",
              animationDelay: `${index * 0.1}s`,
              animation: "fadeInUp 0.6s ease-out forwards",
              opacity: 0,
              willChange: "transform, box-shadow, background",
            }}
          >
            {/* Animated shimmer effect */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                  animation: "shimmer 1.5s infinite",
                  borderRadius: "16px",
                }}
              />
            )}
            
            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "120%",
                height: "120%",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${social.color} 0%, transparent 70%)`,
                opacity: isHovered ? 0.4 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
                filter: "blur(8px)",
              }}
            />
            
            <Icon
              style={{
                fontSize: "24px",
                color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                zIndex: 1,
                position: "relative",
                transition: "all 0.3s ease",
                filter: isHovered ? `drop-shadow(0 0 8px ${social.color})` : "none",
              }}
            />
          </a>
        );
      })}
      <style>{`
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get current theme from localStorage or DOM
    const getCurrentTheme = () => {
      const savedTheme = localStorage.getItem('data-theme');
      const currentTheme = savedTheme || 
        (typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 
        'dark';
      
      // If theme is 'system', resolve it
      let resolvedTheme: 'dark' | 'light' = 'dark';
      if (currentTheme === 'system' || !currentTheme) {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        resolvedTheme = currentTheme as 'dark' | 'light';
      }
      
      return resolvedTheme;
    };
    
    setTheme(getCurrentTheme());
    
    // Listen for storage changes (when theme is changed in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'data-theme') {
        const newTheme = getCurrentTheme();
        setTheme(newTheme);
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
        }
      }
    };
    
    // Listen for DOM attribute changes (when theme is changed via script)
    const observer = new MutationObserver(() => {
      const newTheme = getCurrentTheme();
      setTheme((prevTheme) => {
        if (newTheme !== prevTheme) {
          return newTheme;
        }
        return prevTheme;
      });
    });
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        observer.disconnect();
      };
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Update DOM
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('data-theme', newTheme);
    }
  }, [theme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: isDark
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)'
          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)',
        backdropFilter: 'blur(20px)',
        border: isDark 
          ? '1px solid rgba(255, 255, 255, 0.25)'
          : '1px solid rgba(99, 102, 241, 0.25)',
        boxShadow: isDark
          ? `
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 40px rgba(99, 102, 241, 0.3)
          `
          : `
            0 8px 32px rgba(99, 102, 241, 0.15),
            inset 0 1px 0 rgba(99, 102, 241, 0.3),
            0 0 40px rgba(99, 102, 241, 0.2)
          `,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(99, 102, 241, 0.9)',
        fontSize: '20px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isDark
          ? `
            0 8px 32px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 0 60px rgba(99, 102, 241, 0.5)
          `
          : `
            0 8px 32px rgba(99, 102, 241, 0.2),
            inset 0 1px 0 rgba(99, 102, 241, 0.4),
            0 0 60px rgba(99, 102, 241, 0.4)
          `;
        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isDark
          ? `
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 40px rgba(99, 102, 241, 0.3)
          `
          : `
            0 8px 32px rgba(99, 102, 241, 0.15),
            inset 0 1px 0 rgba(99, 102, 241, 0.3),
            0 0 40px rgba(99, 102, 241, 0.2)
          `;
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
      }}
    >
      {theme === 'dark' ? (
        <FaSun style={{ transition: 'transform 0.3s ease' }} />
      ) : (
        <FaMoon style={{ transition: 'transform 0.3s ease' }} />
      )}
    </button>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes number-flip {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        body, html {
          overflow-x: hidden;
          max-width: 100vw;
        }
      `}</style>
      <ThemeToggle />
      <StarField />
      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Column 
          fillWidth 
          center 
          padding="l" 
          style={{ 
            minHeight: "100vh", 
            position: "relative", 
            zIndex: 1,
          }}
        >
          <Column 
            maxWidth="s" 
            horizontal="center" 
            gap="l" 
            align="center"
          >
        <Badge
          className="fade-in-up"
          textVariant="code-default-s"
          border="neutral-alpha-medium"
          onBackground="neutral-medium"
          vertical="center"
          gap="16"
          style={{
            animationDelay: "0.2s",
            animationFillMode: "both",
            transition: "all 0.3s ease",
          }}
        >
          <Text marginX="4" style={{ fontWeight: "bold" }}>VibeCircles</Text>
          <Line vert background="neutral-alpha-strong" />
          <Text marginX="4">
            <LetterFx trigger="instant">Talk. Laugh. Be Real. – No filters, just friendships.</LetterFx>
          </Text>
        </Badge>
        <CountdownWatch />
        <Text
          className="fade-in-up main-heading"
          variant="heading-default-xl"
          onBackground="neutral-weak"
          wrap="balance"
          marginBottom="16"
          style={{
            animationDelay: "0.4s",
            animationFillMode: "both",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.89) 0%, rgba(242, 245, 253, 0.86) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 25px rgba(99, 102, 241, 0.25)",
            transition: "all 0.3s ease",
          }}
        >
           A place for positivity and people who vibe with you.
        </Text>
         <SocialMediaIcons />
          </Column>
        </Column>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
