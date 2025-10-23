import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { artist, title } = await req.json();

    const url = `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${encodeURIComponent(
      artist
    )}&t=${encodeURIComponent(title)}`;

    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      console.warn("AudioDB returned non-JSON for", artist, title);
      return NextResponse.json({ track: [] }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    // console.error("AudioDB fetch failed:", err);
    return NextResponse.json({ track: [] }, { status: 200 });
  }
}
