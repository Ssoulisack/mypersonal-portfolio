"use client";
import { WPMDisplay } from "@/app/components/layout/wpmDisplay";
import CardMagic from "@/app/components/ui/CardMagic";
import { Testimonials } from "@/app/data/mock/testimonials";
import { GithubActivity } from "@/app/components/layout/GithubActivity";
import { SpotifyEmbed } from "@/app/components/ui/SpotifyEmbed";
import { BackgroundBeams } from "@/app/components/shared/backgroundBeams";
import Silk from "@/app/components/shared/backgroundSilk";
import GlobeCard from "./GlobeCard";
import { TechnologyTags } from "@/app/components/ui/TechnologyTags";
import { ProjectInfoCard } from "@/app/components/ui/ProjectInfoCard";
const MagicBento = () => {
    return (
        <>
            <div className="flex-1 flex justify-center items-center md:py-4 mx-2 md:mx-12">
                <div className="w-full lg:px-8">
                    <div className="flex flex-col justify-center items-center p-4 gap-y-2">
                        <h1 className="text-xl text-muted-foreground sm:text-3xl lg:text-4xl font-bold">Welcome</h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Explore my work, skills, and experience using the sidebar navigation.
                        </p>
                        <div className="w-full flex justify-end items-center gap-y-2">
                            {/* <SpotifyEmbed width="400px"
                  height="80px" /> */}
                        </div>
                    </div>
                    <div className="w-full">
                        <CardMagic
                            textAutoHide={true}
                            enableStars={true}
                            enableSpotlight={false}
                            enableBorderGlow={true}
                            enableTilt={false}
                            enableMagnetism={false}
                            clickEffect={false}
                            spotlightRadius={200}
                            particleCount={22}
                            glowColor="132, 0, 255"
                            cards={[
                                {
                                    label: 'Profile summary',
                                    title: 'Dashboard',
                                    color: '#080113',
                                    description: 'Centralized data view',
                                    customContent: (
                                        <div className="flex flex-col gap-4 h-full">
                                            <ProjectInfoCard
                                                label="The Inside Scoop"
                                                title="Currently building a SaaS Application"
                                                buttonText="View Recent Work"
                                                infiniteCardsItems={Testimonials}
                                                infiniteCardsDirection="left"
                                                infiniteCardsSpeed="fast"
                                                onButtonClick={() => {
                                                    console.log("View recent work clicked");
                                                    // Add your navigation or action here
                                                }}
                                            />
                                        </div>
                                    ),
                                    backgroundComponent: (
                                        <BackgroundBeams />
                                    )
                                },
                                    {
                                        label: 'Passionate about cutting-edge technologies',
                                        title: '',
                                        description: 'introduction',
                                        color: '#080113',
                                        customContent: (
                                            <>
                                                <TechnologyTags />
                                            </>
                                        ),
                                        backgroundComponent: (
                                            <Silk
                                                speed={5}
                                                scale={1}
                                                color="#171617"
                                                noiseIntensity={0}
                                                rotation={0}
                                            />
                                        ),
                                    },
                                    {
                                        label: 'Typing Performance',
                                        title: 'Activity',
                                        description: 'Contributions',
                                        color: '#080113',
                                        customContent: (
                                            <>
                                                <WPMDisplay targetTests={100} />
                                            </>
                                        ),
                                        backgroundComponent: (
                                            <Silk
                                                speed={5}
                                                scale={.9}
                                                color="#1b1608"
                                                noiseIntensity={0}
                                                rotation={4}
                                            />
                                        ),
                                    },
                                    {
                                        label: '',
                                        title: 'Spotify',
                                        color: '#080113',
                                        description: 'Centralized data view',
                                        hideOnMobile: false, // This card will be hidden on mobile screens
                                        customContent: (
                                            <>
                                                <GlobeCard />
                                            </>
                                        ),
                                    },
                                    {
                                        label: 'GitHub Activity',
                                        title: 'Activity',
                                        description: 'Contributions',
                                        color: '#080113',
                                        hideOnMobile: false,
                                        customContent: (
                                            <>
                                                <GithubActivity />
                                            </>
                                        ),
                                        backgroundComponent: (
                                            <Silk
                                                speed={5}
                                                scale={.9}
                                                color="#1b1637"
                                                noiseIntensity={0}
                                                rotation={4}
                                            />
                                        ),
                                    },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default MagicBento
