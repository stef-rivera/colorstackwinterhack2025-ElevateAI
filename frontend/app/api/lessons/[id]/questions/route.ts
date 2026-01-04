import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/lessons/:id/questions
 * 
 * Get all questions for a specific lesson
 * Questions will be randomized on the frontend
 * 
 * Response: Array of {
 *   id, lesson_id, type, prompt, media_url,
 *   choices, correct_answer, explanation
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
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('lesson_id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return questions (frontend will handle randomization)
    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}






