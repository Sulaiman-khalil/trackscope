export function getTrackStats(tracks: any[]) {
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
    if (track.bpm) {
      bpmValues.push(track.bpm);
    }
  }

  const bpmAvg = bpmValues.length
    ? Math.round(bpmValues.reduce((a, b) => a + b, 0) / bpmValues.length)
    : null;

  return {
    genreCount,
    keyCount,
    artistCount,
    bpm: {
      min: Math.min(...bpmValues),
      max: Math.max(...bpmValues),
      avg: bpmAvg,
    },
  };
}
