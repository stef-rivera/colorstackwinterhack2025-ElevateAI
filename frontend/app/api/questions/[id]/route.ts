import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * GET /api/questions/:id
 * 
 * Get a single question by ID
 * 
 * Response: {
 *   id, lesson_id, type, prompt, media_url,
 *   choices, correct_answer, explanation, sort_order
 * }
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Fetch question from Supabase by params.id
  try {
    const questionId = params.id;

    const query = supabase
      .from('questions')
      .select('*')
      .eq('id', questionId)
      .single();

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 });
  }
  }






