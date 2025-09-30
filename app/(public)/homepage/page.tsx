"use client";

// import SplashCursor from "@/app/components/shared/SplashCursor";
import { GitHubActivity } from "@/app/components/layout/GitHubActivity";
import { WPMDisplay } from "@/app/components/layout/WPMDisplay";
import MagicBento from "@/app/components/shared/magic-bento";
import { ProfileHeader } from "@/app/components/layout/ProfileHeader";

export default function Homepage() {
  return (
    <>
      {/* <SplashCursor /> */}
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <div className="w-full bg-background px-2 sm:px-3 lg:px-4">
          <div className="text-center mb-8">
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
                  label: 'Soulisack DUANGVILAY',
                  title: 'Profile',
                  description: 'introduction',
                  color: '#101104',
                  customContent: (
                    <>
                      <ProfileHeader />
                    </>
                  ),
                },
                {
                  label: 'Overview',
                  title: 'Dashboard',
                  color: '#101104',
                  description: 'Centralized data view',
                },
                {
                  label: 'GitHub Activity',
                  title: 'Activity',
                  description: 'Contributions',
                  color: '#101104',
                  customContent: (
                    <>
                      <GitHubActivity />
                    </>
                  ),
                },
                {
                  label: 'Typing Performance',
                  title: 'Activity',
                  description: 'Contributions',
                  color: '#101104',
                  customContent: (
                    <>
                      <WPMDisplay />
                    </>
                  ),
                },
                {
                  label: 'Overview',
                  title: 'Dashboard',
                  color: '#101104',
                  description: 'Centralized data view',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
