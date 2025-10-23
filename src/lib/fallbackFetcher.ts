export async function fetchArtistTracks(artist: string) {
  const [mb] = await Promise.all([
    fetchMusicBrainzTracks(artist),
    // Optional: weitere Quellen wie Discogs
  ]);

  return mb;
}

async function fetchMusicBrainzTracks(artist: string) {
  const res = await fetch(
    `https://musicbrainz.org/ws/2/recording?query=artist:${encodeURIComponent(
      artist
    )}&fmt=json&limit=10`
  );
  const data = await res.json();

  if (!data.recordings || !Array.isArray(data.recordings)) {
    console.warn("MusicBrainz returned no recordings");
    return [];
  }

  return data.recordings.map((rec: any) => ({
    artist: rec["artist-credit"]?.[0]?.name ?? artist,
    title: rec.title,
    bpm: null,
    key: null,
    genre: null,
  }));
}
