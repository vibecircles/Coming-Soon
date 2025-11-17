"use client";

import { FaXTwitter, FaLinkedin, FaDiscord } from "react-icons/fa6";
import { social } from "@/resources/once-ui.config";

export function SocialMediaIcons() {
  const icons = [
    {
      name: "Twitter",
      icon: FaXTwitter,
      href: social.twitter,
      color: "var(--brand-on-background-strong)",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: social.linkedin,
      color: "var(--brand-on-background-strong)",
    },
    {
      name: "Discord",
      icon: FaDiscord,
      href: social.discord,
      color: "var(--brand-on-background-strong)",
    },
  ];

  return (
    <div
      className="fade-in-up"
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        justifyContent: "center",
        animationDelay: "0.6s",
        animationFillMode: "both",
      }}
    >
      {icons.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${item.name} page`}
            className="social-icon"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--neutral-alpha-medium)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--neutral-alpha-weak)",
              color: item.color,
              textDecoration: "none",
              transition: "all 0.3s ease",
              transform: "translateZ(0)",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--neutral-alpha-strong)";
              e.currentTarget.style.transform = "scale(1.1) translateZ(0)";
              e.currentTarget.style.borderColor = "var(--brand-alpha-medium)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--neutral-alpha-medium)";
              e.currentTarget.style.transform = "scale(1) translateZ(0)";
              e.currentTarget.style.borderColor = "var(--neutral-alpha-weak)";
            }}
          >
            <Icon style={{ fontSize: "24px" }} />
          </a>
        );
      })}
    </div>
  );
}
