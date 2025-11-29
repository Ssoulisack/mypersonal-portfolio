"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Link2, BookHeart, CreditCard } from "lucide-react";

import type { MenuType } from "@/app/core/types/menu.type";
import { Button } from "../ui/button";

// Local config for hover dropdown delay
const DROPDOWN_CLOSE_DELAY_MS = 200;

// Icon map for dropdown items in the "More" menu
const DROPDOWN_ICON_MAP: Record<string, React.ReactNode> = {
  Link2: <Link2 className="size-5" />,
  BookHeart: <BookHeart className="size-5" />,
  CreditCard: <CreditCard className="size-5" />,
};

interface NavbarMoreButtonProps {
  item: MenuType; // expects dropdownItems to be present
  isActive: boolean;
}

export function NavbarMoreButton({ item, isActive }: NavbarMoreButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [showDropdown]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, DROPDOWN_CLOSE_DELAY_MS);
  };

  const dropdownItems = item.dropdownItems ?? [];

  return (
    <div
      ref={buttonRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Button that toggles dropdown (no navigation) */}
      <Button
        variant="ghost"
        size="sm"
        className={`text-[var(--nav-fg)] rounded-3xl transition px-3 sm:px-4 py-1.5 sm:py-2 text-sm ${
          isActive ? "bg-white/10" : "bg-transparent"
        }`}
        onClick={() => {
          // Toggle dropdown on click
          if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
          }
          setShowDropdown((prev) => !prev);
        }}
      >
        <span className="flex items-center gap-1">
          {item.label}
          <ChevronDown
            className={`size-3 transition-transform duration-300 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </span>
      </Button>

      {/* Hover dropdown for the "More" button */}
      <div
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2.5 z-50 w-full md:w-[768px] transition-all duration-300 ease-out ${
          showDropdown
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative rounded-3xl border border-neutral-600 text-popover-foreground shadow-lg overflow-hidden backdrop-blur-lg bg-black">
          <div className="grid gap-3 p-3 md:grid-cols-3">
            {/* Image cards (hero-style links like Guestbook, Bucket List) */}
            {dropdownItems
              .filter((dropdownItem) => dropdownItem.type === "image")
              .map((dropdownItem) => (
                <Link
                  key={dropdownItem.href}
                  href={dropdownItem.href}
                  className="group relative flex size-full flex-col justify-end overflow-hidden rounded-xl p-3"
                >
                  {dropdownItem.image && (
                    <Image
                      src={dropdownItem.image}
                      alt={dropdownItem.label}
                      fill
                      className="absolute inset-0 z-0 rounded-xl object-cover brightness-[0.75] transition-all duration-300 group-hover:scale-110 group-hover:brightness-100 dark:brightness-[0.3] dark:group-hover:brightness-[0.6]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="z-10 mt-4 font-medium text-lg text-white">
                    {dropdownItem.label}
                  </div>
                  <p className="z-10 text-nowrap text-neutral-200 text-sm group-hover:text-neutral-50 dark:text-neutral-300 dark:group-hover:text-white">
                    {dropdownItem.description}
                  </p>
                </Link>
              ))}

            {/* Icon cards (compact links like Links, Uses, Attribution) */}
            <div className="flex flex-col gap-3">
              {dropdownItems
                .filter((dropdownItem) => dropdownItem.type === "icon")
                .map((dropdownItem) => (
                  <Link
                    key={dropdownItem.href}
                    href={dropdownItem.href}
                    className="group flex w-full items-start gap-3 rounded-xl bg-white/5 p-3 transition-all duration-300 hover:bg-neutral-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-800"
                  >
                    <div className="mt-0.5 rounded-lg bg-neutral-200 p-3 group-hover:bg-black/10 dark:bg-neutral-700 dark:group-hover:bg-white/80">
                      {dropdownItem.iconName &&
                        DROPDOWN_ICON_MAP[dropdownItem.iconName] && (
                          <div className="text-neutral-600 group-hover:text-black dark:text-neutral-300 dark:group-hover:text-black">
                            {DROPDOWN_ICON_MAP[dropdownItem.iconName]}
                          </div>
                        )}
                    </div>
                    <div className="grow">
                      <p className="line-clamp-1 text-base text-black dark:text-white">
                        {dropdownItem.label}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-neutral-600 text-sm group-hover:text-black dark:text-neutral-400 dark:group-hover:text-white">
                        {dropdownItem.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


