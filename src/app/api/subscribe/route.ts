import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  console.log(`New subscriber: ${email}`);

  return NextResponse.json({ message: 'Subscription successful' });
}
