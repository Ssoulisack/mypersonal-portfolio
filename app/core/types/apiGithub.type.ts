interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  weeks: ContributionWeek[];
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

interface GitHubUser {
  contributionsCollection: ContributionsCollection;
}

interface GitHubResponse {
  data: {
    user: GitHubUser;
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

// Custom error classes for better error handling
export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public rateLimitRemaining?: number
  ) {
    super(message)
    this.name = 'GitHubAPIError'
  }
}

export class GitHubUserNotFoundError extends Error {
  constructor(username: string) {
    super(`GitHub user '${username}' not found`)
    this.name = 'GitHubUserNotFoundError'
  }
}

// GitHub data response interface
interface GitHubDataResponse {
  contributions: ContributionDay[];
  username: string;
}

// Export types for use in other files
export type { 
  ContributionDay, 
  ContributionWeek,
  ContributionCalendar,
  ContributionsCollection,
  GitHubUser,
  GitHubResponse,
  GitHubDataResponse
}