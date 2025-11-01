"use client";

import { motion } from "framer-motion";
import { ChevronDown, GithubIcon, Linkedin, Mail } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import Lanyard from "@/app/components/shared/Lanyard";
import { useEffect } from "react";
// import ShinyText from "../shared/shinyText";


export const Hero = () => {
  // const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // setIsMounted(true);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent dark">
      {/* Lanyard - Tailwind responsive (iPad Mini 768px+) */}
      <div className="absolute right-0 top-0 w-1/2 h-full z-5 overflow-visible hidden md:block">
        <Lanyard position={[0, 0, 25]} gravity={[0, -20, 0]} />
      </div>

      {/* Content Container - Column Layout */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative z-10">
        {/* 1. RotatingText */}
        <div className="px-4 mb-4 md:mb-8">
          <p className="text-center leading-tight">
            <span className="inline-block uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm text-white/60">
              Where
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-instrument-serif text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/70 to-white/20 drop-shadow-[0_2px_30px_rgba(255,255,255,0.15)]">
              your ideas take shape.
            </span>
            <span className="block mt-4 h-px w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </p>
        </div>

        {/* 2. Typing Animation */}
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl typing h-12 sm:h-16 md:h-20 mb-4 md:mb-8">
            <TypeAnimation
              sequence={[
                "はじめまして、私の名前はアレックスです。よろしくね！",
                3000,
                "Hi, I'm Alex, a Web developer.",
                1000,
                "Nice to meet you!",
                1000,
              ]}
              wrapper="span"
              speed={10}
              repeat={Infinity}
            />
          </div>
        </motion.div>

        {/* 3. Social Links */}
        <div className="flex gap-4 md:gap-6 justify-center">
          <a
            href="https://github.com/Ssoulisack"
            className="my-icon transition-colors hover:cursor-pointer"
          >
            <GithubIcon size={24} className="md:w-8 md:h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/sackdvl/"
            className="my-icon transition-colors hover:cursor-pointer"
          >
            <Linkedin size={24} className="md:w-8 md:h-8" />
          </a>
          <button
            onClick={scrollToContact}
            className="my-icon transition-colors hover:cursor-pointer"
          >
            <Mail size={24} className="md:w-8 md:h-8" />
          </button>
        </div>

        {/* Go to Homepage Button */}
        <div className="flex flex-col items-center gap-2 mt-6">
          <span className="text-sm text-white/40 animate-pulse">scroll down</span>
          <ChevronDown size={24} className='text-white/40 animate-bounce' style={{ animationDuration: '1s' }} />
        </div>
      </div>
    </div>
  );
};
