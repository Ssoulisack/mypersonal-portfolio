import type { Metadata } from "next";
import "./globals.css";
import { Doto } from "next/font/google";

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "24thurs",
  description: "Personal website portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${doto.variable} antialiased`}
        cz-shortcut-listen="true"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
