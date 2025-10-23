// import { getSpotifyToken } from "./spotifyAuth";

// export async function fetchArtistTracks(artist: string) {
//   const [spotifyTracks, musicbrainzTracks] = await Promise.all([
//     fetchSpotifyTracks(artist),
//     fetchMusicBrainzTracks(artist),
//   ]);

//   return [...spotifyTracks, ...musicbrainzTracks];
// }

// async function fetchSpotifyTracks(artist: string) {
//   const token = await getSpotifyToken();
//   const res = await fetch(
//     `https://api.spotify.com/v1/search?q=${encodeURIComponent(
//       artist
//     )}&type=track&limit=10`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

//   const data = await res.json();
//   return data.tracks.items.map((track: any) => ({
//     artist: track.artists[0].name,
//     title: track.name,
//     bpm: null, // Spotify doesn't expose BPM directly
//     key: null,
//     genre: null,
//   }));
// }

// async function fetchMusicBrainzTracks(artist: string) {
//   const res = await fetch(
//     `https://musicbrainz.org/ws/2/recording?query=artist:${encodeURIComponent(
//       artist
//     )}&fmt=json&limit=10`
//   );
//   const data = await res.json();

//   return data.recordings.map((rec: any) => ({
//     artist: rec["artist-credit"]?.[0]?.name ?? artist,
//     title: rec.title,
//     bpm: null,
//     key: null,
//     genre: null,
//   }));
// }
