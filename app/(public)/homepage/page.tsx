"use client";

// import SplashCursor from "@/app/components/shared/SplashCursor";
import { WPMDisplay } from "@/app/components/layout/wpmDisplay";
import MagicBento from "@/app/components/shared/magic-bento";
import { CardBox } from "@/app/components/layout/cardbox";
import { GithubActivity } from "@/app/components/layout/GithubActivity";
import { SpotifyEmbed } from "@/app/components/shared/SpotifyEmbed";

export default function Homepage() {
  return (
    <>
      {/* <SplashCursor /> */}
      <div className="flex justify-center bg-background w-full min-h-screen">
        <div className="w-full px-2 sm:px-3 lg:px-8">
          <div className="flex flex-col justify-center items-center mb-8">
            <h1 className="text-2xl text-muted-foreground sm:text-3xl lg:text-4xl font-bold mb-4">Welcome</h1>
            <p className="text-muted-foreground">
              Explore my work, skills, and experience using the sidebar navigation.
            </p>
          </div>

          {/* Magic Bento Section with custom cards */}
          <div className="w-full">
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
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
                  customContent: (
                    <>
                      <CardBox />
                    </>
                  ),
                },
                {
                  label: 'GitHub Activity',
                  title: 'Activity',
                  description: 'Contributions',
                  color: '#080113',
                  customContent: (
                    <>
                      <GithubActivity />
                    </>
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
                },
                {
                  label: 'My favorite playlist',
                  title: 'Spotify',
                  color: '#080113',
                  description: 'Centralized data view',
                },
              ]}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-y-2 fixed bottom-4 right-4 z-50">
            <div>
              <h5 className="text-2xl text-muted-foreground sm:text-3xl lg:text-4xl font-bold mb-4">My favorite playlist</h5>
            </div>
            {/* <div className="flex flex-col justify-end items-end gap-y-2">
            <SpotifyEmbed className="fixed bottom-4 right-4 z-50 " width="400px"
              height="200px" />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
