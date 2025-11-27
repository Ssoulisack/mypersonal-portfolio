import type { TocData } from "@/app/core/types/toc.type";

// Sample TOC data for development
export const sampleTocData: TocData = {
  items: [
    {
      id: "overview",
      label: "Overview",
      href: "#overview",
      level: 0,
      icon: "🔍",
    },
    {
      id: "key-features",
      label: "Key Features",
      href: "#key-features",
      level: 0,
      icon: "🌟",
    },
    {
      id: "tech-stack",
      label: "Tech Stack",
      href: "#tech-stack",
      level: 0,
      icon: "🧪",
    },
    {
      id: "challenges",
      label: "Challenges & Learnings",
      href: "#challenges",
      level: 0,
      icon: "🧠",
      // subContent: [
      //   {
      //     id: "nextjs-ecosystem",
      //     label: "Adopting the Next.js 15 Ecosystem",
      //     href: "#nextjs-ecosystem",
      //     level: 1,
      //     icon: "🔄",
      //   },
      //   {
      //     id: "cms-syncing",
      //     label: "Real-Time CMS Syncing",
      //     href: "#cms-syncing",
      //     level: 1,
      //     icon: "⚙️",
      //   },
      //   {
      //     id: "authjs",
      //     label: "Auth.js Integration",
      //     href: "#authjs",
      //     level: 1,
      //     icon: "🔒",
      //   },
      //   {
      //     id: "design",
      //     label: "Design & Component Composition",
      //     href: "#design",
      //     level: 1,
      //     icon: "🧩",
      //   },
      // ],
    },
    {
      id: "outcome",
      label: "Outcome",
      href: "#outcome",
      level: 0,
      icon: "🎯",
    },
  ],
};

// Function to get TOC data for a specific work (can be extended later)
export function getTocDataBySlug(slug: string): TocData {
  // For now, return sample data. Later this can be dynamic based on slug
  return sampleTocData;
}
