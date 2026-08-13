export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    // Don't reveal whether the email exists.
    if (!user) {
      return NextResponse.json({
        message:
          'If the email exists, a reset link has been generated.',
      });
    }

    const token = crypto.randomBytes(32).toString('hex');

    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken: token,
        resetExpiry: expiry,
      },
    });

    console.log(
      `\n🔑 PASSWORD RESET LINK: http://localhost:3000/reset-password?token=${token}\n`
    );

    return NextResponse.json({
      message:
        'Password reset link generated! Check your server terminal console for the link.',
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}