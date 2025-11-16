"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
    FaBriefcase,
    FaGraduationCap,
    FaCertificate,
    FaCode,
    FaArrowLeft,
} from "react-icons/fa";
import { TimelineEntryProps, TimelineItem } from "@/app/core/types/timeline.type";

const TimelineEntry: React.FC<TimelineEntryProps> = ({
    date,
    title,
    subtitle,
    description,
    isLeft,
    icon: Icon,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} className={`flex w-full ${isLeft ? "justify-start" : "justify-end"} my-8`}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="w-full md:w-5/12"
            >
                <div className="bg-background p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 border border-gray-700/50">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-600 p-3 rounded-full mr-4">
                            <Icon className="text-white text-xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-100">{title}</h3>
                            <p className="text-blue-400">{subtitle}</p>
                        </div>
                    </div>
                    <p className="text-gray-400 mb-2">{date}</p>
                    <p className="text-gray-300">{description}</p>
                </div>
            </motion.div>
        </div>
    );
};



const ResumeTimeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
    const lineRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (lineRef.current && containerRef.current) {
                const container = containerRef.current;
                const containerRect = container.getBoundingClientRect();
                const containerTop = containerRect.top + window.scrollY;
                const containerBottom = containerTop + containerRect.height;
                const viewportHeight = window.innerHeight;
                const viewportCenter = window.scrollY + viewportHeight / 2;
                
                // Start filling when container top reaches viewport center
                // Complete when container bottom reaches viewport center
                const startPoint = containerTop;
                const endPoint = containerBottom;
                const scrollRange = endPoint - startPoint;
                
                // Calculate progress: 0 when container top is at center, 1 when container bottom is at center
                const progress = Math.max(0, Math.min(1, (viewportCenter - startPoint) / scrollRange));
                const percentage = progress * 100;
                
                lineRef.current.style.background = `linear-gradient(to bottom, #4564fc ${percentage}%, #1e2939 ${percentage}%)`;
            }
        };

        handleScroll(); // Initial calculation
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [items]);

    return (
        <div className="bg-transparent py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-100 mb-16">Professional Timeline</h1>
                <div ref={containerRef} className="relative">
                    <div ref={lineRef} className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 transition-all duration-300" />
                    {items.map((item, index) => (
                        <TimelineEntry
                            key={index}
                            date={item.date}
                            title={item.title}
                            subtitle={item.subtitle}
                            description={item.description}
                            isLeft={index % 2 === 0}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResumeTimeline;