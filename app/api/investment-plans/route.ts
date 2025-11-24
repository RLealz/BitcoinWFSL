import { NextResponse } from 'next/server';
import { sampleInvestmentPlans } from '../../data/sample-investment-plans';

export async function GET() {
  try {
    // Return sample investment plans (filter only active ones)
    const activePlans = sampleInvestmentPlans.filter((plan: any) => plan.isActive);
    return NextResponse.json(activePlans);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to fetch investment plans' }, { status: 500 });
  }
}