"use client";

import { useState } from "react";

export default function TracklistParser({
  onParse,
}: {
  onParse: (tracks: any[]) => void;
}) {
  const [input, setInput] = useState("");

  const parseTracklist = () => {
    const lines = input.split("\n").filter((line) => line.trim());
    const tracks = lines
      .map((line) => {
        const match = line.match(/\d{1,2}:\d{2}\s+(.*)\s+–\s+(.*)/);
        if (!match) return null;
        const [, artist, title] = match;
        return { title: title.trim(), artist: artist.trim() };
      })
      .filter(Boolean);
    onParse(tracks);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste YouTube tracklist here..."
        className="w-full h-40 p-2 border rounded"
      />
      <button
        onClick={parseTracklist}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Parse Tracklist
      </button>
    </div>
  );
}
