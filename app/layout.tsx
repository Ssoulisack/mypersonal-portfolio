import type { Metadata } from "next";
import { Poppins, Ubuntu } from "next/font/google";
import "./globals.css";

const getUbuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const getPoppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700"],
  subsets: ["latin"],
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
        className={`${getUbuntu.variable} ${getPoppins.variable} antialiased`}
         cz-shortcut-listen="true"
         suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
