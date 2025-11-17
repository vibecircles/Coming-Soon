import React from "react";
import { 
  Column, 
  Row, 
  Heading, 
  Text, 
  Button, 
  Grid,
  Media, 
  Line, 
  StatusIndicator,
  Badge,
  Tag,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, meta, schema, roadmap, routes } from "@/resources";
import { PageList } from "@/product/PageList";

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    image: meta.home.image
  });
}

// Calculate roadmap progress stats
const calculateRoadmapStats = () => {
  let totalTasks = 0;
  let inProgressTasks = 0;
  let completedTasks = 0;
  
  roadmap.forEach(product => {
    product.columns.forEach(column => {
      totalTasks += column.tasks.length;
      
      if (column.title === "In Progress") {
        inProgressTasks += column.tasks.length;
      }
      
      if (column.title === "Done") {
        completedTasks += column.tasks.length;
      }
    });
  });
  
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return {
    totalTasks,
    inProgressTasks,
    completedTasks,
    progressPercentage
  };
};

const roadmapStats = calculateRoadmapStats();

export default function Home() {
  return (
    <Column maxWidth={56} gap="xl">
      <Schema
        as="webPage"
        title={meta.home.title}
        description={meta.home.description}
        baseURL={baseURL}
        path={meta.home.path}
        author={{
          name: schema.name
        }}
      />
      
      {/* Hero Section */}
      <Column fillWidth gap="l" paddingTop="l">
        <Row fillWidth gap="l">
          <Column maxWidth="xs" gap="12">
          <Badge
              background="overlay"
              paddingLeft="4"
              paddingRight="16"
              paddingY="4"
              border="neutral-alpha-medium"
              href="/frontend-development/project-overview"
              vertical="center"
              marginBottom="12"
            >
                <Tag marginRight="12">VibeCircles</Tag>
                <Text
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Development Documentation
                </Text>
            </Badge>
            <Heading variant="display-strong-s">
              VibeCircles Docs
            </Heading>
            <Text wrap="balance" onBackground="neutral-weak" variant="body-default-xl" marginBottom="20">
              Comprehensive documentation for the VibeCircles platform, covering frontend and backend development, architecture, and best practices.
            </Text>
          </Column>
        </Row>
      </Column>

      <Column fillWidth>
        <Column fillWidth>
          <Text 
            variant="display-default-s" 
            onBackground="neutral-strong"
          >
            Products
          </Text>
          <Text
            onBackground="neutral-weak"
            marginTop="8"
          >
            Deploy your docs in minutes
          </Text>
        </Column>
        <PageList depth={1} thumbnail={true} marginTop="24" minHeight={14}/>
      </Column>
      
      {/* Roadmap Progress Section */}
      <Column 
        maxWidth={56}
        background="overlay"
        radius="l"
        border="neutral-alpha-weak"
      >
        <Column paddingX="32" paddingY="24" fillWidth horizontal="between" s={{direction: "column"}} gap="4">
          <Row fillWidth vertical="center" horizontal="between" gap="16" wrap>
            <Heading as="h2" variant="display-default-xs">
              Dev Stage Roadmap
            </Heading>
            <Button data-border="rounded" weight="default" variant="secondary" href="/roadmap" size="s" suffixIcon="chevronRight">
            View Roadmap
          </Button>
          </Row>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Progress and task status
          </Text>
        </Column>
        
        <Line background="neutral-alpha-weak" />
        
        <Row fillWidth padding="32" gap="20" position="relative" s={{direction: "column"}}>
          <Row fillWidth gap="12">
            {/* Overall Progress */}
            <Column fillWidth gap="8" paddingTop="8">
              <Column fillWidth gap="20">
                <Column fillWidth horizontal="center" gap="4">
                  <Text 
                    variant="display-strong-l" 
                    onBackground="neutral-strong"
                  >
                    {roadmapStats.progressPercentage}%
                  </Text>
                  <Text 
                    align="center"
                    variant="label-default-s" 
                    onBackground="neutral-weak"
                    marginTop="8"
                  >
                    Overall progress
                  </Text>
                </Column>
                
                <Row
                  height="8"
                  fillWidth
                  overflow="hidden"
                  radius="full"
                  background="neutral-alpha-weak"
                  border="neutral-alpha-weak"
                >
                  <Row
                    fillHeight
                    radius="full"
                    transition="micro-medium"
                    solid="brand-strong"
                    style={{ 
                    width: `${roadmapStats.progressPercentage}%`,
                  }} />
                </Row>
              </Column>
              
              {/* Task Status */}
              <Grid fillWidth columns="3" s={{columns: "1"}} gap="8" marginTop="24">
                {/* Planned Tasks */}
                <Column 
                  padding="l" 
                  horizontal="center"
                  radius="m" 
                  border="neutral-alpha-weak" 
                  background="overlay"
                  gap="s"
                >
                  <Text 
                    variant="display-default-m" 
                    onBackground="neutral-strong"
                  >
                    {roadmapStats.totalTasks - roadmapStats.completedTasks - roadmapStats.inProgressTasks}
                  </Text>
                  <Row vertical="center" gap="8">
                    <StatusIndicator color="blue" />
                    <Text 
                      variant="label-default-s" 
                      onBackground="neutral-weak"
                    >
                      Planned
                    </Text>
                  </Row>
                </Column>
                
                {/* In Progress Tasks */}
                <Column 
                  padding="l" 
                  horizontal="center"
                  radius="m" 
                  border="neutral-alpha-weak" 
                  background="overlay"
                  gap="s"
                >
                  <Text 
                    variant="display-default-m" 
                    onBackground="neutral-strong"
                  >
                    {roadmapStats.inProgressTasks}
                  </Text>
                  <Row vertical="center" gap="8">
                    <StatusIndicator color="yellow" />
                    <Text 
                      variant="label-default-s" 
                      onBackground="neutral-weak"
                    >
                      In progress
                    </Text>
                  </Row>
                </Column>

                {/* Completed Tasks */}
                <Column 
                  padding="l" 
                  horizontal="center"
                  radius="m" 
                  border="neutral-alpha-weak" 
                  background="overlay"
                  gap="s"
                >
                  <Text 
                    variant="display-default-m" 
                    onBackground="neutral-strong"
                  >
                    {roadmapStats.completedTasks}
                  </Text>
                  <Row vertical="center" gap="8">
                    <StatusIndicator color="green" />
                    <Text 
                      variant="label-default-s" 
                      onBackground="neutral-weak"
                    >
                      Completed
                    </Text>
                  </Row>
                </Column>
              </Grid>
            </Column>
          </Row>
        </Row>
      </Column>
    </Column>
  );
}
