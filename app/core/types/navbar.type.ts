import { LucideIcon } from "lucide-react";

export type NavItemType = {
    icon?: LucideIcon;
    title: string;
    url: string;
    items?: NavItemType[];
    isActive?: boolean
};