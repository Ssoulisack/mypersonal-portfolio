"use client";
import "../../globals.css";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/ui/app-sidebar";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) {
    //     return (
    //         <html lang="en" suppressHydrationWarning>
    //             <body suppressHydrationWarning>
    //                 <div className="flex items-center justify-center min-h-screen">
    //                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    //                 </div>
    //             </body>
    //         </html>
    //     );
    // }

    return (
        <html lang="en">
            <body suppressHydrationWarning>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    );
}
