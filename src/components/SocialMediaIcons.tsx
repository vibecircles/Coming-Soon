"use client";

import { 
  FaTwitter, 
  FaInstagram, 
  FaTiktok, 
  FaFacebook,
  FaThreads,
  FaBookOpen,
} from "react-icons/fa6";
import "./SocialMediaIcons.css";

export function SocialMediaIcons() {
  const socialLinks = [
    { name: "facebook", icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61577760104699", color: "rgba(24, 119, 242, 0.8)", gradient: "linear-gradient(135deg, rgba(24, 119, 242, 0.3) 0%, rgba(24, 119, 242, 0.1) 100%)" },
    { name: "instagram", icon: FaInstagram, url: "https://www.instagram.com/vibecircles/", color: "rgba(225, 48, 108, 0.8)", gradient: "linear-gradient(135deg, rgba(225, 48, 108, 0.3) 0%, rgba(131, 58, 180, 0.3) 50%, rgba(253, 193, 7, 0.2) 100%)" },
    { name: "threads", icon: FaThreads, url: "https://www.threads.com/@vibecircles", color: "rgba(0, 0, 0, 0.8)", gradient: "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%)" },
    { name: "twitter", icon: FaTwitter, url: "https://x.com/vibecircles", color: "rgba(29, 161, 242, 0.8)", gradient: "linear-gradient(135deg, rgba(29, 161, 242, 0.3) 0%, rgba(29, 161, 242, 0.1) 100%)" },
    { name: "tiktok", icon: FaTiktok, url: "https://www.tiktok.com/@vibecircles", color: "rgba(0, 242, 234, 0.8)", gradient: "linear-gradient(135deg, rgba(0, 242, 234, 0.3) 0%, rgba(255, 0, 80, 0.3) 100%)" },
    { name: "docs", icon: FaBookOpen, url: "https://docs.vibescircles.co.za", color: "rgba(99, 102, 241, 0.8)", gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.2) 100%)" },
  ];

  return (
    <div className="social-icons-container">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-icon social-icon-${social.name}`}
            style={{
              '--social-color': social.color,
              '--social-gradient': social.gradient,
              '--animation-delay': `${index * 0.1}s`,
            } as React.CSSProperties}
          >
            <div className="social-icon-shimmer" />
            <div className="social-icon-glow" />
            <Icon className="social-icon-svg" />
          </a>
        );
      })}
    </div>
  );
}

