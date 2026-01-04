import { NextResponse } from 'next/server';

/**
 * GET /api/lessons/:id/questions
 * 
 * Get all questions for a specific lesson, ordered by sort_order
 * 
 * Response: Array of {
 *   id, lesson_id, type, prompt, media_url,
 *   choices, correct_answer, explanation, sort_order
 * }
 * 
 * Question types:
 * - spot_image: show image, user chooses AI vs Real
 * - spot_audio: play audio clip, user chooses AI vs Real
 * - spot_text: show text snippet, user chooses AI vs Real
 * - prompt_mcq: multiple prompts, user chooses best prompt
 * - flashcard: tap to reveal explanation, no grading
 * - quiz_mcq: normal multiple choice knowledge question
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Fetch questions from Supabase where lesson_id = params.id
  // TODO: Order by sort_order
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

