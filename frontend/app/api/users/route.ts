import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * POST /api/users
 * 
 * Create a new guest/anonymous user
 * 
 * Request body: { email?: string }
 * Response: { id, email, created_at }
 */
export async function POST(request: Request) {
  // TODO: Create user in Supabase
  // TODO: Return new user object
  try {
    const { email } = await request.json();

    const { data, error } = await supabase
      .from('users')
      .insert({ email: email || null })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 });
  }
}

/**
 * GET /api/users
 * 
 * Get user by ID (via query param)
 * 
 * Query: ?id=xxx
 * Response: { id, email, created_at }
 */
export async function GET(request: Request) {
  // TODO: Fetch user from Supabase by ID
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' }, 
        { status: 400 }
      );
    }

    let query = supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 });
  }
}






