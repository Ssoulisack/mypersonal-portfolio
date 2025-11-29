// Global navigation bar shown at the top of the app.
// - Shows greeting & current time when at top of the page
// - Transitions into a centered navigation pill on scroll
// - Provides a command/finder trigger
// - Includes a \"More\" menu with a hoverable dropdown

"use client";

import React, { useEffect, useState } from 'react';
import { MenuType } from '@/app/core/types/menu.type';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { MenuItems, TagTypes } from '@/app/data/mock/menu';
import Finder from '../ui/finder';
import { Logo } from '../ui/Logo';
import { NavbarMoreButton } from './NavbarMoreButton';
import { NavbarContactDialogButton } from './NavbarContactDialogButton';


function Navbar() {
    const pathname = usePathname();
    const menu: MenuType[] = MenuItems;

    // Greeting & time state
    const [greeting, setGreeting] = useState<string>('');
    const [timeString, setTimeString] = useState<string>('');

    // Scroll-driven UI state (switch between greeting and menu)
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showGreeting, setShowGreeting] = useState<boolean>(true);

    // Finder (command palette) visibility
    const [showFinder, setShowFinder] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Compute greeting + time every second
    useEffect(() => {
        if (!mounted) return;
        const compute = () => {
            const now = new Date();
            const hour = now.getHours();
            const nextGreeting =
                hour >= 5 && hour < 12
                    ? `Mornin'. Busy day ahead?`
                    : hour >= 12 && hour < 17
                        ? 'Good afternoon. Anything interesting happen yet?'
                        : hour >= 17 && hour < 22
                            ? 'Good evening. All done for the day?'
                            : "Still at it, 😳huh? What's keeping you busy?";
            setGreeting(nextGreeting);
            setTimeString(
                now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            );
        };
        compute();
        const id = setInterval(compute, 1_000);
        return () => clearInterval(id);
    }, [mounted]);

    // Update navbar mode based on scroll position
    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY > 10;
            setShowMenu(scrolled);
            setShowGreeting(!scrolled);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, [mounted]);

    // Global keyboard shortcut for opening Finder (Cmd/Ctrl + K)
    useEffect(() => {
        if (!mounted) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowFinder(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            {/* Single Navbar - Logo and Search always visible, center content switches */}
            <div className={`hide-during-preloading fixed inset-x-0 top-0 z-50 transition-all duration-500 backdrop-blur-xs drop-shadow-xl ${showMenu || showGreeting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="relative flex items-center justify-between gap-4 px-8 py-8 md:py-4 w-full max-w-full mx-auto">
                    {/* Desktop logo (hidden on mobile) */}
                    <Link href="/" className="hidden md:flex flex-shrink-0 z-10">
                        <span id="logo" className="font-doto font-bold text-[var(--nav-fg)] text-lg sm:text-xl">
                            <Logo />
                        </span>
                    </Link>

                    {/* Center content: either greeting/time or compact nav pill */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                        {/* Greeting + time (visible when not scrolled) */}
                        <div
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    setShowFinder(true);
                                }
                            }}
                            className={`absolute left-1/2 top-1/2 flex flex-col items-center justify-center gap-y-2 p-2 transition-all duration-500 ease-in-out whitespace-nowrap ${showGreeting && !showMenu
                                ? 'opacity-100 pointer-events-auto'
                                : 'opacity-0 pointer-events-none'
                                }`}
                            style={{
                                transform: showGreeting && !showMenu
                                    ? 'translate(-50%, -10%) scale(1)'
                                    : 'translate(-50%, -10%) scale(0.90)',
                                transitionDelay: showGreeting && !showMenu ? '.2s' : '0s'
                            }}
                        >
                            <p className='text-[var(--nav-fg)]/80 text-center text-xs md:text-sm px-2'>
                                {timeString}
                            </p>
                            {timeString && (
                                <p className='font-doto uppercase font-bold text-[var(--nav-fg)] text-xs lg:text-lg text-center px-2'>
                                    {greeting}
                                </p>
                            )}
                        </div>

                        {/* Compact pill (mobile) - tap to open Finder when scrolled */}
                        <div
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    setShowFinder(true);
                                }
                            }}
                            className={`w-[200px] md:hidden absolute left-1/2 top-1/2 flex items-center justify-between px-2 py-1 rounded-3xl border border-[rgba(66,66,66,0.3)] bg-[rgba(66,66,66,0.44)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[2.9px] transition-all duration-500 ease-in-out cursor-pointer hover:bg-[rgba(66,66,66,0.6)] active:scale-95 ${showMenu
                                ? 'opacity-100 pointer-events-auto'
                                : 'opacity-0 pointer-events-none'
                                }`}
                            style={{
                                transform: showMenu
                                    ? 'translate(-50%, -10%) scale(1)'
                                    : 'translate(-50%, -10%) scale(0.95)',
                                transitionDelay: showMenu ? '.5s' : '0s'
                            }}
                        >
                            <span className="font-doto font-bold text-[var(--nav-fg)] text-md">24THURS</span>
                            <span className="font-doto font-bold text-[var(--nav-fg)] text-md"><Search className="size-4 text-white/50" /></span>
                        </div>

                        {/* Center navigation pill (desktop) - shows when scrolled */}
                        <div
                            className={`hidden md:flex absolute left-1/2 top-1/2 items-center gap-1 rounded-3xl border border-[rgba(66,66,66,0.3)] bg-[rgba(66,66,66,0.44)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[2.9px] p-[5px] transition-all duration-500 ease-in-out ${showMenu
                                ? 'opacity-100 pointer-events-auto'
                                : 'opacity-0 pointer-events-none'
                                }`}
                            style={{
                                transform: showMenu
                                    ? 'translate(-50%, -25%) scale(1)'
                                    : 'translate(-50%, -25%) scale(0.95)',
                                transitionDelay: showMenu ? '.2s' : '0s'
                            }}
                        >
                            {/* Primary link items (e.g., Home, About, Work, Blog) */}
                            {menu
                                .filter((item) => item.tag === TagTypes.a)
                                .map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href || '/'}
                                        className={`text-[var(--nav-fg)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl transition text-sm ${(item.href || '/') === pathname
                                            ? 'bg-white/10'
                                            : 'bg-transparent'}`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            {/* Button items (e.g., More, Book a Call) */}
                            {menu
                                .filter((item) => item.tag === TagTypes.button)
                                .map((item, index, array) => {
                                    const isFirst = index === 0; // "More" button
                                    const isLast = index === array.length - 1; // Right-most button ("Book a Call")
                                    const isActive = isLast || (item.href || '/') === pathname;
                                    const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;

                                    // First button with dropdown ("More")
                                    if (hasDropdown && isFirst) {
                                        return (
                                            <NavbarMoreButton
                                                key={item.label}
                                                item={item}
                                                isActive={isActive}
                                            />
                                        );
                                    }

                                    // Last button ("Book a Call") opens a dialog styled as a bottom sheet
                                    if (isLast) {
                                        return (
                                            <NavbarContactDialogButton
                                                key={item.label}
                                                label={item.label}
                                                href={item.href}
                                                isActive={isActive}
                                            />
                                        );
                                    }

                                    // Other buttons (no dropdown, no dialog)
                                    return (
                                        <Button
                                            key={item.label}
                                            asChild
                                            variant="ghost"
                                            size="sm"
                                            className={`text-[var(--nav-fg)] rounded-3xl transition px-3 sm:px-4 py-1.5 sm:py-2 text-sm ${isActive
                                                ? 'bg-white/10'
                                                : 'bg-transparent'}`}
                                        >
                                            <Link href={item.href || '/'} className="flex items-center gap-1">
                                                {item.label}
                                            </Link>
                                        </Button>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Finder Button - Hidden on mobile */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFinder(true)}
                        className="hidden md:flex text-[var(--nav-fg)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl transition hover:bg-white/10 flex-shrink-0 z-10"
                    >
                        <Search className="size-4 sm:size-5" />
                    </Button>
                </div>
            </div>

            {/* Finder Modal */}
            {showFinder && <Finder onClose={() => setShowFinder(false)} />}
        </>
    );
}

export default Navbar;

