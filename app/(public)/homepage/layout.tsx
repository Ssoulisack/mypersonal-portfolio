"use client";
import "../../globals.css";
import { Navbar } from "@/app/components/layout/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <div className="mt-24">
                {children}
            </div>
        </>
    );
}
