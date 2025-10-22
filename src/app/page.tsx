"use client";

import { useState } from "react";
import TrackCard from "@/components/TrackCard";
import TrackTable from "@/components/TrackTable";
import JSONUploader from "@/components/JSONUploader";
import { analyzeTrack } from "@/lib/trackAnalyzer";
import { exportToCSV } from "@/lib/exportCSV";

type RawTrack = {
  title: string;
  artist: string;
  bpm?: number;
  key?: string;
  genre?: string;
};

export default function Page() {
  const [tracks, setTracks] = useState(() =>
    [
      { title: "Hypnotic Pulse", artist: "Rødhåd" },
      { title: "Parallel Shift", artist: "Antigone", bpm: 132 },
      { title: "Eclipse", artist: "nthng", key: "8A", genre: "Deep Techno" },
    ].map(analyzeTrack)
  );

  const handleImport = (raw: RawTrack[]) => {
    const analyzed = raw.map(analyzeTrack);
    setTracks(analyzed);
  };

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">🎧 Trackscope</h1>

      <JSONUploader onImport={handleImport} />

      <button
        onClick={() => exportToCSV(tracks)}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Export CSV
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        {tracks.map((track) => (
          <TrackCard key={track.title} {...track} />
        ))}
      </div>

      <TrackTable tracks={tracks} />
    </main>
  );
}
