"use client";
import React, { useEffect, useMemo, useState } from 'react'
import { MenuType } from '@/app/core/types/menu.type'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

function Navbar() {
    const pathname = usePathname();
    const tagTypes = {
        button: 'button',
        a: 'a'
    }
    const menu: MenuType[] = [
        {
            label: 'Home',
            href: '/',
            tag: tagTypes.a
        },
        {
            label: 'About',
            href: '/about',
            tag: tagTypes.a
        },
        {
            label: 'Work',
            href: '/work',
            tag: tagTypes.a

        },
        {
            label: 'Blog',
            href: '/blog',
            tag: tagTypes.a
        },
        {
            label: 'More',
            href: '/more',
            tag: tagTypes.button
        },
        {
            label: 'Book a Call',
            href: '/book-a-call',
            tag: tagTypes.button
        }
    ]

    const [greeting, setGreeting] = useState<string>("");
    const [timeString, setTimeString] = useState<string>("");
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showGreeting, setShowGreeting] = useState<boolean>(true);


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

    return (
        <>
            {/* Greeting popup (initial) */}
            <div
                className={`hide-during-preloading fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col justify-center items-center gap-y-1 p-[8px] rounded-3xl ${showGreeting ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                style={{ WebkitBackdropFilter: 'blur(2px)' }}
            >
                <p className='text-[var(--nav-fg)]/80 text-center text-xs md:text-sm px-2'>
                    {timeString}
                </p>
                {timeString && (
                    <p className='flex items-center justify-center font-doto uppercase font-bold text-[var(--nav-fg)] text-xs lg:text-lg text-center text-align-center px-2'>
                        {greeting}
                    </p>
                )}
            </div>

            {/* Navbar (appears after scroll) */}
            <div
                className={`hide-during-preloading fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center p-[5px] rounded-3xl border border-[rgba(66,66,66,0.3)] bg-[rgba(66,66,66,0.44)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[2.9px] transition-all duration-500 ${showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                style={{ WebkitBackdropFilter: 'blur(2px)' }}
            >
                {menu
                    .filter((item) => item.tag === tagTypes.a)
                    .map((item) => (
                        <Link
                            key={item.label}
                            href={item.href || '/'}
                            className={`text-[var(--nav-fg)] px-4 py-2 rounded-3xl transition ${(item.href || '/') === pathname ? 'bg-white/10' : 'bg-transparent'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                {menu
                    .filter((item) => item.tag === tagTypes.button)
                    .map((item) => (
                        <Button
                            key={item.label}
                            asChild
                            variant="ghost"
                            size="sm"
                            className={`text-[var(--nav-fg)] rounded-3xl transition ${(item.href || '/') === pathname ? 'bg-white/10' : 'bg-transparent'
                                }`}
                        >
                            <Link href={item.href || '/'}>
                                {item.label}
                            </Link>
                        </Button>
                    ))}
            </div>
        </>
    );
}

export default Navbar;
