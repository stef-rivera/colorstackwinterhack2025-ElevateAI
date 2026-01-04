import { NextResponse } from 'next/server';

/**
 * GET /api/lessons
 * 
 * List lessons, optionally filtered by section_id
 * 
 * Query: ?section_id=xxx (optional)
 * Response: Array of { id, section_id, title, sort_order }
 */
export async function GET() {
  // TODO: Parse section_id from query params
  // TODO: Fetch lessons from Supabase (filter by section_id if provided)
  // TODO: Order by sort_order
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

