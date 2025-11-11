"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { BentoCardProps, BentoProps } from '@/app/core/types/magic-bento.type';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    disableAnimations?: boolean;
    style?: React.CSSProperties;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}> = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = false,
    clickEffect = true,
    enableMagnetism = false
}) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const particlesRef = useRef<HTMLDivElement[]>([]);
        const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
        const isHoveredRef = useRef(false);
        const memoizedParticles = useRef<HTMLDivElement[]>([]);
        const particlesInitialized = useRef(false);
        const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

        const initializeParticles = useCallback(() => {
            if (particlesInitialized.current || !cardRef.current) return;

            const { width, height } = cardRef.current.getBoundingClientRect();
            memoizedParticles.current = Array.from({ length: particleCount }, () =>
                createParticleElement(Math.random() * width, Math.random() * height, glowColor)
            );
            particlesInitialized.current = true;
        }, [particleCount, glowColor]);

        const clearAllParticles = useCallback(() => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            magnetismAnimationRef.current?.kill();

            particlesRef.current.forEach(particle => {
                gsap.to(particle, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.in(1.7)',
                    onComplete: () => {
                        particle.parentNode?.removeChild(particle);
                    }
                });
            });
            particlesRef.current = [];
        }, []);

        const animateParticles = useCallback(() => {
            if (!cardRef.current || !isHoveredRef.current) return;

            if (!particlesInitialized.current) {
                initializeParticles();
            }

            memoizedParticles.current.forEach((particle, index) => {
                const timeoutId = setTimeout(() => {
                    if (!isHoveredRef.current || !cardRef.current) return;

                    const clone = particle.cloneNode(true) as HTMLDivElement;
                    cardRef.current.appendChild(clone);
                    particlesRef.current.push(clone);

                    gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

                    gsap.to(clone, {
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        rotation: Math.random() * 360,
                        duration: 2 + Math.random() * 2,
                        ease: 'none',
                        repeat: -1,
                        yoyo: true
                    });

                    gsap.to(clone, {
                        opacity: 0.3,
                        duration: 1.5,
                        ease: 'power2.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }, index * 100);

                timeoutsRef.current.push(timeoutId);
            });
        }, [initializeParticles]);

        useEffect(() => {
            if (disableAnimations || !cardRef.current) return;

            const element = cardRef.current;

            const handleMouseEnter = () => {
                isHoveredRef.current = true;
                animateParticles();

                if (enableTilt) {
                    gsap.to(element, {
                        rotateX: 5,
                        rotateY: 5,
                        duration: 0.3,
                        ease: 'power2.out',
                        transformPerspective: 1000
                    });
                }
            };

            const handleMouseLeave = () => {
                isHoveredRef.current = false;
                clearAllParticles();

                if (enableTilt) {
                    gsap.to(element, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }

                if (enableMagnetism) {
                    gsap.to(element, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!enableTilt && !enableMagnetism) return;

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                if (enableTilt) {
                    const rotateX = ((y - centerY) / centerY) * -1;
                    const rotateY = ((x - centerX) / centerX) * 1;

                    gsap.to(element, {
                        rotateX,
                        rotateY,
                        duration: 0.5,
                        ease: 'power2.out',
                        transformPerspective: 3000
                    });
                }

                if (enableMagnetism) {
                    const magnetX = (x - centerX) * 0.01;
                    const magnetY = (y - centerY) * 0.01;

                    magnetismAnimationRef.current = gsap.to(element, {
                        x: magnetX,
                        y: magnetY,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            };

            const handleClick = (e: MouseEvent) => {
                if (!clickEffect) return;

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const maxDistance = Math.max(
                    Math.hypot(x, y),
                    Math.hypot(x - rect.width, y),
                    Math.hypot(x, y - rect.height),
                    Math.hypot(x - rect.width, y - rect.height)
                );

                const ripple = document.createElement('div');
                ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

                element.appendChild(ripple);

                gsap.fromTo(
                    ripple,
                    {
                        scale: 0,
                        opacity: 1
                    },
                    {
                        scale: 1,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => ripple.remove()
                    }
                );
            };

            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('click', handleClick);

            return () => {
                isHoveredRef.current = false;
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('click', handleClick);
                clearAllParticles();
            };
        }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

        return (
            <div
                ref={cardRef}
                className={`${className} relative overflow-hidden`}
                style={{ 
                    ...style, 
                    position: 'relative', 
                    overflow: 'hidden',
                    boxShadow: 'inset 4px 0 8px -2px rgba(255, 255, 255, 0.), inset -4px 0 8px -2px rgba(255, 255, 255, 0.3)'
                }}
            >
                {children}
            </div>
        );
    };

const GlobalSpotlight: React.FC<{
    gridRef: React.RefObject<HTMLDivElement | null>;
    disableAnimations?: boolean;
    enabled?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
}> = ({
    gridRef,
    disableAnimations = false,
    enabled = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR
}) => {
        const spotlightRef = useRef<HTMLDivElement | null>(null);
        const isInsideSection = useRef(false);

        useEffect(() => {
            if (disableAnimations || !gridRef?.current || !enabled) return;

            const spotlight = document.createElement('div');
            spotlight.className = 'global-spotlight';
            spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
            document.body.appendChild(spotlight);
            spotlightRef.current = spotlight;

            const handleMouseMove = (e: MouseEvent) => {
                if (!spotlightRef.current || !gridRef.current) return;

                const section = gridRef.current.closest('.bento-section');
                const rect = section?.getBoundingClientRect();
                const mouseInside =
                    rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

                isInsideSection.current = mouseInside || false;
                const cards = gridRef.current.querySelectorAll('.card');

                if (!mouseInside) {
                    gsap.to(spotlightRef.current, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    cards.forEach(card => {
                        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                    });
                    return;
                }

                const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
                let minDistance = Infinity;

                cards.forEach(card => {
                    const cardElement = card as HTMLElement;
                    const cardRect = cardElement.getBoundingClientRect();
                    const centerX = cardRect.left + cardRect.width / 2;
                    const centerY = cardRect.top + cardRect.height / 2;
                    const distance =
                        Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                    const effectiveDistance = Math.max(0, distance);

                    minDistance = Math.min(minDistance, effectiveDistance);

                    let glowIntensity = 0;
                    if (effectiveDistance <= proximity) {
                        glowIntensity = 1;
                    } else if (effectiveDistance <= fadeDistance) {
                        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                    }

                    updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
                });

                gsap.to(spotlightRef.current, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: 0.1,
                    ease: 'power2.out'
                });

                const targetOpacity =
                    minDistance <= proximity
                        ? 0.8
                        : minDistance <= fadeDistance
                            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
                            : 0;

                gsap.to(spotlightRef.current, {
                    opacity: targetOpacity,
                    duration: targetOpacity > 0 ? 0.2 : 0.5,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                isInsideSection.current = false;
                gridRef.current?.querySelectorAll('.card').forEach(card => {
                    (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                });
                if (spotlightRef.current) {
                    gsap.to(spotlightRef.current, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseleave', handleMouseLeave);
                spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
            };
        }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

        return null;
    };

const BentoCardGrid: React.FC<{
    children: React.ReactNode;
    gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
    <div
        className="bento-section grid gap-2 md:gap-3 p-4 w-full max-w-none select-none relative"
        style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
        ref={gridRef as React.RefObject<HTMLDivElement>}
    >
        {children}
    </div>
);

// Lightweight wrapper to give any children the same animated background/particle
// effects as built-in cards. Use inside MagicBento via the customCards prop.
export const MagicBentoCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    enableBorderGlow?: boolean;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
    textAutoHide?: boolean;
    enableStars?: boolean;
    enableSpotlight?: boolean;
    disableAnimations?: boolean;
    spotlightRadius?: number;
}> = ({
    children,
    className = '',
    style,
    disableAnimations = false,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = false,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = false,
}) => {
        const baseClassName = `card flex flex-col gap-4 relative aspect-[1/3] min-h-[100px] w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255, 255, 255,1.15)] bg-card card-bd card--border-glow ${className}`;

        const cardStyle = {
            backgroundColor: '#cccccc',
            borderColor: 'var(--border-color)',
            color: 'var(--white)',
            '--glow-x': '50%',
            '--glow-y': '50%',
            '--glow-intensity': '0',
            '--glow-radius': '200px',
            ...style,
        } as React.CSSProperties;

        return (
            <ParticleCard
                className={baseClassName}
                style={cardStyle}
                particleCount={particleCount}
                disableAnimations={disableAnimations}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
            >
                {children}
            </ParticleCard>
        );
    };

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

const CardMagic: React.FC<BentoProps> = ({
    textAutoHide = true,
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = false,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = true,
    cards
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    return (
        <>
            <style>
                {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: #131824;
            --background-dark: #060010;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(255, 255, 255, 1);
            --purple-glow: rgba(255, 255, 255, 0.2);
            --purple-border: rgba(255, 255, 255, 0.8);
          }
          
          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(6, 1fr);
              grid-template-rows: repeat(3, 1fr);
            }

            .card-responsive .card:nth-child(1) {
              grid-column: 1 / span 4;
              grid-row: 1;
            }
            .card-responsive .card:nth-child(2) {
              grid-column: 5 / 7;
              grid-row: 1 / 3;
            }
            .card-responsive .card:nth-child(3) {
              grid-column: 1 / span 2;
              grid-row: 2;
            }
            .card-responsive .card:nth-child(4) {
              grid-column: 3 / span 2;
              grid-row: 2;
            }
            .card-responsive .card:nth-child(5) {
            grid-column: 1 / span 7;
            grid-row: 3;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 6px 24px rgba(${glowColor}, 0.32), 0 0 36px rgba(${glowColor}, 0.2);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.18);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 4px 24px rgba(${glowColor}, 0.24), 0 0 32px rgba(${glowColor}, 0.18);
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          @media (max-width: 599px) {
            .card-responsive {
              grid-template-columns: 1fr;
              width: 95%;
              margin: 0 auto;
              padding: 0.5rem;
              gap: 1rem;
            }
            
            .card-responsive .card {
              width: 100%;
              min-height: 250px;
              max-height: none;
              aspect-ratio: auto;
            }
            
            .card-responsive .card:nth-child(3),
            .card-responsive .card:nth-child(4) {
              min-height: 200px;
            }
            
            .card__content {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            
            .card__title {
              font-size: 1.1rem;
              line-height: 1.3;
            }
            
            .card__description {
              font-size: 0.9rem;
              line-height: 1.4;
            }
            
            .card__header {
              margin-bottom: 0.5rem;
            }
            
            .card__label {
              font-size: 0.9rem;
            }
            
            /* Ensure custom content is properly sized */
            .card__content > * {
              max-width: 100%;
              overflow: visible;
            }
            
            /* Remove text clamping on mobile for better readability */
            .text-clamp-1,
            .text-clamp-2 {
              -webkit-line-clamp: unset;
              line-clamp: unset;
              display: block;
              overflow: visible;
            }
            
            /* Hide cards on mobile when hideOnMobile is true */
            .hide-on-mobile {
              display: none !important;
            }
          }
        `}
            </style>

            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    disableAnimations={shouldDisableAnimations}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}

            <BentoCardGrid gridRef={gridRef}>
                <div className="card-responsive grid gap-2">
                    {cards?.map((card: BentoCardProps, index: number) => {
                        // Different classes for cards 3 and 4 (index 2 and 3) to make them shorter
                        const isShortCard = index === 2 || index === 3;
                        const baseClassName = `card flex flex-col items-center gap-1 relative w-full max-w-full rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255, 255, 255,1.15)] bg-card card-bd ${enableBorderGlow ? 'card--border-glow' : ''
                            } ${isShortCard
                                ? 'min-h-[200px] max-h-[600px] p-3 mobile:min-h-[300px] mobile:p-4'
                                : 'min-h-[300px] p-5 mobile:min-h-[250px] mobile:p-4'
                            } ${card.hideOnMobile ? 'hide-on-mobile' : ''}`;

                        const cardStyle = {
                            backgroundColor: 'transparent',
                            borderColor: 'var(--border-color)',
                            color: 'var(--card-foreground)',
                            '--glow-x': '50%',
                            '--glow-y': '50%',
                            '--glow-intensity': '0',
                            '--glow-radius': '200px'
                        } as React.CSSProperties;

                        if (enableStars) {
                            return (
                                <ParticleCard
                                    key={index}
                                    className={baseClassName}
                                    style={cardStyle}
                                    disableAnimations={shouldDisableAnimations}
                                    particleCount={particleCount}
                                    glowColor={glowColor}
                                    enableTilt={enableTilt}
                                    clickEffect={clickEffect}
                                    enableMagnetism={enableMagnetism}
                                >
                                    {/* Background Component */}
                                    {card.backgroundComponent && (
                                        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                                            {card.backgroundComponent}
                                        </div>
                                    )}
                                    
                                    <div className="card__header flex justify-between gap-3 relative text-[hsl(var(--card-foreground))] z-10">
                                        <span className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/70 to-white/20 drop-shadow-[0_2px_30px_rgba(255,255,255,1.15)">{card.label}</span>
                                    </div>
                                    <div className="card__content flex flex-col relative text-[hsl(var(--card-foreground))]">
                                        {card.customContent ? (
                                            <>{card.customContent}</>
                                        ) : (
                                            <>
                                                <h3 className={`card__title font-normal text-base m-0 mb-1 ${textAutoHide ? 'text-clamp-1' : ''}`}>
                                                    {card.title}
                                                </h3>
                                                <p
                                                    className={`card__description text-xs leading-5 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}
                                                >
                                                    {card.description}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </ParticleCard>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className={`${baseClassName} ${card.hideOnMobile ? 'hide-on-mobile' : ''}`}
                                style={cardStyle}
                                ref={el => {
                                    if (!el) return;

                                    const handleMouseMove = (e: MouseEvent) => {
                                        if (shouldDisableAnimations) return;

                                        const rect = el.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        const centerX = rect.width / 2;
                                        const centerY = rect.height / 2;

                                        if (enableTilt) {
                                            const rotateX = ((y - centerY) / centerY) * -5;
                                            const rotateY = ((x - centerX) / centerX) * 5;

                                            gsap.to(el, {
                                                rotateX,
                                                rotateY,
                                                duration: 0.1,
                                                ease: 'power2.out',
                                                transformPerspective: 1000
                                            });
                                        }

                                        if (enableMagnetism) {
                                            const magnetX = (x - centerX) * 0.03;
                                            const magnetY = (y - centerY) * 0.03;

                                            gsap.to(el, {
                                                x: magnetX,
                                                y: magnetY,
                                                duration: 0.5,
                                                ease: 'power2.out'
                                            });
                                        }
                                    };

                                    const handleMouseLeave = () => {
                                        if (shouldDisableAnimations) return;

                                        if (enableTilt) {
                                            gsap.to(el, {
                                                rotateX: 0,
                                                rotateY: 0,
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }

                                        if (enableMagnetism) {
                                            gsap.to(el, {
                                                x: 0,
                                                y: 0,
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }
                                    };

                                    const handleClick = (e: MouseEvent) => {
                                        if (!clickEffect || shouldDisableAnimations) return;

                                        const rect = el.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;

                                        const maxDistance = Math.max(
                                            Math.hypot(x, y),
                                            Math.hypot(x - rect.width, y),
                                            Math.hypot(x, y - rect.height),
                                            Math.hypot(x - rect.width, y - rect.height)
                                        );

                                        const ripple = document.createElement('div');
                                        ripple.style.cssText = `
                      position: absolute;
                      width: ${maxDistance * 2}px;
                      height: ${maxDistance * 2}px;
                      border-radius: 50%;
                      background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                      left: ${x - maxDistance}px;
                      top: ${y - maxDistance}px;
                      pointer-events: none;
                      z-index: 1000;
                    `;

                                        el.appendChild(ripple);

                                        gsap.fromTo(
                                            ripple,
                                            {
                                                scale: 0,
                                                opacity: 1
                                            },
                                            {
                                                scale: 1,
                                                opacity: 0,
                                                duration: 0.8,
                                                ease: 'power2.out',
                                                onComplete: () => ripple.remove()
                                            }
                                        );
                                    };

                                    el.addEventListener('mousemove', handleMouseMove);
                                    el.addEventListener('mouseleave', handleMouseLeave);
                                    el.addEventListener('click', handleClick);
                                }}
                            >
                                {/* Background Component */}
                                {card.backgroundComponent && (
                                    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                                        {card.backgroundComponent}
                                    </div>
                                )}
                                
                                <div className="card__header flex justify-between gap-3 relative text-[hsl(var(--card-foreground))] z-10">
                                    <span className="card__label text-base">{card.label}</span>
                                </div>
                                <div className="card__content flex flex-col relative text-[hsl(var(--card-foreground))] z-10" style={{
                                    boxShadow: 'inset 4px 0 8px -2px rgba(255, 255, 255, 0.4), inset -4px 0 8px -2px rgba(255, 255, 255, 0.4)'
                                }}>
                                    {card.customContent ? (
                                        <>{card.customContent}</>
                                    ) : (
                                        <>
                                            <h3 className={`card__title font-normal text-base m-0 mb-1 ${textAutoHide ? 'text-clamp-1' : ''}`}>
                                                {card.title}
                                            </h3>
                                            <p className={`card__description text-xs leading-5 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}>
                                                {card.description}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    {/* Custom cards injected by parent */}
                    {/* {customCards} */}
                </div>
            </BentoCardGrid>
        </>
    );
};

export default CardMagic;