import { NextResponse } from 'next/server';

/**
 * POST /api/users
 * 
 * Create a new guest/anonymous user
 * 
 * Request body: { email?: string }
 * Response: { id, email, created_at }
 */
export async function POST() {
  // TODO: Create user in Supabase
  // TODO: Return new user object
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

/**
 * GET /api/users
 * 
 * Get user by ID (via query param)
 * 
 * Query: ?id=xxx
 * Response: { id, email, created_at }
 */
export async function GET() {
  // TODO: Fetch user from Supabase by ID
  
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 });
}

