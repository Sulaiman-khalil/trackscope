import type { Track } from "@/lib/types";

export async function enrichTrackData(tracks: Track[]): Promise<Track[]> {
  const enriched = await Promise.all(
    tracks.map(async (track) => {
      const enriched = await fetchFromAudioDB(track.artist, track.title);
      return {
        ...track,
        bpm: enriched?.bpm ?? track.bpm,
        key: enriched?.key ?? track.key,
        genre: enriched?.genre ?? track.genre,
      };
    })
  );

  return enriched;
}

async function fetchFromAudioDB(artist: string, title: string) {
  try {
    const res = await fetch(
      `https://theaudiodb.com/api/v1/json/2/searchtrack.php?s=${encodeURIComponent(
        artist
      )}&t=${encodeURIComponent(title)}`
    );
    const data = await res.json();

    const track = data.track?.[0];
    if (!track || !track.strTrack) {
      console.warn("No match in AudioDB");
      return null;
    }
    console.log("AudioDB response:", JSON.stringify(data, null, 2));
    return {
      bpm: track.intTempo ? parseInt(track.intTempo) : null,
      key: track.strKey && track.strKey !== "–" ? track.strKey : "Unknown",
      genre: track.strGenre || null,
    };
  } catch (err) {
    console.warn("AudioDB fetch failed:", err);
    return null;
  }
}
