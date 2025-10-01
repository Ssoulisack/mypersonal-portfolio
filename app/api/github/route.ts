import { NextRequest, NextResponse } from "next/server";
import { githubAxios } from "@/app/core/config/axios";
import {
  ContributionDay,
  GitHubResponse,
  GitHubAPIError,
  GitHubUserNotFoundError,
} from "@/app/core/types/github.type";
import { GITHUB_CONFIG } from "@/app/core/config/constants";
import { BODY_QUERY } from "@/app/core/config/graphql";

// Cache for storing API responses
const cache = new Map<string, { data: ContributionDay[]; timestamp: number }>();
const username: string =
  GITHUB_CONFIG.GITHUB_USERNAME || "your-github-username";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useCache = searchParams.get("useCache") !== "false";
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;

    const cacheKey = `${username}-${from || "default"}-${to || "default"}`;

    // Check cache first
    console.log("🔍 Cache check:", {
      useCache,
      cacheKey,
      cacheSize: cache.size,
      cacheKeys: Array.from(cache.keys()),
      hasCachedData: cache.has(cacheKey),
    });

    if (useCache) {
      const cached = cache.get(cacheKey);
      if (cached) {
        const cacheAge = Date.now() - cached.timestamp;
        const isExpired = cacheAge >= GITHUB_CONFIG.CACHE_DURATION;

        if (!isExpired) {
          console.log("✅ Returning cached data");
          return NextResponse.json({
            success: true,
            data: cached.data,
            cached: true,
            timestamp: cached.timestamp,
          });
        } else {
          console.log("⏰ Cache expired, fetching fresh data");
        }
      } else {
        console.log("❌ No cache found for this key");
      }
    }

    console.log("🌐 Fetching GitHub contributions...", { username, cacheKey });

    let data: GitHubResponse;
    try {
      const response = await githubAxios.post<GitHubResponse>(
        "",
        BODY_QUERY.GET_CONTRIBUTIONS({ username })
      );
      data = response.data;
    } catch (axiosError: any) {
      throw axiosError;
    }

    // Handle GraphQL errors
    if (data.errors) {
      throw new GitHubAPIError(
        `GraphQL error: ${data.errors.map((e) => e.message).join(", ")}`
      );
    }

    // Extract and validate data
    const user = data.data?.user;
    if (!user) {
      throw new GitHubUserNotFoundError(username);
    }

    const weeks = user.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeks) {
      return NextResponse.json({
        success: true,
        data: [],
        cached: false,
        timestamp: Date.now(),
      });
    }

    // Flatten and filter data
    const contributions: ContributionDay[] = [];
    weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        // Filter by date range if specified
        if (from && day.date < from) return;
        if (to && day.date > to) return;

        contributions.push({
          date: day.date,
          contributionCount: day.contributionCount,
          color: day.color,
        });
      });
    });

    // Cache the result
    if (useCache) {
      const timestamp = Date.now();
      cache.set(cacheKey, {
        data: contributions,
        timestamp,
      });
      console.log("💾 Cache stored:", {
        cacheKey,
        dataLength: contributions.length,
        timestamp,
        cacheSize: cache.size,
        allCacheKeys: Array.from(cache.keys()),
      });
    }

    console.log("✅ GitHub contributions fetched successfully");

    return NextResponse.json({
      success: true,
      data: contributions,
      cached: false,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("❌ Error fetching GitHub contributions:", {
      username,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Handle axios errors
    if (error instanceof Error && "response" in error) {
      const axiosError = error as any;
      if (axiosError.response?.status === 404) {
        return NextResponse.json(
          {
            success: false,
            error: `GitHub user '${username}' not found`,
            code: "USER_NOT_FOUND",
          },
          { status: 404 }
        );
      }

      const rateLimitRemaining = parseInt(
        axiosError.response?.headers["x-ratelimit-remaining"] || "0"
      );

      return NextResponse.json(
        {
          success: false,
          error: `GitHub API error: ${axiosError.response?.status} ${axiosError.response?.statusText}`,
          code: "API_ERROR",
          rateLimitRemaining,
        },
        { status: axiosError.response?.status || 500 }
      );
    }

    // Handle custom errors
    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: "API_ERROR",
          rateLimitRemaining: error.rateLimitRemaining,
        },
        { status: error.status || 500 }
      );
    }

    if (error instanceof GitHubUserNotFoundError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: "USER_NOT_FOUND",
        },
        { status: 404 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        code: "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
}
