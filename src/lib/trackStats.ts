import type { Track } from "@/lib/types";

export type TrackStats = {
  genreCount: Record<string, number>;
  keyCount: Record<string, number>;
  artistCount: Record<string, number>;
  bpm: {
    min: number;
    max: number;
    avg: number | null;
  };
};

export function getTrackStats(tracks: Track[]): TrackStats {
  const genreCount: Record<string, number> = {};
  const keyCount: Record<string, number> = {};
  const artistCount: Record<string, number> = {};
  const bpmValues: number[] = [];

  for (const track of tracks) {
    if (track.genre) {
      genreCount[track.genre] = (genreCount[track.genre] || 0) + 1;
    }

    if (track.key) {
      keyCount[track.key] = (keyCount[track.key] || 0) + 1;
    }

    if (track.artist) {
      artistCount[track.artist] = (artistCount[track.artist] || 0) + 1;
    }

    if (typeof track.bpm === "number" && !isNaN(track.bpm)) {
      bpmValues.push(track.bpm);
    }
  }

  const bpmMin = bpmValues.length ? Math.min(...bpmValues) : Infinity;
  const bpmMax = bpmValues.length ? Math.max(...bpmValues) : -Infinity;
  const bpmAvg = bpmValues.length
    ? Math.round(bpmValues.reduce((a, b) => a + b, 0) / bpmValues.length)
    : null;

  return {
    genreCount,
    keyCount,
    artistCount,
    bpm: {
      min: bpmMin,
      max: bpmMax,
      avg: bpmAvg,
    },
  };
}
