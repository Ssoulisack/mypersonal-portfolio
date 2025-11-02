"use client";

import { programmingLanguages } from "@/app/data/mock/programing";
import { LogoItem } from "@/app/core/types/logo.type";
import { Code, Database, Wrench } from "lucide-react";

interface TechnologySectionProps {
  title: string;
  icon: React.ReactNode;
  items: LogoItem[];
}

const TechnologySection: React.FC<TechnologySectionProps> = ({ title, icon, items }) => {
  // Split items into 3 rows (chunks of ~3-4 items per row)
  const itemsPerRow = Math.ceil(items.length / 3);
  const rows = [];
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow));
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h3 className="text-sm font-semibold text-[var(--nav-fg)]">{title}</h3>
      </div>

      {/* Tags Grid - 3 Rows */}
      <div className="flex flex-col gap-1.5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-1.5">
            {row.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/10 bg-[rgba(66,66,66,0.3)] hover:bg-[rgba(66,66,66,0.4)] transition-all duration-200 cursor-pointer hover:scale-[1.05] backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                  {item.node}
                </div>
                <span className="text-xs text-[var(--nav-fg)] whitespace-nowrap font-medium">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const TechnologyTags = () => {
  // Categorize programming languages
  const frameworksAndLanguages = programmingLanguages.filter(
    (item) =>
      item.ariaLabel === "Framework" ||
      item.ariaLabel === "Programming Language" ||
      item.ariaLabel === "CSS Framework"
  );

  const databases = programmingLanguages.filter(
    (item) => item.ariaLabel === "Database"
  );

  const tools = programmingLanguages.filter(
    (item) => item.ariaLabel === "Tools"
  );

  return (
    <div className="flex flex-col gap-5 p-4 w-full max-w-4xl">
      <TechnologySection
        title="Framework and Language"
        icon={<Code className="size-4 text-[var(--nav-fg)]" />}
        items={frameworksAndLanguages}
      />
      <TechnologySection
        title="Database"
        icon={<Database className="size-4 text-[var(--nav-fg)]" />}
        items={databases}
      />
      <TechnologySection
        title="Tools"
        icon={<Wrench className="size-4 text-[var(--nav-fg)]" />}
        items={tools}
      />
    </div>
  );
};

