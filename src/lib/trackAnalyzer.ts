export type RawTrack = {
  title: string;
  artist: string;
  bpm?: number;
  key?: string;
  genre?: string;
};

export type AnalyzedTrack = {
  title: string;
  artist: string;
  bpm: number;
  trackKey: string;
  genre?: string;
};

export function analyzeTrack(track: RawTrack): AnalyzedTrack {
  return {
    title: track.title,
    artist: track.artist,
    bpm: track.bpm ?? Math.floor(Math.random() * 40 + 120),
    trackKey: track.key ?? "Am",
    genre: track.genre,
  };
}
