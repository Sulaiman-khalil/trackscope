"use client";

import type { Track } from "@/lib/types";

type Props = {
  track: Track;
};

export default function TrackCard({ track }: Props) {
  return (
    <div className="border p-4 rounded bg-white shadow-sm">
      <h3 className="text-lg font-semibold">
        {track.title || "Unbekannter Titel"}
      </h3>
      <p className="text-sm text-gray-600">
        {track.artist || "Unbekannter Artist"}
      </p>
      <div className="mt-2 text-sm space-y-1">
        <p>
          <strong>BPM:</strong> {track.bpm ?? "–"}
        </p>
        <p>
          <strong>Key:</strong> {track.key ?? "–"}
        </p>
        <p>
          <strong>Genre:</strong> {track.genre ?? "–"}
        </p>
      </div>
    </div>
  );
}
