import React, { useState, useEffect } from 'react';
import { getRecentTracks } from '../services/lastfm';
import './MusicCard.css';

const MusicCard = () => {
    const [track, setTrack] = useState(null);

    useEffect(() => {
        const fetchTrack = async () => {
            const data = await getRecentTracks();
            if (data) setTrack(data);
        };

        fetchTrack();
        const interval = setInterval(fetchTrack, 30000);

        return () => clearInterval(interval);
    }, []);

    if (!track) {
        return (
            <div className="music-card card-glass">
                <div className="track-info">
                    <div className="status">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <a href={track.url} target="_blank" rel="noopener noreferrer" className="music-card card-glass">
            <div className="music-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
            </div>

            {track.image && (
                <div className="album-art" style={{ backgroundImage: `url(${track.image})` }}></div>
            )}

            <div className="track-info">
                <div className="status">
                    {track.isPlaying ? (
                        <span className="sc-playing">
                            <span className="bar n1"></span>
                            <span className="bar n2"></span>
                            <span className="bar n3"></span>
                            Now Listening
                        </span>
                    ) : (
                        'Last Played'
                    )}
                </div>
                <div className="track-details">
                    <div className="track-name" title={track.name}>{track.name}</div>
                    <div className="artist-name" title={track.artist}>{track.artist}</div>
                </div>
            </div>
        </a>
    );
};

export default MusicCard;
