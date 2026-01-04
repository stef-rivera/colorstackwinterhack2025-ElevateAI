/**
 * Database types matching Supabase schema
 * These types mirror your Supabase tables
 */

export interface User {
  id: string;
  email: string | null;
  created_at: string;
}

export interface Section {
  id: string;
  title: string;
  sort_order: number;
}

export interface Lesson {
  id: string;
  section_id: string;
  title: string;
  sort_order: number;
}

/**
 * Question types supported:
 * - spot_image: show image, user chooses AI vs Real
 * - spot_audio: play audio clip, user chooses AI vs Real
 * - spot_text: show text snippet, user chooses AI vs Real
 * - prompt_mcq: multiple prompts, user chooses best prompt
 * - flashcard: tap to reveal explanation, no grading
 * - quiz_mcq: normal multiple choice knowledge question
 */
export type QuestionType =
  | 'spot_image'
  | 'spot_audio'
  | 'spot_text'
  | 'prompt_mcq'
  | 'flashcard'
  | 'quiz_mcq';

export interface Choice {
  key: string;
  label: string;
}

export interface Question {
  id: string;
  lesson_id: string;
  type: QuestionType;
  prompt: string;
  media_url: string | null;
  choices: Choice[] | null;
  correct_answer: string | null;
  explanation: string | null;
  sort_order: number;
}

export interface Attempt {
  id: string;
  user_id: string;
  question_id: string;
  selected_answer: string;
  is_correct: boolean;
  answered_at: string;
}

/**
 * Request/Response types for API endpoints
 */

export interface SubmitAnswerRequest {
  user_id: string;
  question_id: string;
  selected_answer: string;
}

export interface SubmitAnswerResponse extends Attempt {
  explanation: string | null;
}

export interface UserStats {
  total_attempts: number;
  correct_attempts: number;
  accuracy_percentage: number;
  lessons_completed: number;
  sections_progress: SectionProgress[];
}

export interface SectionProgress {
  section_id: string;
  section_title: string;
  lessons_total: number;
  lessons_completed: number;
}

