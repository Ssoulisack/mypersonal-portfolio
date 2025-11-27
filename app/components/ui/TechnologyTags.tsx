"use client";

import { programmingLanguages } from "@/app/data/mock/programing";
import { LogoItem } from "@/app/core/types/logo.type";
import { Code, Database, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpotifyEmbed } from "@/app/components/ui/SpotifyEmbed";
import { useEffect, useRef, useState } from "react";

interface InfiniteSlideProps {
  items: LogoItem[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast" | number; // number is duration in seconds
  className?: string;
}

const InfiniteSlide: React.FC<InfiniteSlideProps> = ({
  items,
  direction = "left",
  speed = "normal",
  className,
}) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [itemWidths, setItemWidths] = useState<number[]>([]);

  // Convert speed to duration
  const getDuration = () => {
    if (typeof speed === "number") return `${speed}s`;
    switch (speed) {
      case "slow":
        return "60s";
      case "fast":
        return "20s";
      case "normal":
      default:
        return "40s";
    }
  };

  // Measure item widths
  useEffect(() => {
    const widths = itemRefs.current
      .filter((ref) => ref !== null)
      .map((ref) => ref?.offsetWidth || 100);

    setItemWidths(widths);
  }, [items]);

  const itemsLength = items.length;
  const itemWidth = 100; // Fallback width

  return (
    <div
      className={cn(
        "flex justify-center items-center relative overflow-hidden w-full h-12",
        className
      )}
      style={
        {
          "--animation-duration": getDuration(),
          "--item-width": `${itemWidth}px`,
          "--items-length": itemsLength,
        } as React.CSSProperties
      }
    >
      {/* Hidden items for measurement */}
      <div className="absolute opacity-0 pointer-events-none -z-10">
        {items.map((item, index) => (
          <div
            key={`measure-${item.title}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="flex items-center px-2 py-1 rounded-md border border-white/10 whitespace-nowrap"
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              {item.node}
            </div>
          </div>
        ))}
      </div>

      {/* Visible animated items */}
      {items.map((item, index) => {
        const totalItems = items.length;
        const duration = parseFloat(getDuration());

        // Calculate cumulative width for equal spacing between items
        const itemsGap = 36;
        let cumulativeWidth = 0;
        for (let i = 0; i < index; i++) {
          cumulativeWidth += (itemWidths[i] || itemWidth) + itemsGap;
        }
        const spacingOffset = cumulativeWidth;

        // Calculate delay using the formula: calc(duration / totalItems * (totalItems - index) * -1)
        const delay = `calc(${duration}s / ${totalItems} * (${totalItems} - ${index + 1}) * -1)`;

        // Start position: account for actual item widths + gaps
        const startPosition = direction === "left"
          ? `calc(100% + ${spacingOffset}px)`
          : `calc(100% - ${spacingOffset}px)`;

        return (
          <div
            key={`${item.title}-${index}`}
            className={cn(
              "absolute flex items-center px-2 py-1 rounded-md transition-all duration-200 cursor-pointer hover:scale-[1.15]",
              direction === "left" ? "animate-slideToLeft" : "animate-slideToRight"
            )}
            style={{
              left: startPosition,
              animationDelay: delay,
              top: 0, // Ensure all items are on the same vertical layer
            } as React.CSSProperties}
          >
            <div className="w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                {item.node}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface TechnologySectionProps {
  title: string;
  icon: React.ReactNode;
  items: LogoItem[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast" | number;
}

const TechnologySection: React.FC<TechnologySectionProps> = ({
  title,
  icon,
  items,
  direction = "left",
  speed = "normal",
}) => {
  return (
    <div className="flex flex-col items-center justify-center lg:gap-4 w-full">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h3 className="text-sm font-semibold text-gray-500]">{title}</h3>
      </div>

      {/* Infinite Sliding Tags */}
      <InfiniteSlide items={items} direction={direction} speed={speed} />
    </div>
  );
};

export const TechnologyTags = () => {
  // Categorize programming languages
  programmingLanguages.filter(
    (item) =>
      item.ariaLabel === "Backend" ||
      item.ariaLabel === "Frontend" ||
      item.ariaLabel === "Tools" ||
      item.ariaLabel === "Database"
  );

  const backend = programmingLanguages.filter(
    (item) => item.ariaLabel === "Backend"
  );

  const databases = programmingLanguages.filter(
    (item) => item.ariaLabel === "Database"
  );

  const frontend = programmingLanguages.filter(
    (item) => item.ariaLabel === "Frontend"
  );

  const tools = programmingLanguages.filter(
    (item) => item.ariaLabel === "Tools"
  );

  return (
    <div className="flex flex-col gap-5 p-4 w-full">
      <TechnologySection
        title="Frontend"
        icon={<Code className="size-4 text-[var(--nav-fg)]" />}
        items={frontend}
        direction="right"
        speed="fast"
      />
      <TechnologySection
        title="Backend"
        icon={<Code className="size-4 text-[var(--nav-fg)]" />}
        items={backend}
        direction="left"
        speed="fast"
      />
      <TechnologySection
        title="Database"
        icon={<Database className="size-4 text-[var(--nav-fg)]" />}
        items={databases}
        direction="right"
        speed="fast"
      />
      <TechnologySection
        title="Tools"
        icon={<Wrench className="size-4 text-[var(--nav-fg)]" />}
        items={tools}
        direction="left"
        speed={10}
      />

      <div className="relative pt-6 flex flex-col items-center justify-center">
        {/* Gradient Border Top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
        {/* Optional: Add a subtle glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"></div>
        {/* Adding spotify embed */}
        <p className="font-instrument-serif text-md text-[var(--nav-fg)]/70 text-center italic">
          I am still learning. Hopefully I can keep getting better and not stop where i am now.
        </p>
        <SpotifyEmbed className="hidden xl:block top-4 xl:top-16" width="450px" height="300px" />
      </div>
    </div>
  );
};

