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
}: any) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{artist}</p>
      <p>BPM: {bpm}</p>
      <p>Key: {trackKey}</p>
      {genre && <p>Genre: {genre}</p>}
    </div>
  );
}
