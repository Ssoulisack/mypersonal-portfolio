"use client";
import "../../globals.css";
import { SidebarProvider, SidebarInset, SidebarTrigger, SidebarHeader } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/ui/app-sidebar";
import { useEffect, useState } from "react";
import { Separator } from "@/app/components/ui/separator";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SidebarHeader className="flex h-16 shrink-0 items-start justify-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 hover:cursor-pointer" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                    </div>
                </SidebarHeader>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
