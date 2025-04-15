// /app/api/log/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log("📊 Log Received:", data);

  // Optionally save to a database or analytics tool in the future
  return NextResponse.json({ ok: true });
}
