import { analyzeTrack } from "@/lib/trackAnalyzer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const result = analyzeTrack(body);
  return NextResponse.json(result);
}
