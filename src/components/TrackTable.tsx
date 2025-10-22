type Props = {
  tracks: {
    title: string;
    artist: string;
    bpm: number;
    trackKey: string;
    genre?: string;
  }[];
};

export default function TrackTable({ tracks }: Props) {
  return (
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
        {tracks.map((t, i) => (
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
  );
}
