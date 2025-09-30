"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Home,
    User,
    LayoutDashboard,
    Mail,
    Code,
    Briefcase,
    GraduationCap,
    Share
} from "lucide-react"

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

export function NavMain() {
    const pathname = usePathname()

    return (
        <nav className="space-y-2">
            {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                            isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {item.title}
                    </Link>
                )
            })}
        </nav>
    )
}
