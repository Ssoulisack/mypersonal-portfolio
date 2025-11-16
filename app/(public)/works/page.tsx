import React from 'react';
import { StickyScroll } from '@/app/components/ui/stickyScroll';
import { worksData } from '@/app/data/mock/works';

export default function Works() {
  return (
    <main className="min-h-screen mx-auto px-4 flex flex-col gap-y-4 lg:gap-y-16 justify-end items-center py-4 lg:py-[15em]">
      <h1 className="text-4xl font-instrument-serif tracking-tight mb-8">WORKS</h1>
      <StickyScroll content={worksData} />
    </main>
  );
}
