"use client";

import { Github, Calendar, TrendingUp } from "lucide-react";
import { ContributionDay } from "@/app/core/types/github.type";
import { GitHubContributions } from "@/app/components/shared/GitHubContributions";
import { GITHUB_CONFIG } from "@/app/core/config/constants";
import { useGitHubData } from "@/app/hooks/useGitHubData";

export const GitHubActivity = () => {
  const { data: contributions, loading, error } = useGitHubData();
  
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
      <div className="grid grid-cols-3 py-6 gap-2 mb-4">
        <div className="flex flex-col items-center p-2 rounded border border-gray-600/50">
          <Github className="h-4 w-4 text-primary mb-1" />
          <p className="text-xs font-bold">{totalContributions}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>

        <div className="flex flex-col items-center p-2 rounded border border-gray-600/50">
          <TrendingUp className="h-4 w-4 text-primary mb-1" />
          <p className="text-xs font-bold">{maxContributions}</p>
          <p className="text-xs text-muted-foreground">Max</p>
        </div>

        <div className="flex flex-col items-center p-2 rounded border border-gray-600/50">
          <Calendar className="h-4 w-4 text-primary mb-1" />
          <p className="text-xs font-bold">{activeDays}</p>
          <p className="text-xs text-muted-foreground">Days</p>
        </div>
      </div>
      {/* Contribution Calendar */}
      {contributionData.length > 0 && (
        <div className="p-2 rounded ">
          <GitHubContributions
            data={contributionData}
            username={GITHUB_CONFIG.GITHUB_USERNAME || "your-github-username"}
          />
        </div>
      )}
    </div>
  );
};
