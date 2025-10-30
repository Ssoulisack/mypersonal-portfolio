import gsap from "gsap"
import { useEffect, useState, useRef, useCallback } from "react"

// Constants
const PROGRESS_BOXES = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    percent: (i + 1) * 10
}));

const PROGRESS_INTERVAL = 30;
const EXIT_DELAY = 1500;

// Types
interface ProgressBox {
    id: number;
    percent: number;
}

// Custom hooks
const useProgressAnimation = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalId);
                    return 100;
                }
                return prev + 1;
            });
        }, PROGRESS_INTERVAL);

        return () => clearInterval(intervalId);
    }, []);

    return progress;
};

const useBodyOverflow = (isVisible: boolean) => {
    useEffect(() => {
        if (isVisible) {
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            document.body.classList.add('preloading-active');
            return () => {
                document.body.style.overflow = previousOverflow;
                document.body.classList.remove('preloading-active');
            };
        }
    }, [isVisible]);
};

// Animation functions
const animateCardsWithRefs = (
    nameCardRef: React.RefObject<HTMLDivElement | null>,
    positionCardRef: React.RefObject<HTMLDivElement | null>,
    socialCardRef: React.RefObject<HTMLDivElement | null>
): void => {
    
    // Animate name card
    if (nameCardRef.current) {
        console.log("Animating name card");
        gsap.fromTo(nameCardRef.current, 
            { opacity: 0, scale: 0.8, y: -20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", delay: .5 }
        );
    }

    // Animate position card
    if (positionCardRef.current) {
        console.log("Animating position card");
        gsap.fromTo(positionCardRef.current,
            { opacity: 0, scale: 0.8, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1 }
        );
    }

    // Animate social card
    if (socialCardRef.current) {
        console.log("Animating social card");
        gsap.fromTo(socialCardRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 2 }
        );
    }
};

const animateExit = (onComplete: () => void, pageLoadingRef: React.RefObject<HTMLDivElement | null>): void => {
    if (pageLoadingRef.current) {
        gsap.to(pageLoadingRef.current, {
            y: "-100%",
            duration: 1,
            ease: "expo.in",
            onComplete
        });
    }
};

export function Preloading() {
    const [isVisible, setIsVisible] = useState(true);
    const hasExitRunRef = useRef(false);
    const progress = useProgressAnimation();
    
    // Refs for GSAP animations
    const nameCardRef = useRef<HTMLDivElement>(null);
    const positionCardRef = useRef<HTMLDivElement>(null);
    const socialCardRef = useRef<HTMLDivElement>(null);
    const pageLoadingRef = useRef<HTMLDivElement>(null);

    useBodyOverflow(isVisible);

    const handleExit = useCallback(() => {
        setIsVisible(false);
    }, []);

    useEffect(() => {
        if (progress >= 100 && !hasExitRunRef.current) {
            hasExitRunRef.current = true;
            const timeoutId = setTimeout(() => {
                animateExit(handleExit, pageLoadingRef);
            }, EXIT_DELAY);

            return () => clearTimeout(timeoutId);
        }
    }, [progress, handleExit]);

    useEffect(() => {
        // Animate cards using refs instead of selectors
        // Add a small delay to ensure DOM is fully rendered
        const timer = setTimeout(() => {
            if (nameCardRef.current && positionCardRef.current && socialCardRef.current) {
                animateCardsWithRefs(nameCardRef, positionCardRef, socialCardRef);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);


    // Component sub-components
    const ProgressBox = ({ box }: { box: ProgressBox }) => {
        const isActive = progress >= box.percent;
        return (
            <div
                key={box.id}
                className={`${
                    isActive 
                        ? "bg-foreground scale-100 opacity-100" 
                        : "scale-95 opacity-60"
                } w-[10px] h-[10px] rounded-sm lg:w-[30px] lg:h-[30px] lg:rounded-md transition-discrete duration-500 ease-out flex items-center justify-center`}
            />
        );
    };

    const LoadingDots = () => (
        <div className="flex justify-center gap-x-1 p-2">
            {[0, 150, 300].map((delay) => (
                <span
                    key={delay}
                    className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full animate-pulse"
                    style={{ animationDelay: `${delay}ms` }}
                />
            ))}
        </div>
    );

    const ProgressBar = () => (
        <div className="flex justify-center gap-y-2 w-full">
            <div className="flex justify-start items-center gap-x-2 lg:gap-x-4 p-2 bg-anti-flash-white rounded-md">
                {PROGRESS_BOXES.map((box) => (
                    <ProgressBox key={box.id} box={box} />
                ))}
            </div>
        </div>
    );

    const LoadingCard = () => (
        <div className="flex flex-col items-start justify-between w-[250px] h-25 lg:w-[500px] lg:h-50 bg-discord-white rounded-2xl">
            <div className="flex items-center justify-between w-full px-2 border-b-1 border-sidebar-foreground">
                <div>
                    <p className="text-[10px] lg:p-2 lg:text-sm">LOADER</p>
                </div>
                <LoadingDots />
            </div>
            <ProgressBar />
            <div className="w-full text-center lg:text-end lg:pb-2 lg:px-4 text-xs lg:text-lg font-semibold">
                {progress}%
            </div>
        </div>
    );

    if (!isVisible) return null;

    return (
        <div 
            ref={pageLoadingRef}
            className="page-loading flex flex-col justify-around items-center bg-background-secondary fixed w-full h-full z-50"
        >
            {/* Top section with name card */}
            <div className="flex justify-end w-full px-12 md:px-50">
                <div 
                    ref={nameCardRef}
                    className="w-48 h-32 sm:w-48 sm:h-40 md:w-60 md:h-48 bg-discord-white p-4 md:p-8 rotate-12 flex flex-col justify-center items-center shadow-xl"
                    style={{ opacity: 0 }}
                >
                    <div className="flex flex-col text-center font-medium leading-tight">
                        <p className="font-doto font-extrabold text-md lg:text-lg mb-1">Hello,</p>
                        <p className="font-doto font-extrabold text-md lg:text-lg">I am</p>
                        <p className="font-doto font-extrabold text-md lg:text-lg text-gray-500">Soulisack DUANGVILAY</p>
                    </div>
                </div>
            </div>

            {/* Center section with loading bar */}
            <div>
                <LoadingCard />
            </div>

            {/* Bottom section with position and social cards */}
            <div className="flex justify-evenly items-center gap-16 md:gap-24 lg:gap-32 w-full">
                <div 
                    ref={positionCardRef}
                    className="w-48 h-32 sm:w-48 sm:h-40 md:w-60 md:h-48 bg-discord-white rotate-[-14deg] flex items-center justify-center p-4 lg:p-8 text-sm md:text-md lg:text-lg shadow-xl"
                    style={{ opacity: 0 }}
                >
                    <code className="text-foreground font-bold font-doto">
                        My position is Backend developer
                    </code>
                </div>
                <div 
                    ref={socialCardRef}
                    className="flex text-xs sm:text-sm font-semibold"
                    style={{ opacity: 0 }}
                >
                    <span className="bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] bg-clip-text text-transparent">
                        @ig:24.thurs
                    </span>
                </div>
            </div>
        </div>
    );
}