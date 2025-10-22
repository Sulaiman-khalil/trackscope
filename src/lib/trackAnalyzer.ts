// src/lib/trackAnalyzer.ts
export type RawTrack = {
  title: string;
  artist: string;
  bpm?: number;
  key?: string;
};

export function analyzeTrack(track: RawTrack) {
  const bpm = track.bpm ?? Math.floor(Math.random() * 40 + 120); // Dummy fallback
  const key = track.key ?? "Am";
  return { ...track, bpm, key };
}
