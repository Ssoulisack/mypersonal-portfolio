"use client";

import MagicBento from "@/app/components/layout/MagicBento";
import { ShootingStars } from "@/app/components/shared/backgroundShootingStar";
import { BackgroundStart } from "@/app/components/shared/backgroundStart";
import { Hero } from "@/app/components/layout/Hero";
import { Preloading } from "@/app/components/layout/Preloading";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <Preloading/>
      <BackgroundStart />
      <ShootingStars />
      <div className="relative z-10 min-h-screen flex flex-col gap-y-2">
        <Hero />
        {/* Magic Bento Section with custom cards */}
        <MagicBento />
      </div>
    </div>
  );
}
