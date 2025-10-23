import type { Track } from "@/lib/types";

export type TrackStats = {
  genreCount: Record<string, number>;
  keyCount: Record<string, number>;
  artistCount: Record<string, number>;
  bpm: {
    min: number | null;
    max: number | null;
    avg: number | null;
    median: number | null;
    count: number;
  };
};

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
    : sorted[mid];
}

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
  const bpmMin = bpmValues.length ? Math.min(...bpmValues) : null;
  const bpmMax = bpmValues.length ? Math.max(...bpmValues) : null;
  const bpmAvg = bpmValues.length
    ? Math.round(bpmValues.reduce((a, b) => a + b, 0) / bpmValues.length)
    : null;
  const bpmMedian = median(bpmValues);

  return {
    genreCount,
    keyCount,
    artistCount,
    bpm: {
      min: bpmMin,
      max: bpmMax,
      avg: bpmAvg,
      median: bpmMedian,
      count: bpmValues.length,
    },
  };
}
