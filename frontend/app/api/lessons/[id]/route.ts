import { NextResponse } from 'next/server';

/**
 * GET /api/lessons/:id
 * 
 * Get a single lesson by ID
 * 
 * Response: { id, section_id, title, sort_order }
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Fetch lesson from Supabase by params.id
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

