"use client";
import { SidebarProvider } from "@/app/components/ui/sidebar";
import "../../globals.css";
import { AppSidebar } from "@/app/components/layout/app-sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                {/* <main className="pb-20 lg:pb-0"> */}
                    {children}
                {/* </main> */}
            </SidebarProvider>
        </>
    );
}
