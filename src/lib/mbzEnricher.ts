import type { Track } from "@/lib/types";

export async function enrichFromMBZ(track: Track): Promise<Track> {
  const query = `https://musicbrainz.org/ws/2/recording/?query=artist:${encodeURIComponent(
    track.artist
  )}+recording:${encodeURIComponent(track.title)}&fmt=json&limit=1`;

  try {
    const res = await fetch(query);
    if (!res.ok) throw new Error("MBZ fetch failed");

    const data = await res.json();
    const recording = data.recordings?.[0];
    if (!recording) {
      //   console.warn("No MBZ match for", track.artist, track.title);
      return { ...track, bpm: null, key: null, genre: null };
    }

    // Estimate BPM from length (ms → sec → bpm)
    const lengthMs = recording.length;
    const bpm = lengthMs ? Math.round(60000 / (lengthMs / 1000)) : null;

    // Genre from release group (if available)
    const genre =
      recording["release-group"]?.["primary-type"] === "Album"
        ? recording["release-group"]?.title
        : null;

    return {
      ...track,
      bpm,
      key: null, // MBZ doesn't provide key
      genre,
    };
  } catch (err) {
    // console.error("MBZ fetch failed:", err);
    return { ...track, bpm: null, key: null, genre: null };
  }
}
