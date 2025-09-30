import { Mail, Download } from "lucide-react";
import { developerData } from "@/app/data/mock/developer";
import Image from "next/image";
import { programmingLanguages } from "@/app/data/mock/programing";
import Carousel from "@/app/components/shared/carousel";

export function ProfileHeader() {
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
      <div className="flex flex-col md:items-center gap-2">
        <div className="flex gap-4 md:mt-0 justify-center md:justify-start">
          <div className="">
            <Carousel
              baseWidth={300}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <div className="tools-wrapper">
              {programmingLanguages.map((language, index) => (
                <div
                  key={language.title}
                  className="tools-item"
                  style={{
                    animationDelay: `calc(20s / ${programmingLanguages.length} * (${programmingLanguages.length} - ${index + 1}) * -1)`
                  }}
                >
                  {language.node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
