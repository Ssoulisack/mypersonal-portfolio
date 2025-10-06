import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/app/components/ui/sidebar";
import { Mail, Download } from "lucide-react";
import ProfileCard from "@/app/components/shared/profileCard";
import GlassIcons from "@/app/components/layout/navMain";
import { FiEdit, FiCloud, FiBook, FiFileText, FiHeart, FiBarChart2 } from "react-icons/fi";
import Image from 'next/image';
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

// update with your own icons and colors
const items = [
    { icon: <FiFileText />, color: 'blue', label: 'Files', customClass: 'lg:w-[3em] lg:h-[3em]' },
    { icon: <FiBook />, color: 'purple', label: 'Books', customClass: 'lg:w-[3em] lg:h-[3em]' },
    { icon: <FiHeart />, color: 'red', label: 'Health', customClass: 'lg:w-[3em] lg:h-[3em]' },
    { icon: <FiCloud />, color: 'indigo', label: 'Weather', customClass: 'lg:w-[3em] lg:h-[3em]' },
    { icon: <FiEdit />, color: 'orange', label: 'Notes', customClass: 'lg:w-[3em] lg:h-[3em]' },
    { icon: <FiBarChart2 />, color: 'green', label: 'Stats', customClass: 'lg:w-[3em] lg:h-[3em]' },
];


export function AppSidebar() {
    function downloadResume() {
        const link = document.createElement("a");
        link.href = "SoulisackDOUANGLIVILAY_Resume.pdf";
        link.download = "SoulisackDOUANGLIVILAY_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <Sidebar variant="inset" side="left">
            <SidebarHeader className="flex justify-center items-center my-4 lg:my-8">
                <div>
                    <ProfileCard
                        color="#dddddd"
                        speed={1}
                        chaos={0.5}
                        thickness={2}
                        style={{ borderRadius: '50%', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div className="w-full h-full flex items-center justify-center p-2">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black/20 shadow-2xl shadow-white/30">
                                <Image
                                    src="/images/nagi.jpeg"
                                    alt="Profile"
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </ProfileCard>
                </div>
                <div className="text-center px-4">
                    <h1 className="text-base font-semibold tracking-wide">Soulisack DUANGVILAY</h1>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={downloadResume} aria-label="Download CV" className="bg-background rounded-full hover:bg-popover-foreground hover:cursor-pointer my-4">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="bg-background">Download CV</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </SidebarHeader>
            <SidebarContent className="flex justify-center">
                <SidebarGroup />
                <GlassIcons items={items} />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}