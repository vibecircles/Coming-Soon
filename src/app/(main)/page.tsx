// Server component for critical static content (improves FCP)
import {
  Text,
  Column,
  Badge,
  Line,
} from "@once-ui-system/core";
import "./page-styles.css";
import { ClientContent } from "./ClientContent";

export default function Home() {
  return (
    <>
      {/* Critical static content rendered FIRST for fastest FCP */}
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
            {/* Critical static content rendered on server for instant FCP */}
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
              <Text marginX="4" id="badge-text">
                Talk. Laugh. Be Real. – No filters, just friendships.
              </Text>
            </Badge>
            
            {/* Placeholder for countdown - will be replaced by client component */}
            <div id="countdown-placeholder" style={{ minHeight: "300px", width: "100%" }} aria-label="Loading countdown" />
            
            {/* Main heading - static text for fast FCP */}
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

            {/* Placeholder for social icons - will be replaced by client component */}
            <div id="social-icons-placeholder" style={{ minHeight: "80px", width: "100%" }} aria-label="Loading social icons" />
          </Column>
        </Column>
      </div>
      {/* Client components load AFTER static content for better FCP */}
      <ClientContent />
    </>
  );
}