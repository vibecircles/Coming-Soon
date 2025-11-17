import { layout, social } from "@/resources/once-ui.config";
import {
  Button,
  Column,
  Row,
  Text,
} from "@once-ui-system/core";

export const Footer = () => {
  return (
    <Column gap="40" fillWidth paddingY="xl" paddingX="l" horizontal="center" position="relative">
      <Row maxWidth={layout.footer.width} horizontal="center" gap="40" wrap paddingX="2">
        <Column data-border="rounded" gap="12" textVariant="label-default-m">
          <Row gap="8" wrap horizontal="center">
            {social.map((link, index) => (
              <Button key={index} href={link.link} weight="default" prefixIcon={link.icon} label={link.name} size="s" variant="secondary" />
            ))}
          </Row>
        </Column>
      </Row>
      <Row fillWidth maxWidth={layout.footer.width} horizontal="center" paddingTop="xl">
        <Text variant="label-default-s" onBackground="neutral-weak">
          VibeCircles © 2025. All rights reserved
        </Text>
      </Row>
    </Column>
  );
};
