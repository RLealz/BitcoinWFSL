import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import { COOKIE_NAME } from '@/lib/constants';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });

  const payload = verifyJwt(token, secret);
  if (!payload || typeof payload.sub !== 'number') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ id: payload.sub, username: payload.username });
}