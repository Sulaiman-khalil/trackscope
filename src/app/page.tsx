"use client";

import { useState, useEffect } from "react";
import TrackCard from "@/components/TrackCard";
import TrackTable from "@/components/TrackTable";
import JSONUploader from "@/components/JSONUploader";
import TracklistParser from "@/components/TracklistParser";
import { analyzeTrack } from "@/lib/trackAnalyzer";
import { exportToCSV } from "@/lib/exportCSV";

export default function Page() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const initial = [
      { title: "Hypnotic Pulse", artist: "Rødhåd" },
      { title: "Parallel Shift", artist: "Antigone", bpm: 132 },
      { title: "Eclipse", artist: "nthng", key: "8A", genre: "Deep Techno" },
    ].map(analyzeTrack);
    setTracks(initial);
  }, []);

  const handleImport = (raw: any[]) => {
    const analyzed = raw.map(analyzeTrack);
    setTracks(analyzed);
  };

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">🎧 Trackscope</h1>

      <TracklistParser
        onParse={(parsed) => setTracks(parsed.map(analyzeTrack))}
      />

      <JSONUploader onImport={handleImport} />

      <button
        onClick={() => exportToCSV(tracks)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Export CSV
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        {tracks.map((track) => (
          <TrackCard key={track.title + track.artist} {...track} />
        ))}
      </div>

      <TrackTable tracks={tracks} />
    </main>
  );
}
