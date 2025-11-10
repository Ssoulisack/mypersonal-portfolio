"use client";

import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  width = "20%",
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  width?: string;
}) => {
  const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
  const count = items.length || 1;
  console.log("count", count);
  const cssVars: React.CSSProperties = {
    ['--count' as any]: String(count),
    ['--duration' as any]: duration,
    ['--item-width' as any]: width,
  };
  return (
    <div
      className={cn("tools-wrapper rounded-2xl relative my-4 min-w-[820px] lg:w-[820px] 2xl:w-[1140px] h-[220px] overflow-hidden px-3 z-0", pauseOnHover && "pause-on-hover", className)}
      style={cssVars}
    >
      {/* edge shadows to hint horizontal scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 z-[5] bg-gradient-to-r from-black/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 z-[5] bg-gradient-to-l from-black/70 to-transparent"
      />
      {items.map((item, idx) => {
        const delay = `calc(var(--duration) / ${count} * (${count} - ${idx + 1}) * -1)`;
        const animationName = direction === 'right' ? 'slideToRight' : 'slideToLeft';
        return (
          <div
            key={`${item.name}-${idx}`}
            className="item select-none"
            style={{
              animationDelay: delay,
              animationName,
            } as React.CSSProperties}
          >
            <div className="flex h-full w-full items-start justify-start rounded-xl py-4 border border-zinc-700/60 bg-[linear-gradient(180deg,#27272a,#18181b)] px-4 text-gray-100 shadow-[0_2px_10px_rgba(63,28,161,0.2)] blur-[1px] hover:shadow-[0_6px_16px_rgba(63,28,161,0.35)] hover:blur-none transition-shadow">
              <div className="flex w-full flex-col items-start justify-start gap-1">
                <span className="line-clamp-1 text-xs text-neutral-300">{item.quote}</span>
                <span className="text-[11px] text-neutral-400">{item.name}</span>
                <span className="text-[10px] text-neutral-500">{item.title}</span>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};