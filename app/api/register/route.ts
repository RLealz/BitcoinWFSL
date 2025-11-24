```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { signJwt } from '@/lib/auth';
import { COOKIE_NAME, JWT_EXPIRES_IN_SECONDS } from '@/lib/constants';

const RegisterSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { username, email } = parsed.data;

    // Mock registration - just log and return success
    console.log('New user registration (mock):', {
      username,
      email,
      timestamp: new Date().toISOString(),
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });
    }

    // Create mock user
    const mockUser = {
      id: Math.floor(Math.random() * 10000),
      username,
      email,
    };

    const token = signJwt(
      { sub: mockUser.id, username: mockUser.username },
      secret,
      JWT_EXPIRES_IN_SECONDS
    );

    const res = NextResponse.json({
      user: mockUser,
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: JWT_EXPIRES_IN_SECONDS,
    });

    return res;
  } catch (err) {
    console.error('POST /api/register error', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
```