import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/../../server/db';
import { leads } from '@shared/schema';
import { z } from 'zod';
import { verifyRecaptchaToken } from '@/lib/recaptcha';
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from '@/lib/constants';
import { rateLimit } from '@/lib/rate-limit';

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  recaptchaToken: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const rl = rateLimit(ip, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX);
    if (!rl.allowed) {
      return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const recaptcha = await verifyRecaptchaToken(parsed.data.recaptchaToken);
    if (!recaptcha.success) {
      return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    await db.insert(leads).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      message: parsed.data.message ?? null,
    });

    return NextResponse.json({ message: 'Lead created' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/leads error', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}