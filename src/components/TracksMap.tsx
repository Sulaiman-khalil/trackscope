import TrackCard from "./TrackCard";

export default function TracksMap({ tracks }: { tracks: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tracks.map((track, index) => (
        <TrackCard
          key={`${track.artist}-${track.title}-${index}`}
          artist={track.artist}
          title={track.title}
          bpm={track.bpm}
          keySignature={track.key}
          genre={track.genre}
        />
      ))}
    </div>
  );
}
