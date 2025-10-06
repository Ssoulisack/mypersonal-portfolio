interface SpotifyResponse {
  items: SpotifyTrack[];
}
interface SpotifyTrack {
  name: string;
  artists: any[];
}
export type { SpotifyResponse };