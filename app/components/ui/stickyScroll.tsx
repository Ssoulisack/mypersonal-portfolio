"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { CardSectionProps, ActiveCardDisplayProps, ScrollableCardListProps, StickyScrollProps } from "@/app/core/types/sticky-scroll.type";
import Image from "next/image";

// Sub-component: Scrollable card list

export const StickyScroll = ({ content, limit }: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const activeCardRef = useRef(0);

  // Limit content if limit prop is provided
  const displayedContent = limit ? content.slice(0, limit) : content;

  // Track which card is in view using Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const intersectionRatios = new Map<number, number>();

    // Require cards to be more centered in viewport
    const options = {
      root: null,
      rootMargin: "-10% 0px -10% 0px", // Card must be in middle 80% of viewport
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

      if (maxRatio > 0.99 && maxIndex !== activeCardRef.current) {
        activeCardRef.current = maxIndex;
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
      className="container mx-auto relative flex gap-12 lg:flex-row "
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
    className=" flex flex-col gap-y-6 px-16 lg:w-1/2 "
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
const CardSection = React.forwardRef<HTMLElement, CardSectionProps>(
  ({ item }, ref) => {
    const cardContent = (
      <section
        ref={ref}
        className="flex flex-col gap-y-2 p-4 my-6 lg:my-12 lg:flex-row rounded-3xl transition-all duration-500 cursor-pointer"
      >
        <div key={item.id} style={{ backgroundColor: item.colorCode }} className="w-full h-[450px] transition-opacity shadow-2xl duration-300 opacity-90 hover:opacity-70 border border-white/10 rounded-2xl px-4 py-2 overflow-hidden flex items-center justify-center">
          <Image src={item.content || ""} alt={item.title} className="w-full h-[95%] object-cover rounded-lg" width={500} height={50} />
        </div>
        <div className="block md:hidden">
          <h2 className="text-base lg:text-2xl font-semibold text-white break-words">
            {item.title}
          </h2>
          <p className="hidden lg:block text-sm text-white/80 break-words whitespace-normal">
            {item.description}
          </p>
        </div>
      </section>
    );

    // If item has a slug, wrap with Link for navigation
    if (item.id) {
      return (
        <Link href={`/works/${item.id}`} className="block">
          {cardContent}
        </Link>
      );
    }

    return cardContent;
  }
);

CardSection.displayName = "CardSection";

// Sub-component: Active card display
const ActiveCardDisplay = ({ activeItem, activeCard }: ActiveCardDisplayProps) => {
  if (!activeItem) return null;

  const cardNumber = String(activeCard + 1).padStart(2, "0");

  return (
    <div className="hidden lg:block lg:w-1/2 lg:self-start sticky top-32">
      <div className="flex items-center gap-x-2 p-4">
        <span style={{ color: activeItem.colorCode }} className="text-lg font-semibold font-instrument-serif uppercase bg-white/90 p-2 rounded-3xl tracking-wide text-white/70">
          {cardNumber}
        </span>
        <span style={{ backgroundColor: activeItem.colorCode }} className="text-xl font-semibold font-instrument-serif text-white break-words rounded-2xl p-2">
          {activeItem.title}
        </span>
      </div>
      <p className="mt-2 text-sm text-white/80 break-words whitespace-normal">
        {activeItem.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {activeItem.techStack?.map((tech, index) => (
          <span key={index} className="flex items-center gap-2 mr-2 bg-white/10 p-2 rounded-2xl">
            {tech.icon && (
              <Image src={tech.icon} alt={tech.name} width={20} height={20} />
            )}
            {tech.name}
          </span>
        ))}
      </div>
    </div>

  );
};