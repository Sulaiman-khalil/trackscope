"use client";

import { useState } from "react";
import { enrichTrackData } from "@/lib/bpmEnricher";
import type { Track } from "@/lib/types";

export default function TracklistParser({
  onParse,
}: {
  onParse: (tracks: Track[]) => void;
}) {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleParse() {
    setLoading(true);
    const lines = input
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let tracks: Track[] = [];

    // Artist-only Modus
    if (lines.length === 1 && !lines[0].includes("–")) {
      const res = await fetch("/api/artist", {
        method: "POST",
        body: JSON.stringify({ artist: lines[0] }),
        headers: { "Content-Type": "application/json" },
      });

      tracks = await res.json();
    } else {
      // Standard Parsing
      tracks = lines.map((line) => {
        const [artist, title] = line.split("–").map((s) => s.trim());
        return { artist, title, bpm: null, key: null, genre: null };
      });
    }

    // BPM/Key/Genre Enrichment
    const enriched = await enrichTrackData(tracks);
    setParsed(enriched);
    onParse(enriched);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste tracklist or artist name..."
        className="w-full h-40 p-2 border rounded"
      />
      <button
        onClick={handleParse}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Parsing..." : "Parse"}
      </button>

      {parsed.length > 0 && (
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(parsed, null, 2)}
        </pre>
      )}
    </div>
  );
}
