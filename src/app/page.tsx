import TrackCard from "@/components/TrackCard";
import { analyzeTrack } from "@/lib/trackAnalyzer";

const rawTracks = [
  { title: "Hypnotic Pulse", artist: "Rødhåd" },
  { title: "Parallel Shift", artist: "Antigone", bpm: 132 },
  { title: "Eclipse", artist: "nthng", key: "8A", genre: "Deep Techno" },
];

export default function Page() {
  const tracks = rawTracks.map(analyzeTrack);

  return (
    <main className="p-8 grid gap-4">
      {tracks.map((track, i) => {
        const { trackKey, ...rest } = track;
        return <TrackCard key={track.title} trackKey={trackKey} {...rest} />;
      })}
    </main>
  );
}
