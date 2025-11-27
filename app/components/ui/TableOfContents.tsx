"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TocData } from '@/app/core/types/toc.type';

interface TableOfContentsProps {
  data: TocData;
  className?: string;
}

export function TableOfContents({ data, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(data.items[0]?.id || '');
  const [scrollProgress, setScrollProgress] = useState({ top: 0, height: 0 });
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Update progress indicator when activeId or refs change
  useEffect(() => {
    const updateProgress = () => {
      const activeLink = itemRefs.current.get(activeId);
      const container = linksContainerRef.current;
      
      if (activeLink && container) {
        // Get the links wrapper (flex-col div)
        const linksWrapper = activeLink.parentElement?.parentElement;
        
        if (linksWrapper) {
          // Calculate position relative to the container's content area
          // The container has py-3 (12px top padding), and the progress indicator is at top-0
          const containerRect = container.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          
          // Position relative to container's top edge (accounting for padding)
          // The container's padding pushes content down by 12px, so we need to account for that
          const top = linkRect.top - containerRect.top;
          const height = linkRect.height;
          
          setScrollProgress({ top, height });
        }
      } else {
        // Reset if no active link found
        setScrollProgress({ top: 0, height: 0 });
      }
    };

    // Use a small delay to ensure refs are set after render
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updateProgress);
    }, 10);
    
    // Also update when container scrolls (if TOC itself is scrollable)
    const container = linksContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateProgress);
      return () => {
        clearTimeout(timeoutId);
        container.removeEventListener('scroll', updateProgress);
      };
    }
    
    return () => clearTimeout(timeoutId);
  }, [activeId, data.items]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = data.items
        .map((item) => {
          const element = document.querySelector(item.href);
          if (!element) return null;
          
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            element,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
          };
        })
        .filter((section): section is NonNullable<typeof section> => section !== null);

      // Always start with overview when at the top
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY < 250) {
        setActiveId(data.items[0]?.id || '');
        return;
      }

      if (sections.length === 0) {
        return;
      }

      // Use a higher threshold - require more scrolling before switching
      // This makes the TOC wait until more content has scrolled past
      // Using 60% of viewport height means the section needs to scroll much further down
      const threshold = window.innerHeight * 0.5;
      let activeSection = data.items[0]?.id || '';

      // Find the last section that has scrolled past the threshold
      // This ensures we wait for more content to pass before switching
      for (let i = sections.length - 1; i >= 0; i--) {
        // Only switch when the section's top has scrolled significantly past
        if (sections[i].top <= threshold) {
          activeSection = sections[i].id;
          break;
        }
      }

      setActiveId(activeSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.items]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      id="nd-toc"
      className={cn(
        'sticky pb-2 pt-12 max-xl:hidden',
        className
      )}
      style={{
        top: 'calc(var(--fd-banner-height, 0px) + var(--fd-nav-height, 64px))',
        height: 'calc(100dvh - var(--fd-banner-height, 0px) - var(--fd-nav-height, 64px))',
      }}
    >
      <div className="flex h-full w-[var(--fd-toc-width,240px)] max-w-full flex-col pe-4">
        <div className="h-10"></div>
        
        <h3 className="inline-flex items-center gap-1.5 text-sm text-white/70 mb-4">
          <Menu className="size-4" />
          On this page
        </h3>

        <div 
          ref={linksContainerRef}
          className="relative min-h-0 text-sm ms-px overflow-auto [scrollbar-width:none] [mask-image:linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] py-3"
        >
          {/* Progress indicator */}
          <div
            className="absolute start-0 top-0 rtl:-scale-x-100 pointer-events-none"
            style={{
              width: '12px',
              height: '100%',
            }}
          >
            {scrollProgress.height > 0 && (
              <div
                role="none"
                className="bg-white/20 transition-all duration-200 rounded-sm"
                style={{
                  marginTop: `${scrollProgress.top}px`,
                  height: `${scrollProgress.height}px`,
                  width: '2px',
                }}
              />
            )}
          </div>

          {/* TOC Links */}
          <div className="flex flex-col">
            {data.items.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) {
                      itemRefs.current.set(item.id, el);
                    } else {
                      itemRefs.current.delete(item.id);
                    }
                  }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    data-active={isActive}
                    className={cn(
                      'prose relative py-1.5 text-sm transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 block',
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white/80',
                      'group'
                    )}
                    style={{ paddingInlineStart: '10px' }}
                  >
                  {/* Vertical line indicator */}
                  <div
                    className={cn(
                      'absolute inset-y-0 w-px bg-white/10 transition-colors',
                      isActive && 'bg-white/30',
                      index < data.items.length - 1 && 'bottom-1.5'
                    )}
                    style={{ insetInlineStart: '0px' }}
                  />

                  {/* Connector line for nested items */}
                  

                  {/* Closing connector for last nested item */}
                  {index < data.items.length - 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      className="absolute -top-1.5 start-0 size-4 rtl:-scale-x-100 pointer-events-none"
                    >
                      {/* <line
                        x1="10"
                        y1="0"
                        x2="0"
                        y2="12"
                        className="stroke-white/10"
                        strokeWidth="1"
                      /> */}
                    </svg>
                  )}

                  {/* Item label with icon */}
                  <span className="relative z-10">
                    {item.icon && <span className="mr-1">{item.icon}</span>}
                    {item.label}
                  </span>
                </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

