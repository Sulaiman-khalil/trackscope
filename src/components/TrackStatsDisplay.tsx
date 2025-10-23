"use client";

import type { TrackStats } from "@/lib/trackStats";

type Props = {
  stats: TrackStats;
};

export default function TrackStatsDisplay({ stats }: Props) {
  const renderCountMap = (label: string, map: Record<string, number>) => {
    const entries = Object.entries(map);
    if (entries.length === 0) return null;

    return (
      <div>
        <h3 className="font-semibold">{label}</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {entries.map(([key, count]) => (
            <li key={key}>
              {key}: {count}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const { bpm } = stats;

  return (
    <section className="space-y-4 mt-6">
      <h2 className="text-xl font-bold">📊 Track Stats</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCountMap("Genres", stats.genreCount)}
        {renderCountMap("Keys", stats.keyCount)}
        {renderCountMap("Artists", stats.artistCount)}
      </div>

      <div className="text-sm text-gray-800 space-y-1">
        <h3 className="font-semibold">BPM Range</h3>
        <p>
          <strong>Min:</strong> {bpm.min ?? "–"}
        </p>
        <p>
          <strong>Max:</strong> {bpm.max ?? "–"}
        </p>
        <p>
          <strong>Avg:</strong> {bpm.avg ?? "–"}
        </p>
        <p>
          <strong>Median:</strong> {bpm.median ?? "–"}
        </p>
      </div>
    </section>
  );
}
