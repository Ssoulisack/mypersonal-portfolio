import React from 'react';
import { StickyScroll } from '@/app/components/ui/stickyScroll';
import { worksData } from '@/app/data/mock/works';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { AnimatedArrow } from '@/app/components/ui/ArrowAnime';
import ShinyText from '@/app/components/ui/shinyText';

export default function Works() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-start items-center pt-8 lg:pt-16">
      <p className="text-sm font-geist-mono tracking-tight mb-4">FEATURED CASE STUDIES</p>
      <ShinyText className="text-5xl font-instrument-serif tracking-tight mb-8" text="Curated Works" />
      <StickyScroll content={worksData} limit={4} />
      <div className="flex items-center justify-center py-8 w-full">
        <Link href="/works">
          <Button 
            variant="outline" 
            className="group flex w-fit items-center justify-center gap-2 font-mono text-neutral-400 hover:text-neutral-300 hover:scale-110 transition-all duration-300 ease-in-out"
          >
            See more projects
            <AnimatedArrow ArrowClass="text-white/60" MainClass="border" />
          </Button>
        </Link>
      </div>
    </main>
  );
}