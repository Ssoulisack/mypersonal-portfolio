"use client";
import { developerData } from "@/app/data/mock/developer";
import Carousel from "@/app/components/shared/carousel";
import { TechnologyTags } from "@/app/components/shared/TechnologyTags";
import { useState, useEffect } from "react";

export function CardBox() {
  const [round, setRound] = useState(false);
  const [baseWidth, setBaseWidth] = useState(300);
  const [baseHeight, setBaseHeight] = useState(200);
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRound(false);
        setBaseWidth(200);
        setBaseHeight(200);
        setIsHorizontal(true);
      }
      else if (window.innerWidth >= 768) {
        setRound(false);
        setBaseWidth(400);
        setBaseHeight(300);
        setIsHorizontal(false);
      }
      // else if (window.innerWidth >= 768 && window.innerWidth < 1220) {
      //   setRound(true);
      //   setBaseWidth(400);
      //   setBaseHeight(400);
      //   setIsHorizontal(true);
      // }
       else 
      {
        setRound(false);
        setBaseWidth(800);
        setBaseHeight(500);
        setIsHorizontal(false);
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

  return (
    <>
      <div className="flex flex-col justify-center md:w-2xs md:h-full xl:w-sm xl:h-80 2xl:w-160 2xl:h-120 gap-2">
        <div className={`flex gap-4 justify-center items-center ${isHorizontal ? 'flex-col' : ''}`}>
          <div className="flex justify-center items-center">
            <Carousel
              baseWidth={baseWidth}
              height={baseHeight}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={round}
            />
          </div>
          <div className="flex justify-center items-center gap-1">
            <TechnologyTags />
          </div>
        </div>
      </div>
    </>
  );
}
