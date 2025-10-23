import type { Track } from "@/lib/types";
import { enrichFromStatic } from "@/lib/staticEnricher";
import { enrichFromMBZ } from "@/lib/mbzEnricher";

export async function enrichFromAudioDB(track: Track): Promise<Track | null> {
  try {
    const res = await fetch("/api/enrich", {
      method: "POST",
      body: JSON.stringify({ artist: track.artist, title: track.title }),
      headers: { "Content-Type": "application/json" },
    });

    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType?.includes("application/json")) return null;

    const data = await res.json();
    if (!data.track || data.track.length === 0) return null;

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
  } catch {
    return null;
  }
}

export async function enrichTrackMulti(
  track: Track,
  sources: ("audiodb" | "mbz" | "static")[] = ["audiodb", "mbz", "static"]
): Promise<Track> {
  for (const source of sources) {
    let enriched: Track | null = null;

    if (source === "audiodb") enriched = await enrichFromAudioDB(track);
    if (source === "mbz") enriched = await enrichFromMBZ(track);
    if (source === "static") enriched = enrichFromStatic(track);

    if (enriched && (enriched.bpm || enriched.genre || enriched.key)) {
      return enriched;
    }
  }

  // Fallback: return original track with nulls
  return { ...track, bpm: null, key: null, genre: null };
}
