// frontend/app/api/search/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "No search query provided" },
        { status: 400 }
      );
    }

    // TODO: Implement actual book search logic
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      message: "Search initiated",
      job: jobId,
      query: query,
    });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}