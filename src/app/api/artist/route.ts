import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  const { artist } = await req.json();
  const query = encodeURIComponent(artist);
  const url = `https://www.beatport.com/search?q=${query}`;

  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const tracks: any[] = [];

    $(".bucket-item.ec-item.track").each((_, el) => {
      const title = $(el).find(".title").text().trim();
      const bpm = parseInt($(el).find(".bpm").text().trim());
      const key = $(el).find(".key").text().trim();
      const genre = $(el).find(".genre").text().trim();

      if (title) {
        tracks.push({
          artist,
          title,
          bpm: isNaN(bpm) ? null : bpm,
          key: key || null,
          genre: genre || null,
        });
      }
    });

    return NextResponse.json(tracks);
  } catch (err) {
    console.error("Artist fetch error:", err);
    return NextResponse.json([]);
  }
}
