"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, PanelsTopLeft } from "lucide-react";
import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-card";

interface ProjectInfoCardProps {
    icon?: React.ReactNode;
    label?: string;
    title: string;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
    infiniteCardsItems?: {
        quote: string;
        name: string;
        title: string;
    }[];
    infiniteCardsDirection?: "left" | "right";
    infiniteCardsSpeed?: "fast" | "normal" | "slow";
}

export const ProjectInfoCard = ({
    icon,
    label = "The Inside Scoop",
    title,
    buttonText = "View Recent work",
    onButtonClick,
    className,
    infiniteCardsItems,
    infiniteCardsDirection = "left",
    infiniteCardsSpeed = "fast",
}: ProjectInfoCardProps) => {
    return (
        <div
            className={cn(
                "group relative flex w-[340px] h-[220px] sm:w-[560px] sm:h-[220px] md:w-[640px] md:h-[280px] lg:w-[530px] lg:h-[340px] xl:w-[720px] 2xl:w-[950px] flex-col justify-between overflow-hidden",
                className
            )}
        >
            <div className="size-full">
                {/* Infinite Moving Cards */}
                {infiniteCardsItems && infiniteCardsItems.length > 0 && (
                    <div className="flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row absolute top-0 left-0 right-0 font-instrument-serif [--duration:20s] [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)]">
                        <InfiniteMovingCards
                            items={infiniteCardsItems}
                            direction={infiniteCardsDirection}
                            speed={infiniteCardsSpeed}
                        />
                    </div>
                )}
            </div>

            {/* 
                Content Section
                FIX: Default (mobile/tablet) is static so content stacks naturally; lg+ uses absolute positioning + hover motion
                This prevents overlap on small screens while keeping hover animation on desktop
            */}
            <div className="pointer-events-none z-10 flex flex-col gap-1 px-6 md:p-6 transform-gpu transition-all duration-300 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:group-hover:-translate-y-10">
                {/* Icon */}
                {icon ? (
                    <div className="size-8 origin-left text-neutral-500 transform-gpu transition-all duration-300 ease-in-out lg:group-hover:scale-75">
                        {icon}
                    </div>
                ) : (
                    <PanelsTopLeft className="size-8 origin-left text-neutral-500 transform-gpu transition-all duration-300 ease-in-out lg:group-hover:scale-75" aria-hidden="true" />
                )}

                {/* Label */}
                <h3 className="max-w-lg font-geist-mono text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/70 to-white/20 drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)]">{label}</h3>

                {/* Title */}
                <p className="hidden md:block font-semibold text-sm md:text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-gray-500/90 via-white/70 to-white/20 drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-600/80 via-gray-500/80 to-gray-400/80 drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)]">
                        {title}
                    </span>
                </p>
            </div>

            {/* 
                Button CTA
                FIX: Default (mobile/tablet) keeps button visible and in normal flow; lg+ reintroduces hover reveal animation
            */}
            <div className="pointer-events-none flex w-full transform-gpu flex-row items-center px-4 py-1 md:py-4 text-base tracking-wider transition-all duration-300 z-20 translate-y-0 opacity-100 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:translate-y-10 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                <button
                    onClick={onButtonClick}
                    className="pointer-events-auto inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-medium text-xs md:text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5 hover:bg-gray-400/20 hover:text-white/80"
                >
                    {buttonText}
                    <ArrowRight className="size-4 " aria-hidden="true" />
                </button>
            </div>

            {/* Backdrop overlay on hover */}
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300group-hover:bg-neutral-800/10 z-0"></div>
        </div>
        
    );
};
