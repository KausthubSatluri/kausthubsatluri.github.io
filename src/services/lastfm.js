const API_KEY = '0b4c2c6a4310e6f08797a0084e1c1bb0';
const USERNAME = 'kaikoo05';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const getRecentTracks = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch Last.fm data');
        }

        const data = await response.json();
        const track = data.recenttracks.track[0];

        if (!track) return null;

        return {
            name: track.name,
            artist: track.artist['#text'],
            image: track.image.find(img => img.size === 'medium')['#text'],
            isPlaying: track['@attr'] && track['@attr'].nowplaying === 'true',
            url: track.url,
            date: track.date ? track.date['#text'] : null,
            timestamp: track.date ? track.date.uts : null
        };
    } catch (error) {
        console.error('Last.fm fetch error:', error);
        return null;
    }
};
