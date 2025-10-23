import TrackCard from "./TrackCard";

export default function TracksMap({ tracks }: { tracks: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tracks.map((track, index) => {
        const key = `${track.artist}-${track.title}-${index}`;
        return <TrackCard key={key} track={track} />;
      })}
    </div>
  );
}
