export default function TrackCard({
  artist,
  title,
  bpm,
  keySignature,
  genre,
}: {
  artist: string;
  title: string;
  bpm: number | null;
  keySignature: string | null;
  genre: string | null;
}) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{artist}</p>
      <div className="mt-2 text-sm space-y-1">
        <p>
          <strong>BPM:</strong> {bpm ?? "–"}
        </p>
        <p>
          <strong>Key:</strong> {keySignature ?? "–"}
        </p>
        <p>
          <strong>Genre:</strong> {genre ?? "–"}
        </p>
      </div>
    </div>
  );
}
