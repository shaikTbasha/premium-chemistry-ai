export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    if (typeof token !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Invalid token or password' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired password reset token' },
        { status: 400 }
      );
    }

    // Hash the new password before storing it.
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetExpiry: null,
      },
    });

    return NextResponse.json({
      message: 'Password reset successfully!',
    });
  } catch (error) {
    console.error('Reset Password Error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}