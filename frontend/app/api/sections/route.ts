import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * GET /api/sections
 * 
 * List all learning sections ordered by sort_order
 * 
 * Response: Array of { id, title, sort_order }
 */
export async function GET(request: Request) {
  // TODO: Fetch sections from Supabase ordered by sort_order
  try {
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('sort_order');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 });
  }
}






