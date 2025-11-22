import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/constants';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });
  res.cookies.set(COOKIE_NAME, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
  return res;
}