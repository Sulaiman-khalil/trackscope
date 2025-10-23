import type { Track } from "@/lib/types";

const staticDB: Record<string, { bpm: number; key: string; genre: string }> = {
  Ellen: { bpm: 128, key: "8A", genre: "Ambient Techno" },
  Rødhåd: { bpm: 132, key: "7A", genre: "Deep Techno" },
  "Dax J": { bpm: 138, key: "9A", genre: "Hard Techno" },
  "Amelie Lens": { bpm: 134, key: "8B", genre: "Peak Time Techno" },
  Antigone: { bpm: 130, key: "7B", genre: "Melodic Techno" },
  nthng: { bpm: 125, key: "6A", genre: "Dub Techno" },
};

export function enrichFromStatic(track: Track): Track {
  const match = staticDB[track.artist];
  if (!match) return { ...track, bpm: null, key: null, genre: null };

  return {
    ...track,
    bpm: match.bpm,
    key: match.key,
    genre: match.genre,
  };
}
