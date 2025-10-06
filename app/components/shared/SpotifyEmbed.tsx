"use client";

import React, { useState, useEffect } from 'react';

interface SpotifyEmbedProps {
    title?: string;
    width?: string;
    height?: string;
    className?: string;
}

export const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
    title = "Spotify Playlist",
    width,
    height,
    className
}) => {
    const [playlistId, setPlaylistId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [responsiveWidth, setResponsiveWidth] = useState<string>(width || "400px");

    useEffect(() => {
        const loadPlaylistId = async () => {
            try {
                setLoading(true);
                setError(null);

                // Get the playlist ID from the API response
                const response = await fetch('/api/spotify');
                const result = await response.json();
                console.log("playlistId", result.playlistId)
                if (result.success && result.playlistId) {
                    setPlaylistId(result.playlistId);
                } else {
                    throw new Error('No playlist ID found in API response');
                }
            } catch (err) {
                console.error('Error loading playlist ID:', err);
                setError(err instanceof Error ? err.message : 'Failed to load playlist ID');
            } finally {
                setLoading(false);
            }
        };

        loadPlaylistId();
    }, []);

    // Handle responsive width based on window size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1330) {
                setResponsiveWidth(width || "400px");
            } else {
                setResponsiveWidth("150px");
            }
        };

        // Set initial width
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [width]);

    if (loading) {
        return (
            <div className={`spotify-embed ${className}`}>
                <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    <span className="ml-2 text-gray-600">Loading playlist...</span>
                </div>
            </div>
        );
    }

    if (error || !playlistId) {
        return (
            <div className={`spotify-embed ${className}`}>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-red-800 font-semibold mb-2">Error Loading Playlist</h3>
                    <p className="text-red-600 text-sm">{error || 'No playlist ID available'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`spotify-embed${className}`}>
            <div className="bg-transparent">
                <iframe
                    title={`Spotify Embed: ${title}`}
                    src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                    width={responsiveWidth}
                    height={height}
                    style={{ minHeight: '100px', minWidth: '300px' }}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                />
            </div>
        </div>
    );
};

export default SpotifyEmbed;
