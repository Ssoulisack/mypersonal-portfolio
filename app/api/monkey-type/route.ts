import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { 
  MonkeyTypeAPIResponse, 
  MonkeyTypeAPIError,
} from '@/app/core/types/monkey-type.type'
import { API_ENDPOINTS } from '@/app/core/config/constants'

// Cache for storing API responses
const cache = new Map<string, { data: MonkeyTypeAPIResponse; timestamp: number; hash: string }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day

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
      cacheSize: cache.size,
      cacheKeys: Array.from(cache.keys()),
      hasCachedData: cache.has(cacheKey)
    });

    const cached = cache.get(cacheKey);
    const isCacheValid = cached && (now - cached.timestamp < CACHE_DURATION);

    // Create axios instance for this request
    const monkeyTypeAxios = axios.create({
      baseURL: process.env.MONKEY_URL || 'https://api.monkeytype.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App/1.0',
        ...(process.env.APE_KEY && { 'Authorization': `ApeKey ${process.env.APE_KEY}` })
      }
    })

    // If we have valid cache, check it first before making API call
    if (useCache && cached && isCacheValid) {
      const cacheAge = now - cached.timestamp;
      console.log('📦 Valid cache found:', { 
        cacheAge: `${Math.floor(cacheAge / 1000)}s`,
        maxAge: `${Math.floor(CACHE_DURATION / 1000)}s`
      });
      
      // Fetch fresh data to compare
      console.log('🌐 Fetching fresh data to compare...');
    } else if (cached) {
      console.log('⏰ Cache expired, fetching fresh data');
    } else {
      console.log('❌ No cache found, fetching fresh data');
    }

    // Fetch fresh data from MonkeyType API
    const { data } = await monkeyTypeAxios.get<MonkeyTypeAPIResponse>(url)

    if (!data) {
      throw new MonkeyTypeAPIError('No response data from MonkeyType API')
    }

    // Calculate hash of new data
    const newHash = hashData(data);

    // If cache is valid and data hasn't changed, return cached data
    if (useCache && isCacheValid && cached && cached.hash === newHash) {
      console.log('✅ Data unchanged, returning cached data');
      return NextResponse.json({
        success: true,
        data: cached.data,
        cached: true,
        timestamp: cached.timestamp
      })
    }

    // Data changed or no cache - update cache
    const dataChanged = cached && cached.hash !== newHash;
    console.log(dataChanged ? '🔄 Data changed, updating cache' : '💾 Storing new cache');
    
    cache.set(cacheKey, {
      data: data,
      timestamp: now,
      hash: newHash
    });

    // console.log('💾 Cache stored:', { 
    //   cacheKey, 
    //   timestamp: now,
    //   cacheSize: cache.size,
    //   allCacheKeys: Array.from(cache.keys()),
    //   dataChanged
    // });

    console.log('✅ MonkeyType data fetched successfully');

    return NextResponse.json({
      success: true,
      data: data,
      cached: false,
      timestamp: now
    })
  } catch (error) {
    console.error('❌ MonkeyType API error:', error)
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return NextResponse.json({
          success: false,
          error: 'MonkeyType API access forbidden. API key may be invalid or insufficient permissions.'
        }, { status: 403 })
      }

      if (error.response?.status === 429) {
        return NextResponse.json({
          success: false,
          error: 'MonkeyType API rate limit exceeded. Please try again later.'
        }, { status: 429 })
      }

      if (error.response?.status === 479) {
        return NextResponse.json({
          success: false,
          error: 'ApeKey rate limit exceeded.'
        }, { status: 479 })
      }
      
      return NextResponse.json({
        success: false,
        error: `MonkeyType API error: ${error.response?.status} ${error.response?.statusText}`
      }, { status: error.response?.status || 500 })
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
