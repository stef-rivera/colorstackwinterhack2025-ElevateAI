import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/lessons
 * 
 * List lessons, optionally filtered by section_id
 * 
 * Query: ?section_id=xxx (optional)
 * Response: Array of { id, section_id, title, sort_order }
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('section_id');

    let query = supabase
      .from('lessons')
      .select('*')
      .order('sort_order');

    // Filter by section_id if provided
    if (sectionId) {
      query = query.eq('section_id', sectionId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}






