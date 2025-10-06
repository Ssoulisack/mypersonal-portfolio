import { SpotifyResponse } from "@/app/core/types/spotify.type";

/**
 * Fetch Spotify playlist tracks from the API
 * Uses the environment variable SPOTIFY_PLAYLIST_ID from the API route
 */
export const fetchSpotifyPlaylistTracks = async (): Promise<SpotifyResponse> => {
  try {
    const response = await fetch('/api/spotify');
    
    if (!response.ok) {
      throw new Error(
        `Spotify API request failed: ${response.status} ${response.statusText}`
      );
    }
    
    console.log("🎵 Spotify API response:", response);
    const result = await response.json();

    if (!result.success) {
      console.log("❌ API returned error:", result.error);
      throw new Error(
        result.error || "Spotify API returned unsuccessful response"
      );
    }

    // The API route returns the Spotify response directly in result.data
    return result.data as SpotifyResponse;

  } catch (error) {
    console.error("❌ Error fetching Spotify data:", error);
    throw new Error(
      `Failed to fetch Spotify data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};