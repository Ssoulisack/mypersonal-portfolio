"use client";
import { Mail, Download } from "lucide-react";
import { developerData } from "@/app/data/mock/developer";
import Image from "next/image";
import { programmingLanguages } from "@/app/data/mock/programing";
import Carousel from "@/app/components/shared/carousel";
import { useState, useEffect } from "react";

export function ProfileHeader() {
  const [round, setRound] = useState(false);
  const [baseWidth, setBaseWidth] = useState(300);
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1220) {
        setRound(true);
        setBaseWidth(150);
        setIsHorizontal(true);
        console.log("horizontal mode", true);
      } else {
        setRound(false);
        setBaseWidth(300);
        setIsHorizontal(false);
        console.log("vertical mode", true);
      }
    };

    // Run once on mount and add resize listener
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function downloadResume() {
    const link = document.createElement("a");
    link.href = "SoulisackDOUANGLIVILAY_Resume.pdf";
    link.download = "SoulisackDOUANGLIVILAY_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const { name, role, avatar, bio, coreSkills } = developerData;
  
  // Tools wrapper component
  const ToolsWrapper = () => (
    <div className={`relative overflow-hidden p-[5px] ${
      isHorizontal 
        ? 'min-w-[230px] min-h-[30px] before:content-[\'\'] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-10 before:pointer-events-none before:z-10 before:bg-gradient-to-r before:from-[rgba(16,17,4,1)] before:via-[rgba(16,17,4,0.8)] before:to-transparent' 
        : 'min-h-[230px] min-w-[30px] before:content-[\'\'] before:absolute before:left-0 before:right-0 before:top-0 before:h-10 before:pointer-events-none before:z-10 before:bg-gradient-to-b before:from-[rgba(16,17,4,1)] before:via-[rgba(16,17,4,0.8)] before:to-transparent'
    }`}>
      {programmingLanguages.map((language, index) => (
        <div
          key={language.title}
          className={`absolute rounded-md cursor-pointer shadow-[0_2px_10px_rgba(63,28,161,0.2)] transition-shadow duration-300 hover:scale-[1.15] text-primary-foreground ${
            isHorizontal 
              ? 'left-[-100px] animate-slideToRight' 
              : 'bottom-[max(calc(100px*12),100%)] animate-slideToDown'
          }`}
          style={{
            animationDelay: `calc(20s / ${programmingLanguages.length} * (${programmingLanguages.length} - ${index + 1}) * -1)`,
            animationDuration: "20s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {language.node}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex flex-col justify-center md:w-2xs md:h-full xl:w-sm xl:h-80 2xl:w-lg 2xl:h-120 gap-2">
        <div className={`flex gap-4 justify-center items-center ${isHorizontal ? 'flex-col' : ''}`}>
          <div className="flex justify-center items-center">
            <Carousel
              baseWidth={baseWidth}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={round}
            />
          </div>
          <div className="flex justify-center items-center gap-1">
            <ToolsWrapper />
          </div>
        </div>
      </div>
    </>
  );
}
