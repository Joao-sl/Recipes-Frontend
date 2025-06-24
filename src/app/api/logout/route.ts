import { closeSession } from '@/lib/auth/manage-user-session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await closeSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
