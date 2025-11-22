import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/../../server/db';
import { users } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, signJwt } from '@/lib/auth';
import { COOKIE_NAME, JWT_EXPIRES_IN_SECONDS } from '@/lib/constants';

const LoginSchema = z.object({ username: z.string().min(1), password: z.string().min(1) });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const username = parsed.data.username.trim();
    const user = await db.query.users.findFirst({ where: eq(users.username, username) });
    if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

    if (!verifyPassword(parsed.data.password, user.password)) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });

    const token = signJwt({ sub: user.id, username: user.username }, secret, JWT_EXPIRES_IN_SECONDS);

    const res = NextResponse.json({ user: { id: user.id, username: user.username, email: user.email } });
    res.cookies.set(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: JWT_EXPIRES_IN_SECONDS });
    return res;
  } catch (err) {
    console.error('POST /api/login error', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}