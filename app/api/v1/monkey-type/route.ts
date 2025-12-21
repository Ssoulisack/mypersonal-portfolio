import { NextRequest, NextResponse } from 'next/server'
import { monkeyTypeAxios, handleAxiosError } from '@/app/core/config/axios'
import { 
  MonkeyTypeAPIResponse, 
  MonkeyTypeAPIError,
} from '@/app/core/types/apiMonkeyType.type'
import { API_ENDPOINTS } from '@/app/core/config/constants'
import { CACHE_CONFIG } from '@/app/core/config/constants'

// Simple hash function to detect data changes
const hashData = (data: any): string => {
  return JSON.stringify(data);
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useCache = searchParams.get('useCache') !== 'false';
    const url = API_ENDPOINTS.MONKEY_TYPE.GET_RESULT
    const cacheKey = 'monkeytype-results';
    const now = Date.now();

    // Check cache first
    console.log('🔍 Cache check:', { 
      useCache, 
      cacheKey, 
      cacheSize: CACHE_CONFIG.CACHE.size,
      cacheKeys: Array.from(CACHE_CONFIG.CACHE.keys()),
      hasCachedData: CACHE_CONFIG.CACHE.has(cacheKey)
    });

    if (useCache) {
      const cached = CACHE_CONFIG.CACHE.get(cacheKey);
      if (cached) {
        const cacheAge = Date.now() - cached.timestamp;
        const isExpired = cacheAge >= CACHE_CONFIG.CACHE_DURATION;

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

    console.log("🌐 Fetching MonkeyType contributions...", { cacheKey });

    let data: MonkeyTypeAPIResponse;
    try {
      const response = await monkeyTypeAxios.get<MonkeyTypeAPIResponse>(url);
      data = response.data;
    } catch (axiosError: any) {
      throw axiosError;
    }

    if (!data) {
      throw new MonkeyTypeAPIError('No response data from MonkeyType API')
    }

    // Cache the result
    if (useCache) {
      const timestamp = Date.now();
      CACHE_CONFIG.CACHE.set(cacheKey, {
        data: data,
        timestamp,
        hash: hashData(data)
      });
      console.log("💾 Cache stored:", {
        cacheKey,
        timestamp,
        cacheSize: CACHE_CONFIG.CACHE.size,
        allCacheKeys: Array.from(CACHE_CONFIG.CACHE.keys()),
      });
    }

    console.log("✅ MonkeyType data fetched successfully");

    return NextResponse.json({
      success: true,
      data: data,
      cached: false,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("❌ Error fetching MonkeyType data:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
    
    // Use centralized error handler from axios config
    const errorResponse = handleAxiosError(error);
    return NextResponse.json(
      {
        success: errorResponse.success,
        error: errorResponse.error,
        code: "API_ERROR",
      },
      { status: errorResponse.status }
    );
  }
}
