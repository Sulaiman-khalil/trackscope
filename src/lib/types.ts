export type Track = {
  artist: string;
  title: string;
  bpm: number | null;
  key: string | null;
  genre: string | null;
  releaseYear?: number;
  label?: string;
  source?: "MusicBrainz" | "AudioDB" | "Static";
  confidenceScore?: number;
};
