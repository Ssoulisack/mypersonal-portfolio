"use client";

import { motion } from "framer-motion";
import { GithubIcon, Linkedin, Mail } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/app/components/ui/button";
import Lanyard from "@/app/components/shared/Lanyard";
import { useEffect } from "react";
import ShinyText from "../shared/shinyText";


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
      <div className="flex flex-col items-center justify-center relative z-10">
        {/* 1. RotatingText */}
        <div className="text-center px-4 mb-4 md:mb-8">
          <ShinyText
            text="SOULISACK DUANGVILAY"
            disabled={false}
            speed={3}
            className='bg-discord-blue text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-8 py-2 px-4 sm:mx-12 md:mx-0 cursor-target'
          />
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
                "こんにちは、私の名前はアレックスです。よろしくね！",
                3000,
                "Hi, I'm alex. Nice to meet you!",
                1000,
                "I'm backend developer.",
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
        <div className="mt-6">
          <Button className="text-anti-flash-white hover:cursor-pointer hover:text-anti-flash-white/80">
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
};
