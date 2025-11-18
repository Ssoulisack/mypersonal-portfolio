"use client";

import React, { useState, useEffect } from 'react';
import { SPOTIFY_CONFIG } from '@/app/core/config/constants';

interface SpotifyEmbedProps {
    title?: string;
    width?: string;
    height?: string;
    className?: string;
    playlistID?: string;
}

export const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
    title = "Spotify Playlist",
    width,
    height,
    className,
    playlistID,
}) => {
    const [playlistId, setPlaylistId] = useState<string>('');
    const [responsiveWidth, setResponsiveWidth] = useState<string>(width || "300px");
    const [responsiveHeight, setResponsiveHeight] = useState<string>(height || "300px");
    const [loading, setLoading] = useState(true);


    // Set playlist ID on client-side only to avoid hydration mismatch
    useEffect(() => {
        const finalPlaylistId = playlistID || SPOTIFY_CONFIG.PLAYLIST_ID || '';
        setPlaylistId(finalPlaylistId);
        setLoading(false);
    }, [playlistID, SPOTIFY_CONFIG.PLAYLIST_ID]);

    // Handle responsive width based on window size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1330) {
                setResponsiveWidth(width || "400px");
                setResponsiveHeight(height || "400px");
            } else {
                setResponsiveWidth("100px");
                setResponsiveHeight("150px");
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

    return (
        <div className={`spotify-embed${className} relative top-24`}>
            <iframe
                title={`Spotify Embed: ${title}`}
                src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0&autoplay=true`}
                width={responsiveWidth}
                height={height}
                style={{ minHeight: '80px', minWidth: '300px' }}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
                loading="lazy"
                className="rounded-lg"
            />
        </div>
    );
};

export default SpotifyEmbed;
