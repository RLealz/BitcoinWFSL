import { NextRequest, NextResponse } from 'next/server';
import { insertUserSchema, users } from '@shared/schema';
import { db } from '@/../../server/db';
import { eq } from 'drizzle-orm';
import { hashPassword, signJwt } from '@/lib/auth';
import { COOKIE_NAME, JWT_EXPIRES_IN_SECONDS } from '@/lib/constants';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = insertUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { username, password, email } = parsed.data;

    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }
    
    const existingEmail = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = hashPassword(password);
    const [newUser] = await db
      .insert(users)
      .values({
        ...parsed.data,
        password: hashedPassword,
      })
      .returning();

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });
    }

    const token = signJwt(
      { sub: newUser.id, username: newUser.username },
      secret,
      JWT_EXPIRES_IN_SECONDS
    );

    const res = NextResponse.json({
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
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