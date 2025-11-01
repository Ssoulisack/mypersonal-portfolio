import { WPMDisplay } from "@/app/components/layout/wpmDisplay";
import CardMagic from "@/app/components/shared/CardMagic";
import { CardBox } from "@/app/components/layout/cardbox";
import { GithubActivity } from "@/app/components/layout/GithubActivity";
import { SpotifyEmbed } from "@/app/components/shared/SpotifyEmbed";
import GlobeCard from "./GlobeCard";
import LightRays from '@/app/components/shared/bgLighter';
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
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            enableTilt={false}
                            enableMagnetism={false}
                            clickEffect={true}
                            spotlightRadius={500}
                            particleCount={22}
                            glowColor="132, 0, 255"
                            cards={[
                                {
                                    label: 'Profile summary',
                                    title: 'Dashboard',
                                    color: '#080113',
                                    description: 'Centralized data view',
                                },
                                {
                                    label: 'Soulisack DUANGVILAY',
                                    title: '',
                                    description: 'introduction',
                                    color: '#080113',
                                    backgroundComponent: (
                                        <LightRays 
                                            raysOrigin="top-center" 
                                            raysColor="#333333" 
                                            raysSpeed={1} 
                                            lightSpread={1} 
                                            rayLength={3} 
                                            pulsating={false} 
                                            fadeDistance={1} 
                                            saturation={2} 
                                            followMouse={true} 
                                            mouseInfluence={0.1} 
                                            noiseAmount={.5} 
                                            distortion={0.0} 
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
                                        <LightRays 
                                            raysOrigin="top-left" 
                                            raysColor="#333333" 
                                            raysSpeed={1} 
                                            lightSpread={1} 
                                            rayLength={3} 
                                            pulsating={false} 
                                            fadeDistance={1} 
                                            saturation={2} 
                                            followMouse={true} 
                                            mouseInfluence={0.1} 
                                            noiseAmount={.5} 
                                            distortion={0.0} 
                                        />
                                    ),
                                },
                                {
                                    label: 'My favorite playlist',
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
                                        <LightRays 
                                            raysOrigin="top-center" 
                                            raysColor="#333333" 
                                            raysSpeed={1} 
                                            lightSpread={2} 
                                            rayLength={1.5} 
                                            pulsating={false} 
                                            fadeDistance={1} 
                                            saturation={2} 
                                            followMouse={true} 
                                            mouseInfluence={0.1} 
                                            noiseAmount={.5} 
                                            distortion={0.0} 
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