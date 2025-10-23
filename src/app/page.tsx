"use client";

import { useState } from "react";
import { enrichTrackData } from "@/lib/bpmEnricher";
import { getTrackStats } from "@/lib/trackStats";
import type { Track } from "@/lib/types";
import TrackCard from "@/components/TrackCard";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  async function handleParse() {
    setLoading(true);
    const lines = input
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let parsed: Track[] = [];

    // Artist-only Modus
    if (lines.length === 1 && !lines[0].includes("–")) {
      const res = await fetch("/api/artist", {
        method: "POST",
        body: JSON.stringify({ artist: lines[0] }),
        headers: { "Content-Type": "application/json" },
      });
      parsed = await res.json();
    } else {
      // Standard Parsing
      parsed = lines.map((line) => {
        const [artist, title] = line.split("–").map((s) => s.trim());
        return {
          artist,
          title,
          bpm: null,
          key: null,
          genre: null,
        };
      });
    }

    const enriched = await enrichTrackData(parsed);
    setTracks(enriched);
    setStats(getTrackStats(enriched));
    setLoading(false);
  }

  function handleExportCSV() {
    const header = ["Artist", "Title", "BPM", "Key", "Genre"];
    const rows = tracks.map((t) => [t.artist, t.title, t.bpm, t.key, t.genre]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${v ?? ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trackscope_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎧 Trackscope</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste tracklist or artist name..."
        className="w-full h-40 p-2 border rounded"
      />

      <div className="flex gap-4">
        <button
          onClick={handleParse}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Parsing..." : "Parse"}
        </button>

        <button
          onClick={handleExportCSV}
          disabled={tracks.length === 0}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Export CSV
        </button>
      </div>

      {tracks.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Parsed Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map((track, index) => (
              <TrackCard
                key={`${track.artist}-${track.title}-${index}`}
                track={track}
              />
            ))}
          </div>
        </section>
      )}

      {stats && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">📊 Track Stats</h2>
          <p>
            <strong>Genres:</strong>{" "}
            {Object.entries(stats.genreCount)
              .map(([g, c]) => `${g}: ${c}`)
              .join(" | ")}
          </p>
          <p>
            <strong>Keys:</strong>{" "}
            {Object.entries(stats.keyCount)
              .map(([k, c]) => `${k}: ${c}`)
              .join(" | ")}
          </p>
          <p>
            <strong>Artists:</strong>{" "}
            {Object.entries(stats.artistCount)
              .map(([a, c]) => `${a}: ${c}`)
              .join(" | ")}
          </p>
          <p>
            <strong>BPM Range:</strong> Min: {stats.bpm.min} | Max:{" "}
            {stats.bpm.max} | Avg: {stats.bpm.avg}
          </p>
        </section>
      )}
    </main>
  );
}
