"use client";
import React, { useEffect, useMemo, useState } from 'react'
import { MenuType } from '@/app/core/types/menu.type'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react'
import { MenuItems, TagTypes } from '@/app/data/mock/menu'
import Finder from '../shared/finder'

function Navbar() {
    const pathname = usePathname();

    const menu: MenuType[] = MenuItems

    const [greeting, setGreeting] = useState<string>("");
    const [timeString, setTimeString] = useState<string>("");
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showGreeting, setShowGreeting] = useState<boolean>(true);
    const [showFinder, setShowFinder] = useState<boolean>(false);


    useEffect(() => {
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
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY > 10;
            setShowMenu(scrolled);
            setShowGreeting(!scrolled);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
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
            <div className={`hide-during-preloading fixed inset-x-0 top-0 z-50 transition-all duration-500 ${showMenu || showGreeting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="relative flex items-center justify-between gap-4 px-8 py-8 md:py-4 w-full max-w-full mx-auto">
                    {/* Logo - Hidden on mobile */}
                    <Link href="/" className="hidden md:flex flex-shrink-0 z-10">
                        <span className="font-doto font-bold text-[var(--nav-fg)] text-lg sm:text-xl">24THURS</span>
                    </Link>

                    {/* Center Content - Switches between greeting and menu, absolutely positioned for same position */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                        {/* Greeting/Time (when not scrolled) - Clickable on mobile */}
                        <div 
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    setShowFinder(true);
                                }
                            }}
                            className={`absolute left-1/2 top-1/2 flex flex-col items-center justify-center gap-y-2 p-2 transition-all duration-500 ease-in-out whitespace-nowrap md:cursor-default cursor-pointer hover:bg-[rgba(20,20,20,0.6)] active:scale-95 ${
                                showGreeting && !showMenu 
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

                        {/* Logo Icon (mobile only, when scrolled) */}
                        <div 
                            onClick={() => {
                                if (window.innerWidth < 768) {
                                    setShowFinder(true);
                                }
                            }}
                            className={`w-[200px] md:hidden absolute left-1/2 top-1/2 flex items-center justify-between px-2 py-1 rounded-3xl border border-[rgba(66,66,66,0.3)] bg-[rgba(66,66,66,0.44)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[2.9px] transition-all duration-500 ease-in-out cursor-pointer hover:bg-[rgba(66,66,66,0.6)] active:scale-95 ${
                                showMenu 
                                    ? 'opacity-100 pointer-events-auto' 
                                    : 'opacity-0 pointer-events-none'
                            }`}
                            style={{ 
                                transform: showMenu 
                                    ? 'translate(-50%, -10%) scale(1)' 
                                    : 'translate(-50%, -10%) scale(0.95)',
                                transitionDelay: showMenu ? '.2s' : '0s'
                            }}
                        >
                            <span className="font-doto font-bold text-[var(--nav-fg)] text-md">24THURS</span>
                            <span className="font-doto font-bold text-[var(--nav-fg)] text-md"><Search className="size-4 text-white/50" /></span>
                        </div>

                        {/* Menu Items (when scrolled) - Hidden on mobile */}
                        <div 
                            className={`hidden md:flex absolute left-1/2 top-1/2 items-center gap-1 rounded-3xl border border-[rgba(66,66,66,0.3)] bg-[rgba(66,66,66,0.44)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[2.9px] p-[5px] transition-all duration-500 ease-in-out ${
                                showMenu 
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
                            {menu
                                .filter((item) => item.tag === TagTypes.a)
                                .map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href || '/'}
                                        className={`text-[var(--nav-fg)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl transition text-sm ${(item.href || '/') === pathname ? 'bg-white/10' : 'bg-transparent'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            {menu
                                .filter((item) => item.tag === TagTypes.button)
                                .map((item, index, array) => {
                                    const isFirst = index === 0;
                                    const isLast = index === array.length - 1;
                                    const isActive = isLast || (item.href || '/') === pathname;
                                    
                                    return (
                                        <Button
                                            key={item.label}
                                            asChild
                                            variant="ghost"
                                            size="sm"
                                            className={`text-[var(--nav-fg)] rounded-3xl transition px-3 sm:px-4 py-1.5 sm:py-2 text-sm ${isActive ? 'bg-white/10' : 'bg-transparent'
                                                }`}
                                        >
                                            <Link href={item.href || '/'} className="flex items-center gap-1">
                                                {item.label}
                                                {isFirst && <ChevronDown className="size-3" />}
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
