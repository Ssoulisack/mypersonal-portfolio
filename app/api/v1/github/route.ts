import { NextRequest, NextResponse } from "next/server";
import { githubAxios, handleAxiosError } from "@/app/core/config/axios";
import axios from "axios";
import {
  ContributionDay,
  GitHubResponse,
  GitHubAPIError,
  GitHubUserNotFoundError,
} from "@/app/core/types/apiGithub.type";
import { GITHUB_CONFIG, CACHE_CONFIG } from "@/app/core/config/constants";
import { BODY_QUERY } from "@/app/core/config/graphql";

// Cache for storing API responses
// const cache = new Map<string, { data: ContributionDay[]; timestamp: number }>();
const username: string =
  GITHUB_CONFIG.GITHUB_USERNAME || "your-github-username";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useCache = searchParams.get("useCache") !== "false";
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;

    const cacheKey = `${username}-${from || "default"}-${to || "default"}`;

    // // Check cache first
    // console.log("🔍 Cache check:", {
    //   useCache,
    //   cacheKey,
    //   cacheSize: CACHE_CONFIG.CACHE.size,
    //   cacheKeys: Array.from(CACHE_CONFIG.CACHE.keys()),
    //   hasCachedData: CACHE_CONFIG.CACHE.has(cacheKey),
    // });

    if (useCache) {
      const cached = CACHE_CONFIG.CACHE.get(cacheKey);
      if (cached) {
        const cacheAge = Date.now() - cached.timestamp;
        const isExpired = cacheAge >= CACHE_CONFIG.CACHE_DURATION;

        if (!isExpired) {
          console.log("✅ Returning cached data");
          return NextResponse.json({
            success: true,
            data: {
              contributions: cached.data,
              username
            },
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

    // console.log("🌐 Fetching GitHub contributions...", { username, cacheKey });

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
        data: {
          contributions: [],
          username
        },
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
      CACHE_CONFIG.CACHE.set(cacheKey, {
        data: contributions,
        timestamp,
        hash: JSON.stringify(contributions)
      });
      // console.log("💾 Cache stored:", {
      //   cacheKey,
      //   dataLength: contributions.length,
      //   timestamp,
      //   cacheSize: CACHE_CONFIG.CACHE.size,
      //   allCacheKeys: Array.from(CACHE_CONFIG.CACHE.keys()),
      // });
    }

    // console.log("✅ GitHub contributions fetched successfully");

    return NextResponse.json({
      success: true,
      data: {
        contributions,
        username
      },
      cached: false,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("❌ Error fetching GitHub contributions:", {
      username,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Handle custom domain errors
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

    // All axios errors go through centralized handler
    // (axios interceptor already added error metadata)
    const errorResponse = handleAxiosError(error);
    const rateLimitRemaining = axios.isAxiosError(error)
      ? parseInt(error.response?.headers["x-ratelimit-remaining"] || "0", 10)
      : 0;

    return NextResponse.json(
      {
        success: false,
        error: errorResponse.error,
        code: axios.isAxiosError(error) ? "API_ERROR" : "UNKNOWN_ERROR",
        rateLimitRemaining,
      },
      { status: errorResponse.status }
    );
  }
}
