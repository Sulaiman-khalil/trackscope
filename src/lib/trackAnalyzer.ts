export type RawTrack = {
  title: string;
  artist: string;
  bpm?: number;
  key?: string;
  genre?: string;
};

export type AnalyzedTrack = RawTrack & {
  bpm: number;
  key: string;
};

export function analyzeTrack(track: RawTrack): AnalyzedTrack {
  return {
    ...track,
    bpm: track.bpm ?? Math.floor(Math.random() * 40 + 120),
    key: track.key ?? "Am",
  };
}
