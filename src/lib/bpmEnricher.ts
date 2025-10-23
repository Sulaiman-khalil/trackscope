import type { Track } from "@/lib/types";
import { enrichTrackMulti } from "@/lib/multiSourceEnricher";

export async function enrichTrackData(tracks: Track[]): Promise<Track[]> {
  return await Promise.all(
    tracks.map((track) => enrichTrackMulti(track, ["audiodb", "mbz", "static"]))
  );
}
