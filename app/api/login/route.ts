import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { signJwt } from '@/lib/auth';
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

    // Mock login - accept demo credentials or any non-empty credentials
    if (!username || !parsed.data.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });

    // Create mock user
    const mockUser = {
      id: 1,
      username: username,
      email: `${username}@demo.com`
    };

    const token = signJwt({ sub: mockUser.id, username: mockUser.username }, secret, JWT_EXPIRES_IN_SECONDS);

    const res = NextResponse.json({ user: mockUser });
    res.cookies.set(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: JWT_EXPIRES_IN_SECONDS });
    return res;
  } catch (err) {
    console.error('POST /api/login error', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}