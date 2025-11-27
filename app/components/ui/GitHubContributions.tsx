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
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'3M' | '6M' | '9M' | '12M'>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? '6M' : '12M';
    }
    return '12M';
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth < 768;
      setIsMobile(isMobileScreen);
      
      if (window.innerWidth < 1330) {
        setBaseWidth(8);
      } else {
        setBaseWidth(16);
      }
    };

    // Run once on mount and add resize listener
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter data based on selected filter (3, 6, 9, 12 months or full 12M)
  const filteredData = useMemo(() => {
    if (selectedFilter === '12M') return data;
    
    // Extract number from string like '3M' -> 3, '6M' -> 6, etc.
    const months = parseInt(selectedFilter);
    
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - months);
    
    return data.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate >= monthsAgo;
    });
  }, [data, selectedFilter]);

  // Transform data to the format expected by react-activity-calendar
  const calendarData = useMemo(() => {
    return transformDataForCalendar(filteredData);
  }, [filteredData]);

  // Calculate total contributions
  const totalContributions = filteredData.reduce((sum, day) => sum + day.contributionCount, 0);

  const filterOptions: Array<{ label: string; value: '3M' | '6M' | '9M' | '12M' }> = [
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '9M', value: '9M' },
    { label: '12M', value: '12M' },
  ];

  // Filter options for mobile - hide 9M and 12M
  const visibleFilterOptions = useMemo(() => {
    if (isMobile) {
      return filterOptions.filter(option => option.value !== '9M' && option.value !== '12M');
    }
    return filterOptions;
  }, [isMobile]);

  return (
    <>
      <div className='flex justify-center lg:justify-between  px-8 lg:px-4 items-center gap-2 mb-4'>
        {/* Filter Buttons */}
        <p className="hidden md:block text-xs sm:text-sm xl:text-base text-muted-foreground py-2">
          {username} has {totalContributions} contributions
          {selectedFilter !== '12M' && ` in the last ${parseInt(selectedFilter)} months`}
        </p>
        <div className='flex justify-center'>
        <GitHubButton href="https://github.com/Ssoulisack" />
      </div>
        <div className="flex items-center rounded-lg bg-[rgba(66,66,66,0.44)] border border-[rgba(66,66,66,0.3)] backdrop-blur-[2.9px]">
          {visibleFilterOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setSelectedFilter(option.value)}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all duration-200 ${
                selectedFilter === option.value
                  ? 'bg-white/10 text-[var(--nav-fg)] font-medium'
                  : 'text-[var(--nav-fg)]/60 hover:text-[var(--nav-fg)]/80 hover:bg-white/5'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
      </div>

      <div className="overflow-x-auto px-4">
        <ActivityCalendar
          data={calendarData}
          theme={{
            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
          }}
          colorScheme="dark"
          showWeekdayLabels={true}
          hideMonthLabels={false}
          blockSize={baseWidth}
          blockMargin={2}
          fontSize={10}
          weekStart={0} // Start week on Sunday
        />
      </div>
    </>
  );
}
