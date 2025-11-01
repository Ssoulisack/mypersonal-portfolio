"use client";

import { Github, Calendar, TrendingUp } from "lucide-react";
import { GitHubContributions } from "@/app/components/shared/GitHubContributions";
import { useGitHubData } from "@/app/hooks/useGitHubData";

export const GithubActivity = () => {
  const { data: contributions, username, loading, error } = useGitHubData();
  
  // Data is already in ContributionDay[] format from the service
  const contributionData = contributions || [];

  // Calculate stats from contributions
  const totalContributions = contributionData.reduce((sum, day) => sum + day.contributionCount, 0);
  const maxContributions = contributionData.length > 0 ? Math.max(...contributionData.map(day => day.contributionCount)) : 0;
  const activeDays = contributionData.filter(day => day.contributionCount > 0).length;

  if (loading) {
    return (
      <section id="github" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                GitHub Activity
              </h2>
              <p className="text-primary font-medium">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="w-full md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                GitHub Activity
              </h2>
              <p className="text-discord-red font-medium">Failed to load GitHub data</p>
              <p className="text-xs text-muted-foreground">Make sure to configure GITHUB_TOKEN in your environment</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="w-full">
      {/* Compact Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 xl:gap-4 ">
        <div className="flex flex-col items-center p-2 sm:p-2 xl:p-4 rounded">
          <Github className="h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 text-primary mb-1" />
          <p className="text-xs sm:text-sm xl:text-base font-bold">{totalContributions}</p>
          <p className="hidden md:block text-xs xl:text-sm text-muted-foreground">Total</p>
        </div>

        <div className="flex flex-col items-center p-2 sm:p-2 xl:p-4 rounded">
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 text-primary mb-1" />
          <p className="text-xs sm:text-sm xl:text-base font-bold">{maxContributions}</p>
          <p className="hidden md:block text-xs xl:text-sm text-muted-foreground">Max</p>
        </div>

        <div className="flex flex-col items-center p-2 sm:p-2 xl:p-4 rounded">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 xl:h-5 xl:w-5 text-primary mb-1" />
          <p className="text-xs sm:text-sm xl:text-base font-bold">{activeDays}</p>
          <p className="hidden md:block text-xs xl:text-sm text-muted-foreground">Days</p>
        </div>
      </div>
      {/* Contribution Calendar */}
      {contributionData.length > 0 && (
        <div className="p-2 md:p-4 rounded overflow-hidden">
          <GitHubContributions
            data={contributionData}
            username={username || ""}
          />
        </div>
      )}
    </div>
  );
};
