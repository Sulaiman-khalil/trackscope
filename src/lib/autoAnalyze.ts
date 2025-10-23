"use server";
import { fetchBeatportData } from "./beatportParser";

export async function autoAnalyze(track: { artist: string; title: string }) {
  const metadata = await fetchBeatportData(track.artist, track.title);

  return {
    ...track,
    bpm: metadata?.bpm ?? null,
    key: metadata?.key ?? null,
    genre: metadata?.genre ?? null,
  };
}
