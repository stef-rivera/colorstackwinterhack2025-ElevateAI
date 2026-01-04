import { NextResponse } from 'next/server';

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
export async function POST() {
  // TODO: Parse request body
  // TODO: Fetch question to get correct_answer
  // TODO: Grade: compare selected_answer to correct_answer
  // TODO: Insert attempt into Supabase
  // TODO: Return result with is_correct and explanation
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

/**
 * GET /api/attempts
 * 
 * Get attempts for a user
 * 
 * Query: ?user_id=xxx
 * Response: Array of attempts
 */
export async function GET() {
  // TODO: Parse user_id from query params
  // TODO: Fetch attempts from Supabase where user_id matches
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

