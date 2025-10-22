type Props = {
  title: string;
  artist: string;
  bpm: number;
  trackKey: string;
  genre?: string;
};

export default function TrackCard({
  title,
  artist,
  bpm,
  trackKey,
  genre,
}: Props) {
  return (
    <div className="bg-background text-foreground border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{artist}</p>
      <div className="mt-2 flex gap-4 text-sm">
        <span>BPM: {bpm}</span>
        <span>Key: {trackKey}</span>
        {genre && <span>Genre: {genre}</span>}
      </div>
    </div>
  );
}
