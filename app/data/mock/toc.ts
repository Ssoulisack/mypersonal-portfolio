import type { TocData } from "@/app/core/types/toc.type";

// Sample TOC data for development
export const sampleTocData: TocData = {
  items: [
    {
      id: 1,
      label: "Overview",
      href: "#overview",
      level: 0,
      icon: "🔍",
    },
    {
      id: 2,
      label: "Key Features",
      href: "#key-features",
      level: 0,
      icon: "🌟",
    },
    {
      id: 3,
      label: "Tech Stack",
      href: "#tech-stack",
      level: 0,
      icon: "🧪",
    },
    {
      id: 4,
      label: "Challenges & Learnings",
      href: "#challenges",
      level: 0,
      icon: "🧠",
    },
    {
      id: 5,
      label: "Outcome",
      href: "#outcome",
      level: 0,
      icon: "🎯",
    },
  ],
};

// Function to get TOC data for a specific work (can be extended later)
export function getTocDataBySlug(): TocData {
  // For now, return sample data. Later this can be dynamic based on slug
  return sampleTocData;
}
