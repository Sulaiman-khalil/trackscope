export type BeatportRaw = {
  name: string;
  artist: string;
  bpm?: number;
  key?: string;
  genre?: string;
};

export function parseBeatportData(data: BeatportRaw[]) {
  return data.map((track) => ({
    title: track.name,
    artist: track.artist,
    bpm: track.bpm ?? 128,
    trackKey: track.key ?? "8A",
    genre: track.genre ?? "Techno",
  }));
}
