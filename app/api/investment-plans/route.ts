import { NextResponse } from 'next/server';
import { db } from '@/../../server/db';
import { investmentPlans } from '@/../../shared/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const plans = await db.select().from(investmentPlans).where(eq(investmentPlans.isActive, true));
    return NextResponse.json(plans);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to fetch investment plans' }, { status: 500 });
  }
}