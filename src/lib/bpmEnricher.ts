import type { Track } from "@/lib/types";

export async function enrichTrackData(tracks: Track[]): Promise<Track[]> {
  const enriched = await Promise.all(
    tracks.map(async (track) => {
      try {
        const res = await fetch("/api/enrich", {
          method: "POST",
          body: JSON.stringify({
            artist: track.artist,
            title: track.title,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          console.warn("API response not OK for", track.artist, track.title);
          return {
            ...track,
            bpm: null,
            key: null,
            genre: null,
          };
        }

        const data = await res.json();

        if (!data.track || data.track.length === 0) {
          console.warn("No match found for", track.artist, track.title);
          return {
            ...track,
            bpm: null,
            key: null,
            genre: null,
          };
        }

        const enrichedTrack = data.track[0];

        return {
          ...track,
          bpm: enrichedTrack.intTempo ? parseInt(enrichedTrack.intTempo) : null,
          key:
            enrichedTrack.strKey && enrichedTrack.strKey !== "–"
              ? enrichedTrack.strKey
              : null,
          genre: enrichedTrack.strGenre || null,
        };
      } catch (err) {
        console.error("AudioDB fetch failed:", err);
        return {
          ...track,
          bpm: null,
          key: null,
          genre: null,
        };
      }
    })
  );

  return enriched;
}
