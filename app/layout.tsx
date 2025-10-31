import type { Metadata } from "next";
import "./globals.css";
import { Doto, Outfit, Instrument_Serif, Geist_Mono } from "next/font/google";

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  weight: ["500", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600", "700", "800", "900"],
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
        className={`${doto.variable} ${instrumentSerif.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
        suppressHydrationWarning
        style={{ fontFamily: outfit.style.fontFamily }}
      >
        {children}
      </body>
    </html>
  );
}
