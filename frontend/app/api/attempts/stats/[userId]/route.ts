import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/attempts/stats/:userId
 * 
 * Get progress stats for a user
 * 
 * Response: {
 *   total_attempts: number,
 *   correct_attempts: number,
 *   accuracy_percentage: number,
 *   lessons_completed: number,
 *   sections_progress: Array<{
 *     section_id: string,
 *     section_title: string,
 *     lessons_total: number,
 *     lessons_completed: number
 *   }>
 * }
 */
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // Fetch all attempts for the user
    const { data: attempts, error: attemptsError } = await supabase
      .from('attempts')
      .select('*, questions(lesson_id)') // ? quesitons(lesosnsid)
      .eq('user_id', userId);

    if (attemptsError) {
      return NextResponse.json(
        { error: attemptsError.message },
        { status: 500 }
      );
    }

    // Calculate basic stats
    const total_attempts = attempts?.length || 0;
    const correct_attempts = attempts?.filter((a) => a.is_correct).length || 0;
    const accuracy_percentage =
      total_attempts > 0 ? Math.round((correct_attempts / total_attempts) * 100) : 0;

    // Get all lessons with their sections
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, section_id, sections(id, title)');

    if (lessonsError) {
      return NextResponse.json(
        { error: lessonsError.message },
        { status: 500 }
      );
    }

    // Get all questions to determine lesson completion
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, lesson_id');

    if (questionsError) {
      return NextResponse.json(
        { error: questionsError.message },
        { status: 500 }
      );
    }

    // Determine which lessons are completed
    const lessonCompletionMap = new Map<string, boolean>();
    const attemptedQuestions = new Set(
      attempts?.map((a) => a.question_id) || []
    );

    lessons?.forEach((lesson) => {
      const lessonQuestions = questions?.filter((q) => q.lesson_id === lesson.id) || [];
      const allQuestionsAnswered = lessonQuestions.every((q) =>
        attemptedQuestions.has(q.id)
      );
      lessonCompletionMap.set(lesson.id, allQuestionsAnswered && lessonQuestions.length > 0);
    });

    const lessons_completed = Array.from(lessonCompletionMap.values()).filter(
      (completed) => completed
    ).length;

    // Group progress by section
    const sectionMap = new Map<string, any>();

    lessons?.forEach((lesson: any) => {
      const sectionId = lesson.section_id;
      const sectionTitle = lesson.sections?.title || 'Unknown Section';
      const isCompleted = lessonCompletionMap.get(lesson.id) || false;

      if (!sectionMap.has(sectionId)) {
        sectionMap.set(sectionId, {
          section_id: sectionId,
          section_title: sectionTitle,
          lessons_total: 0,
          lessons_completed: 0,
        });
      }

      const section = sectionMap.get(sectionId);
      section.lessons_total += 1;
      if (isCompleted) {
        section.lessons_completed += 1;
      }
    });

    const sections_progress = Array.from(sectionMap.values());

    return NextResponse.json({
      total_attempts,
      correct_attempts,
      accuracy_percentage,
      lessons_completed,
      sections_progress,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}






