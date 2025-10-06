"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils";
import {
    Home,
    User,
    LayoutDashboard,
    Mail,
    Code,
    Briefcase,
    GraduationCap,
    Share
} from "lucide-react";
import { GlassIconsProps } from "@/app/core/types/glassItems.type";

const navigationItems = [
    {
        title: "OVERVIEWS",
        href: "/homepage",
        icon: LayoutDashboard,
    },
    {
        title: "PROFILE",
        href: "/homepage/profile",
        icon: User,
    },
    {
        title: "SKILLS",
        href: "/homepage/skills",
        icon: Code,
    },
    {
        title: "PROJECTS",
        href: "/homepage/projects",
        icon: Briefcase,
    },
    {
        title: "EXPERIENCE",
        href: "/homepage/experience",
        icon: GraduationCap,
    },
    {
        title: "SOCIAL MEDIA",
        href: "/homepage/social-media",
        icon: Share,
    },
    {
        title: "CONTACT ME",
        href: "/homepage/contact",
        icon: Mail,
    },
]

const gradientMapping: Record<string, string> = {
    blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
    purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
    red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
    indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
    orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
    green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
    const getBackgroundStyle = (color: string): React.CSSProperties => {
        if (gradientMapping[color]) {
            return { background: gradientMapping[color] };
        }
        return { background: color };
    };

    return (
        <div className={`grid grid-cols-2 grid-rows-3 justify-items-center gap-y-18 overflow-visible ${className || ''}`}>
            {items.map((item, index) => (
                <button
                    key={index}
                    type="button"
                    aria-label={item.label}
                    className={`relative bg-transparent outline-none w-[3em] h-[3em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out group ${item.customClass || ''
                        }`}
                >
                    <span
                        className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
                        style={{
                            ...getBackgroundStyle(item.color),
                            boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)'
                        }}
                    ></span>

                    <span
                        className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
                        style={{
                            boxShadow: '0 0 0 0.1em hsla(0, 100%, 100%, 0.3) inset',
                        }}
                    >
                        <span className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center" aria-hidden="true">
                            {item.icon}
                        </span>
                    </span>

                    <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
                        {item.label}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default GlassIcons;
