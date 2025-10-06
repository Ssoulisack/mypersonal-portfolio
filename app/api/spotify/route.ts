import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { API_ENDPOINTS } from '@/app/core/config/constants'

// Cache for storing API responses
const cache = new Map<string, { data: any; timestamp: number; hash: string }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Simple hash function to detect data changes
const hashData = (data: any): string => {
  return JSON.stringify(data);
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const useCache = searchParams.get('useCache') !== 'false';
    const limit = searchParams.get('limit') || '20';
    const offset = searchParams.get('offset') || '0';
    
    // Get playlist ID from environment variable or query parameter
    const playlistId = process.env.SPOTIFY_PLAYLIST_ID || searchParams.get('playlist_id');
    
    // If playlist ID is provided, get tracks from that specific playlist
    // Otherwise, list all playlists
    let url: string;
    let cacheKey: string;
    
    if (playlistId) {
      url = `${API_ENDPOINTS.SPOTIFY.GET_PLAYLIST_TRACKS}/${playlistId}/tracks?limit=${limit}&offset=${offset}`;
      cacheKey = `spotify-playlist-tracks-${playlistId}-${limit}-${offset}`;
    } else {
      url = `${API_ENDPOINTS.SPOTIFY.GET_PLAYLIST_TRACKS.replace('/v1/playlists', '/v1/me/playlists')}?limit=${limit}&offset=${offset}`;
      cacheKey = `spotify-playlists-${limit}-${offset}`;
    }
    
    const now = Date.now();

    // Check cache first
    console.log('🔍 Cache check:', { 
      useCache, 
      cacheKey, 
      playlistId: playlistId || 'none',
      cacheSize: cache.size,
      cacheKeys: Array.from(cache.keys()),
      hasCachedData: cache.has(cacheKey)
    });

    if (useCache) {
      const cached = cache.get(cacheKey);
      if (cached) {
        const cacheAge = Date.now() - cached.timestamp;
        const isExpired = cacheAge >= CACHE_DURATION;

        if (!isExpired) {
          console.log("✅ Returning cached data");
          return NextResponse.json({
            success: true,
            data: cached.data,
            cached: true,
            playlistId: playlistId || process.env.SPOTIFY_PLAYLIST_ID || null,
            timestamp: cached.timestamp,
          });
        } else {
          console.log("⏰ Cache expired, fetching fresh data");
        }
      } else {
        console.log("❌ No cache found for this key");
      }
    }

    // console.log("🌐 Fetching Spotify data...", { cacheKey, playlistId: playlistId || 'all playlists' });

    // Create axios instance for this request
    const spotifyAxios = axios.create({
      baseURL: process.env.SPOTIFY_BASE_URL || 'https://api.spotify.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App/1.0',
        ...(process.env.SPOTIFY_TOKEN && { 'Authorization': `Bearer ${process.env.SPOTIFY_TOKEN}` })
      }
    })

    let data: any;
    try {
      const response = await spotifyAxios.get(url);
      data = response.data;
    } catch (axiosError: any) {
      throw axiosError;
    }

    if (!data) {
      throw new Error('No response data from Spotify API')
    }

    // Cache the result
    if (useCache) {
      const timestamp = Date.now();
      cache.set(cacheKey, {
        data: data,
        timestamp,
        hash: hashData(data)
      });
    }


    return NextResponse.json({
      success: true,
      data: data,
      cached: false,
      timestamp: Date.now(),
      playlistId: playlistId || process.env.SPOTIFY_PLAYLIST_ID || null,
      type: playlistId ? 'playlist_tracks' : 'all_playlists',
    });
  } catch (error) {
    console.error("❌ Error fetching Spotify playlists:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json({
          success: false,
          error: 'Spotify API access unauthorized. Token may be invalid or expired.'
        }, { status: 401 })
      }

      if (error.response?.status === 403) {
        return NextResponse.json({
          success: false,
          error: 'Spotify API access forbidden. Insufficient permissions.'
        }, { status: 403 })
      }

      if (error.response?.status === 429) {
        return NextResponse.json({
          success: false,
          error: 'Spotify API rate limit exceeded. Please try again later.'
        }, { status: 429 })
      }
      
      return NextResponse.json({
        success: false,
        error: `Spotify API error: ${error.response?.status} ${error.response?.statusText}`
      }, { status: error.response?.status || 500 })
    }
    
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
