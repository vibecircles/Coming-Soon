"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import "./ThemeToggle.css";

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

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
        startTransition(() => {
          setTheme(newTheme);
        });
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
        }
      }
    };
    
    // Listen for DOM attribute changes (when theme is changed via script)
    const observer = new MutationObserver(() => {
      const newTheme = getCurrentTheme();
      startTransition(() => {
        setTheme((prevTheme) => {
          if (newTheme !== prevTheme) {
            return newTheme;
          }
          return prevTheme;
        });
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
    startTransition(() => {
      setTheme((prevTheme) => {
        const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
        
        // Update DOM immediately for instant feedback
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('data-theme', newTheme);
        }
        
        return newTheme;
      });
    });
  }, []);

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
      className={`theme-toggle ${isDark ? 'theme-toggle-dark' : 'theme-toggle-light'}`}
    >
      {theme === 'dark' ? (
        <FaSun className="theme-toggle-icon" />
      ) : (
        <FaMoon className="theme-toggle-icon" />
      )}
    </button>
  );
}

