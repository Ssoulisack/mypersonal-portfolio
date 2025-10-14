"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

// Mobile Bottom Navigation (Instagram/Facebook style)
function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-transparent border-t border-border/50 lg:hidden">
      <div className="grid h-16 max-w-lg grid-cols-5 mx-auto">
        {items.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className={cn(
              "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-border group"
            )}
          >
            <item.icon className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary" />
            <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary">
              {item.title}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

// Desktop Sidebar
function DesktopSidebar() {
  return (
    <div className="hidden lg:block">
      <Sidebar>
        <SidebarHeader/>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

// Combined Component
export function AppSidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileBottomNav />
    </>
  )
}

