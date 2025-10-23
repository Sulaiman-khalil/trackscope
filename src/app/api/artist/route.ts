import { NextResponse } from "next/server";
import { fetchArtistTracks } from "@/lib/fallbackFetcher";

export async function POST(req: Request) {
  const { artist } = await req.json();
  const tracks = await fetchArtistTracks(artist);
  return NextResponse.json(tracks);
}
