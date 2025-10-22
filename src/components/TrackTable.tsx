import { useState } from "react";

type Track = {
  title: string;
  artist: string;
  bpm: number;
  trackKey: string;
  genre?: string;
};

type Props = {
  tracks: Track[];
};

export default function TrackTable({ tracks }: Props) {
  const [filter, setFilter] = useState("");

  const filtered = tracks.filter((t) =>
    t.genre?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Filter by genre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-muted text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Artist</th>
            <th className="p-2">BPM</th>
            <th className="p-2">Key</th>
            <th className="p-2">Genre</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{t.title}</td>
              <td className="p-2">{t.artist}</td>
              <td className="p-2">{t.bpm}</td>
              <td className="p-2">{t.trackKey}</td>
              <td className="p-2">{t.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
