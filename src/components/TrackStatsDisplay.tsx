"use client";

import { getTrackStats } from "@/lib/trackStats";

export default function TrackStatsDisplay({ tracks }: { tracks: any[] }) {
  const stats = getTrackStats(tracks);

  const renderCount = (obj: Record<string, number>) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => (
        <li key={key}>
          <strong>{key}</strong>: {count}
        </li>
      ));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">📊 Track Stats</h2>

      <div>
        <h3 className="font-semibold">Genres</h3>
        <ul className="list-disc ml-6">{renderCount(stats.genreCount)}</ul>
      </div>

      <div>
        <h3 className="font-semibold">Keys</h3>
        <ul className="list-disc ml-6">{renderCount(stats.keyCount)}</ul>
      </div>

      <div>
        <h3 className="font-semibold">Artists</h3>
        <ul className="list-disc ml-6">{renderCount(stats.artistCount)}</ul>
      </div>

      <div>
        <h3 className="font-semibold">BPM Range</h3>
        <p>
          Min: {stats.bpm.min} | Max: {stats.bpm.max} | Avg: {stats.bpm.avg}
        </p>
      </div>
    </div>
  );
}
