import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // For security, return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json({ message: 'If the email exists, a reset link has been generated.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: { resetToken: token, resetExpiry: expiry },
    });

    // Since we aren't using an SMTP server yet, log the link to your terminal console for testing
    console.log(`\n🔑 PASSWORD RESET LINK: http://localhost:3000/reset-password?token=${token}\n`);

    return NextResponse.json({
      message: 'Password reset link generated! Check your server terminal console for the link.',
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}