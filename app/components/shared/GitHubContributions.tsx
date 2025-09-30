"use client";

import React from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { ContributionDay } from '@/app/core/types/github.type';

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
  // Transform data to the format expected by react-activity-calendar
  const calendarData = React.useMemo(() => {
    return transformDataForCalendar(data);
  }, [data]);

  // Calculate total contributions
  const totalContributions = data.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <div className="py-4">
      <div className="">
        <p className="text-xs text-muted-foreground pb-4">
          {totalContributions} contributions in the last year
        </p>
      </div>

      <div className="">
        <ActivityCalendar
          data={calendarData}
          theme={{
            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
          }}
          colorScheme="dark"
          showWeekdayLabels={true}
          hideMonthLabels={false}
          blockSize={12}
          blockMargin={3}
          fontSize={12}
          weekStart={0} // Start week on Sunday
        />
      </div>
    </div>
  );
}
