"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Heading,
  Text,
  Column,
} from "@once-ui-system/core";

export function CountdownWatch() {
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

        // Only update state if values actually changed to reduce re-renders
        const newTime = { days, hours, minutes, seconds };
        const hasChanged = 
          days !== prevTimeRef.current.days ||
          hours !== prevTimeRef.current.hours ||
          minutes !== prevTimeRef.current.minutes ||
          seconds !== prevTimeRef.current.seconds;

        if (hasChanged) {
          // Batch state updates
          setTimeLeft(newTime);

          // Trigger animation if value changed (use requestAnimationFrame for smoother updates)
          requestAnimationFrame(() => {
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
          });

          prevTimeRef.current = newTime;
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    // Use setInterval with requestAnimationFrame for smoother updates
    const interval = setInterval(() => {
      requestAnimationFrame(updateCountdown);
    }, 1000);

    return () => clearInterval(interval);
  }, [getTargetTime]);

  const formatTime = (value: number, isDays = false) => {
    return isDays ? value.toString().padStart(3, "0") : value.toString().padStart(2, "0");
  };

  const TimeUnit = ({ value, label, isAnimating }: { value: string; label: string; isAnimating: boolean }) => {
    return (
      <Column
        align="center"
        gap="xs"
        style={{
          position: "relative",
        }}
      >
        <div
          className="countdown-time-unit countdown-time-unit-wrapper"
          style={{
            position: "relative",
            padding: "24px 32px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 40px rgba(99, 102, 241, 0.3)",
            minWidth: "100px",
            transition: "box-shadow 0.2s ease-out",
            cursor: "pointer",
            transform: "translateZ(0)",
            willChange: "box-shadow",
            backfaceVisibility: "hidden",
          }}
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
          className="countdown-time-unit-glow"
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
            transition: "opacity 0.2s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
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

