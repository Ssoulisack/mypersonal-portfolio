"use client";

import React from "react";
import Image from "next/image";
import { LogoItem } from "@/app/core/types/logo.type";
import { cn } from "@/lib/utils";

// Map of icon names to their file paths
const iconMap: Record<string, string> = {
  typescript: "/assets/tool_icons/ts_icon.svg",
  vscode: "/assets/tool_icons/vscode_icon.svg",
  redis: "/assets/tool_icons/redis_icon.svg",
  tailwindcss: "/assets/tool_icons/tailwindcss_icon.svg",
  terminal: "/assets/tool_icons/terminal_icon.svg",
  nextjs: "/assets/tool_icons/nextjs_icon.svg",
  postgresql: "/assets/tool_icons/postgresql_icon.svg",
  react: "/assets/tool_icons/react_icon.svg",
  mongodb: "/assets/tool_icons/mongodb_icon.svg",
  mysql: "/assets/tool_icons/mysql_icon.svg",
  n8n: "/assets/tool_icons/n8n_icon.svg",
  linux: "/assets/tool_icons/linux_icon.svg",
  markdown: "/assets/tool_icons/markdown_icon.svg",
  jenkins: "/assets/tool_icons/jenkins_icon.svg",
  java: "/assets/tool_icons/java_icons.svg",
  javascript: "/assets/tool_icons/javascript_icon.svg",
  grafana: "/assets/tool_icons/grafana_icon.svg",
  html: "/assets/tool_icons/html_icon.svg",
  go: "/assets/tool_icons/go_icon.svg",
  git: "/assets/tool_icons/git_icon.svg",
  github: "/assets/tool_icons/github_icon.svg",
  css: "/assets/tool_icons/css_icon.svg",
  cursor: "/assets/tool_icons/cursor_icon.svg",
  docker: "/assets/tool_icons/docker_icon.svg",
  elastic: "/assets/tool_icons/elastic_icon.svg",
  aws: "/assets/tool_icons/aws_icon.svg",
  bash: "/assets/tool_icons/bash_icon.svg",
  cloudflare: "/assets/tool_icons/cloudflare_icon.svg",
  bun: "/assets/tool_icons/Bun_icon.svg",
  portainer: "/assets/tool_icons/Portainer_icon.svg",
  postman: "/assets/tool_icons/Postman_icon.svg",
  netlify: "/assets/tool_icons/netlify_icon.svg",
};

interface ToolIconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

/**
 * ToolIcon component - Renders SVG icons from the tool_icons folder
 */
export const ToolIcon: React.FC<ToolIconProps> = ({
  name,
  width = 20,
  height = 20,
  className,
  alt,
}) => {
  const iconPath = iconMap[name.toLowerCase()];
  
  if (!iconPath) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return (
    <Image
      src={iconPath}
      alt={alt || name}
      width={width}
      height={height}
      className={cn("object-contain", className)}
    />
  );
};

interface ToolIconListProps {
  icons: Array<{
    name: string;
    title?: string;
    ariaLabel?: string;
    href?: string;
  }>;
  size?: number;
  className?: string;
}

/**
 * ToolIconList component - Renders a list of tool icons
 */
export const ToolIconList: React.FC<ToolIconListProps> = ({
  icons,
  size = 20,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {icons.map((icon, index) => (
        <div
          key={`${icon.name}-${index}`}
          className="flex flex-col items-center gap-2"
          aria-label={icon.ariaLabel || icon.title || icon.name}
        >
          <ToolIcon
            name={icon.name}
            width={size}
            height={size}
            alt={icon.title || icon.name}
          />
          {icon.title && (
            <span className="text-xs text-muted-foreground">{icon.title}</span>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Converts icon data to LogoItem format for use with existing components
 */
export const createLogoItem = (
  iconName: string,
  title?: string,
  ariaLabel?: string,
  size: number = 20
): LogoItem => {
  return {
    title,
    ariaLabel,
    node: <ToolIcon name={iconName} width={size} height={size} alt={title || iconName} />,
  };
};

/**
 * Helper function to create multiple LogoItems from icon names
 */
export const createLogoItems = (
  icons: Array<{ name: string; title?: string; ariaLabel?: string }>,
  size: number = 20
): LogoItem[] => {
  return icons.map((icon) =>
    createLogoItem(icon.name, icon.title, icon.ariaLabel, size)
  );
};

// Export icon map for reference
export { iconMap };
