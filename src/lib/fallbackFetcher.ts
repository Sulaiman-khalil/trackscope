export async function fetchArtistTracks(artist: string) {
  const [mb] = await Promise.all([
    fetchMusicBrainzTracks(artist),
    // Optional: weitere Quellen wie Discogs
  ]);

  return mb;
}

async function fetchMusicBrainzTracks(artist: string) {
  const res = await fetch(
    `https://musicbrainz.org/ws/2/recording?query=artist:"${encodeURIComponent(
      artist
    )}" AND status:official&fmt=json&limit=10`,
    {
      headers: {
        "User-Agent":
          "Trackscope/1.0 ( https://github.com/Sulaiman-khalil/trackscope )",
      },
    }
  );

  const data = await res.json();
  //   console.log("MBZ raw response:", JSON.stringify(data, null, 2));
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
