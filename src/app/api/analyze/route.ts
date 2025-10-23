import { NextResponse } from "next/server";
import cheerio from "cheerio";

export async function POST(req: Request) {
  const { artist, title } = await req.json();
  const query = encodeURIComponent(`${artist} ${title}`);
  const url = `https://www.beatport.com/search?q=${query}`;

  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const first = $(".bucket-item.ec-item.track").first();
    const bpm = parseInt(first.find(".bpm").text().trim());
    const key = first.find(".key").text().trim();
    const genre = first.find(".genre").text().trim();

    return NextResponse.json({
      bpm: isNaN(bpm) ? null : bpm,
      key: key || null,
      genre: genre || null,
    });
  } catch (err) {
    console.error("Beatport fetch error:", err);
    return NextResponse.json({ bpm: null, key: null, genre: null });
  }
}
