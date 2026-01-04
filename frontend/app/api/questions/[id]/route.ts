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
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}






