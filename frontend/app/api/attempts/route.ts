import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/attempts
 * 
 * Submit an answer for a question
 * This endpoint grades the answer and saves the attempt
 * 
 * Request body: {
 *   user_id: string,
 *   question_id: string,
 *   selected_answer: string
 * }
 * 
 * Response: {
 *   id, user_id, question_id, selected_answer,
 *   is_correct, answered_at, explanation
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, question_id, selected_answer } = body;

    // Validate required fields
    if (!user_id || !question_id || !selected_answer) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id, question_id, selected_answer' },
        { status: 400 }
      );
    }

    // Fetch the question to get correct_answer and explanation
    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('correct_answer, explanation, type')
      .eq('id', question_id)
      .single();

    if (questionError || !question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // Grade the answer (compare selected_answer to correct_answer)
    const is_correct = selected_answer === question.correct_answer;

    // Insert attempt into database
    // Rename data -> attempt and error -> insertError from supabse result 
    const { data: attempt, error: insertError } = await supabase
      .from('attempts')
      .insert({
        user_id,
        question_id,
        selected_answer,
        is_correct,
        answered_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    // Return result with explanation
    return NextResponse.json({
      ...attempt,
      explanation: question.explanation,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit attempt' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/attempts
 * 
 * Get attempts for a user
 * 
 * Query: ?user_id=xxx
 * Response: Array of attempts
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user_id query parameter' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('attempts')
      .select('*')
      .eq('user_id', userId)
      .order('answered_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch attempts' },
      { status: 500 }
    );
  }
}






