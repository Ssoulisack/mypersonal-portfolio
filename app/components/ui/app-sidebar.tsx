import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/app/components/ui/sidebar"
import { NavMain } from "@/app/components/layout/navMain"

export function AppSidebar() {
    return (
        <Sidebar variant="inset" side="left">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <NavMain />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}