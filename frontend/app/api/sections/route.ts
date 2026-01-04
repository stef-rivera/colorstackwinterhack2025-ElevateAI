import { NextResponse } from 'next/server';

/**
 * GET /api/sections
 * 
 * List all learning sections ordered by sort_order
 * 
 * Response: Array of { id, title, sort_order }
 */
export async function GET() {
  // TODO: Fetch sections from Supabase ordered by sort_order
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

