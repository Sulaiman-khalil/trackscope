// src/components/TrackCard.tsx
import React from "react";

type TrackProps = {
  title: string;
  artist: string;
  bpm: number;
  key: string;
  genre?: string;
};

export default function TrackCard({
  title,
  artist,
  bpm,
  key,
  genre,
}: TrackProps) {
  return (
    <div className="bg-background text-foreground border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{artist}</p>
      <div className="mt-2 flex gap-4 text-sm">
        <span>BPM: {bpm}</span>
        <span>Key: {key}</span>
        {genre && <span>Genre: {genre}</span>}
      </div>
    </div>
  );
}
