"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { StickyScrollProps } from "@/app/core/types/sticky-scroll.type";

// Sub-component: Scrollable card list
interface ScrollableCardListProps {
  content: StickyScrollProps["content"];
  activeCard: number;
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  setActiveCard: (index: number) => void;
}


export const StickyScroll = ({ content, limit }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Limit content if limit prop is provided
  const displayedContent = limit ? content.slice(0, limit) : content;

  // Track which card is in view using Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const intersectionRatios = new Map<number, number>();

    // Require cards to be more centered in viewport
    const options = {
      root: null,
      rootMargin: "-30% 0px -30% 0px", // Card must be in middle 60% of viewport
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const updateActiveCard = () => {
      let maxRatio = 0;
      let maxIndex = 0;

      intersectionRatios.forEach((ratio, index) => {

        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxIndex = index;
        }
      });

      if (maxRatio > 0) {
        setActiveCard(maxIndex);
      }
    };

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          intersectionRatios.set(index, entry.intersectionRatio);
        });
        updateActiveCard();
      }, options);

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      intersectionRatios.clear();
    };
  }, [displayedContent.length]);

  const activeItem = displayedContent[activeCard];

  return (
    <motion.div
      className="container mx-auto relative flex flex-col gap-12 lg:flex-row "
    >
      <ScrollableCardList
        content={displayedContent}
        activeCard={activeCard}
        sectionRefs={sectionRefs}
        setActiveCard={setActiveCard}
      />
      <ActiveCardDisplay activeItem={activeItem} activeCard={activeCard} />
    </motion.div>
  );
};

const ScrollableCardList = ({
  content,
  activeCard,
  sectionRefs,
}: ScrollableCardListProps) => (
  <div
    className=" flex flex-col gap-y-6 px-16 lg:max-w-[50%] "
  >
    {content.map((item, index) => (
      <CardSection
        key={`${item.title}-${index}`}
        item={item}
        isActive={index === activeCard}
        ref={(el) => {
          sectionRefs.current[index] = el;
        }}
      />
    ))}
  </div>
);

// Sub-component: Individual card section
interface CardSectionProps {
  item: StickyScrollProps["content"][number];
  isActive: boolean;
}

const CardSection = React.forwardRef<HTMLElement, CardSectionProps>(
  ({ item }, ref) => {
    const cardContent = (
      <section
        ref={ref}
        className={
          "flex flex-col gap-y-6 lg:flex-row h-[80%] w-full rounded-3xl transition-all duration-500 cursor-pointer"
        }
      >
        <div key={`content-${item.title}`} className="w-full h-[100%] transition-opacity shadow-2xl duration-300 opacity-90 hover:opacity-70 bg-black/80 border border-white/10 rounded-2xl px-4 py-2 overflow-hidden flex items-center justify-center">
          {item.content}
        </div>
        <div className="block lg:hidden">
          <h2 className="text-2xl font-semibold text-white break-words">
            {item.title}
          </h2>
          <p className="text-sm text-white/80 break-words whitespace-normal">
            {item.description}
          </p>
        </div>
      </section>
    );

    // If item has a slug, wrap with Link for navigation
    if (item.slug) {
      return (
        <Link href={`/works/${item.slug}`} className="block">
          {cardContent}
        </Link>
      );
    }

    return cardContent;
  }
);

CardSection.displayName = "CardSection";

// Sub-component: Active card display
interface ActiveCardDisplayProps {
  activeItem: StickyScrollProps["content"][number] | undefined;
  activeCard: number;
}

const ActiveCardDisplay = ({ activeItem, activeCard }: ActiveCardDisplayProps) => {
  if (!activeItem) return null;

  const cardNumber = String(activeCard + 1).padStart(2, "0");

  return (
    <div className="hidden lg:block lg:w-1/2 lg:self-start sticky top-32">
      <div className="w-full rounded-2xl p-5 text-left text-white shadow-lg">
        <span className="text-sm font-semibold uppercase tracking-wide text-white/70">
          {cardNumber}
        </span>
        <h2 className="mt-2 text-xl font-semibold text-white break-words">
          {activeItem.title}
        </h2>
        <p className="mt-2 text-sm text-white/80 break-words whitespace-normal">
          {activeItem.description}
        </p>
      </div>
    </div>

  );
};