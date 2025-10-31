"use client";

import { useEffect, useMemo, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { ContributionDay } from '@/app/core/types/github.type';
import GitHubButton from "@/app/components/ui/github-button";


interface GitHubContributionsProps {
  data: ContributionDay[];
  username: string;
}

// Transform API data to react-activity-calendar format
const transformDataForCalendar = (data: ContributionDay[]) => {
  return data.map(day => ({
    date: day.date,
    count: day.contributionCount,
    level: getContributionLevel(day.contributionCount)
  }));
};

// Get contribution level based on count (0-4 scale)
const getContributionLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 2) return 2;
  if (count <= 3) return 3;
  return 4;
};

export function GitHubContributions({ data, username }: GitHubContributionsProps) {
  const [baseWidth, setBaseWidth] = useState(12);
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1330) {
        setBaseWidth(8);
        setShowLabels(false);
        console.log("horizontal mode", true);
      } else {
        setBaseWidth(16);
        console.log("vertical mode", true);
        setShowLabels(true);
      }
    };

    // Run once on mount and add resize listener
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Transform data to the format expected by react-activity-calendar
  const calendarData = useMemo(() => {
    return transformDataForCalendar(data);
  }, [data]);

  // Calculate total contributions
  const totalContributions = data.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <>
      <div className='flex justify-center'>
        <p className="text-xs sm:text-sm xl:text-base text-muted-foreground py-2">
          {username} has {totalContributions} contributions in the last year
        </p>
      </div>

      <div className="overflow-x-auto px-4">
        <ActivityCalendar
          data={calendarData}
          theme={{
            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
          }}
          colorScheme="dark"
          showWeekdayLabels={showLabels}
          hideMonthLabels={showLabels}
          blockSize={baseWidth}
          blockMargin={2}
          fontSize={10}
          weekStart={0} // Start week on Sunday
        />
      </div>
      <div className='flex justify-center'>
        <GitHubButton href="https://github.com/Ssoulisack" />
      </div>
    </>
  );
}
