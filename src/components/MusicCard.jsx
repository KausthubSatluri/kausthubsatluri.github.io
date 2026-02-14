import React from 'react';
import './MusicCard.css';

const STATIC_SONG = {
    name: 'Forever Yours',
    artist: 'Brent Faiyaz',
    image: 'https://lastfm.freetls.fastly.net/i/u/300x300/55d67ee97f2051afc325f4c19e42c728.jpg',
    isPlaying: true,
    url: 'https://www.last.fm/music/Brent+Faiyaz/_/Forever+Yours'
};

const MusicCard = () => {
    return (
        <a href={STATIC_SONG.url} target="_blank" rel="noopener noreferrer" className="music-card card-glass">
            <div className="music-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
            </div>

            <div className="album-art" style={{ backgroundImage: `url(${STATIC_SONG.image})` }}></div>

            <div className="track-info">
                <div className="status">
                    <span className="sc-playing">
                        <span className="bar n1"></span>
                        <span className="bar n2"></span>
                        <span className="bar n3"></span>
                        Now Listening
                    </span>
                </div>
                <div className="track-details">
                    <div className="track-name" title={STATIC_SONG.name}>{STATIC_SONG.name}</div>
                    <div className="artist-name" title={STATIC_SONG.artist}>{STATIC_SONG.artist}</div>
                </div>
            </div>
        </a>
    );
};

export default MusicCard;
