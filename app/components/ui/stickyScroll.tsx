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

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Sub-component: Individual card section
const CardSection = React.forwardRef<HTMLElement, CardSectionProps>(
  ({ item }, ref) => {
    const cardContent = (
      <section
        ref={ref}
        className="flex flex-col gap-y-2 p-4 my-6 lg:my-12 lg:flex-row rounded-3xl transition-all duration-500 cursor-pointer"
      >
        {/* Card content with theme gradient background - Circle */}
          <div 
            key={item.id} 
            className="relative w-full max-w-[400px] aspect-square border border-white/10 rounded-full p-4 overflow-hidden flex items-center justify-center bg-gradient-to-br from-black-900 via-black-800 to-black-900 group will-change-transform transition-transform duration-150 ease-out hover:scale-101 hover:shadow-2xl mx-auto"
            style={{
              boxShadow: '0 0 0 0 transparent',
              transition: 'box-shadow 0.3s ease, opacity 0.3s ease',
            }}
          onMouseEnter={(e) => {
            const color = item.colorCode || "#2553f6";
            const colorRgba1 = hexToRgba(color, 1);
            const colorRgba2 = hexToRgba(color, 0.5);
            const colorRgba3 = hexToRgba(color, 0.25);
            e.currentTarget.style.boxShadow = 
              `0 0 20px 2px ${colorRgba1}, 0 0 40px 4px ${colorRgba2}, 0 0 60px 6px ${colorRgba3}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
          }}
        >
          <div className="relative w-full h-full">
            <Image 
              src={item.content || ""} 
              alt={item.title} 
              className="w-full h-full object-cover rounded-full transition-all duration-300 group-hover:brightness-[0.3]" 
              width={400} 
              height={400}
            />
            {/* Dark overlay + title on hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-xl md:text-2xl font-semibold text-center px-4 drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </div>
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

  const cardNumber = String(activeCard + 1);

  return (
    <div className="hidden lg:block lg:w-1/2 lg:self-start sticky top-32">
      <div className="flex justify-center items-center gap-x-2 p-4">
        <span className="text-3xl font-semibold font-instrument-serif text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/70 to-white/20 drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)]">
          {cardNumber}.{" "}
        </span>
        <span className="text-3xl font-semibold font-instrument-serif text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/70 to-white/20 drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)]">
          {activeItem.title}
        </span>
      </div>
      <hr className="border-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <p className="text-xl mt-2 text-white/80 break-words whitespace-normal">
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