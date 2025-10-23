import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { artist, title } = await req.json();

  const url = `https://theaudiodb.com/api/v1/json/1/searchtrack.php?s=${encodeURIComponent(
    artist
  )}&t=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid response: not JSON");
    }
    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("AudioDB fetch failed:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
