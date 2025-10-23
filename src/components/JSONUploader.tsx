"use client";

import { useState } from "react";

type Props = {
  onImport: (tracks: any[]) => void;
};

export default function JSONUploader({ onImport }: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const raw = JSON.parse(text);

      const enriched = await Promise.all(
        raw.map(async (track: { artist: string; title: string }) => {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ artist: track.artist, title: track.title }),
          });

          const meta = res.ok
            ? await res.json()
            : { bpm: null, key: null, genre: null };

          return {
            ...track,
            ...meta,
          };
        })
      );

      onImport(enriched);
      setError(null);
    } catch (err) {
      // console.error("JSON parse error:", err);
      setError("Invalid JSON file or format.");
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept=".json" onChange={handleFile} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
