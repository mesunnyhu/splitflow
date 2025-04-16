import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!, // For server-side insert
);

export async function POST(req: Request) {
  const { message } = await req.json();

  const { error } = await supabase.from('feedback').insert({ message });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
