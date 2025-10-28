import gsap from "gsap"
import { useEffect, useState, useRef } from "react"

export function Preloading() {
    const boxes = [
        { id: 1, percent: 10 },
        { id: 2, percent: 20 },
        { id: 3, percent: 30 },
        { id: 4, percent: 40 },
        { id: 5, percent: 50 },
        { id: 6, percent: 60 },
        { id: 7, percent: 70 },
        { id: 8, percent: 80 },
        { id: 9, percent: 90 },
        { id: 10, percent: 100 }
    ];

    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const hasExitRunRef = useRef(false);

    useEffect(() => {
        // Increment from 0% to 100%
        const intervalId = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalId);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (isVisible) {
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = previousOverflow;
            };
        }
    }, [isVisible]);

    useEffect(() => {
        if (progress >= 100 && !hasExitRunRef.current) {
            hasExitRunRef.current = true;
            const timeoutId = setTimeout(() => {
                gsap.to(".page-loading", {
                    y: "-100%",
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => setIsVisible(false)
                });
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [progress]);

    useEffect(() => {
        // Animate cards with staggered delays
        gsap.fromTo(
            ".card-1",
            {
                opacity: 0,
                scale: 0.8,
                y: -20
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 1
            }
        );

        gsap.fromTo(
            ".card-2",
            {
                opacity: 0,
                scale: 0.8,
                y: 20
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 2
            }
        );

        gsap.fromTo(
            ".card-3",
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: 3
            }
        );
    }, []);


    return (
        <>
            {isVisible && (
            <div className="page-loading flex flex-col justify-around items-center bg-background-secondary fixed w-full h-full z-50">
                <div className="flex justify-end w-full px-12 md:px-50">
                    <div className="card-1 w-48 h-32 sm:w-48 sm:h-40 md:w-60 md:h-48 bg-discord-white p-4 md:p-8 rotate-12 flex flex-col justify-center items-center shadow-xl opacity-0">
                        <div className="flex flex-col text-center font-medium leading-tight">
                            <p className="text-md lg:text-lg mb-1">Hello,</p>
                            <p className="text-md lg:text-lg font-semibold">I am</p>
                            <p className="text-md lg:text-lg font-bold text-gray-500">Soulisack DUANGVILAY</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col items-start justify-between w-[250px] h-25 lg:w-[500px] lg:h-50 bg-discord-white rounded-2xl">
                        <div className="flex items-center justify-between w-full px-2 border-b-1 border-sidebar-foreground">
                            <div>
                                <p className=" text-[10px] lg:p-2 lg:text-sm">LOADER</p>
                            </div>
                            <div className="flex justify-center gap-x-1 p-2">
                                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></span>
                                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full animate-pulse" style={{ animationDelay: "150ms" }}></span>
                                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-y-2 w-full">
                            <div className={`flex justify-start items-center gap-x-2 lg:gap-x-4 p-2 bg-anti-flash-white rounded-md`}>
                                {boxes.map((box) => {
                                    const isActive = progress >= box.percent;
                                    return (
                                        <div
                                            key={box.id}
                                            className={`${isActive ? "bg-foreground scale-100 opacity-100" : "scale-95 opacity-60"} w-[10px] h-[10px] rounded-sm lg:w-[30px] lg:h-[30px] lg:rounded-md transition-discrete duration-500 ease-out flex items-center justify-center`}
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-full text-center lg:text-end lg:pb-2 lg:px-4 text-xs lg:text-lg font-semibold">{progress}%</div>
                    </div>
                </div>
                <div className="flex justify-evenly items-center gap-16 md:gap-24 lg:gap-32 w-full">
                    <div className="card-2 w-48 h-32 sm:w-48 sm:h-40 md:w-60 md:h-48 bg-discord-white rotate-[-14deg] flex items-center justify-center p-4 lg:p-8 text-sm md:text-md lg:text-lg shadow-xl opacity-0">
                        <code className="text-foreground font-bold">
                            My position is Backend developer
                        </code>
                    </div>
                    <div className="card-3 flex text-xs sm:text-sm font-semibold opacity-0">
                        <span className="bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] bg-clip-text text-transparent">@ig:24.thurs</span>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}