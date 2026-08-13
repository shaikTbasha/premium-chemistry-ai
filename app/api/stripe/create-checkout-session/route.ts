export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: 'No email address found for user' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find the local user using Clerk ID.
    let dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    // If the user doesn't exist locally, create the record.
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          email: normalizedEmail,
          name:
            user.firstName || user.lastName
              ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
              : null,
        },
      });
    }

    let customerId = dbUser.stripeCustomerId;

    // Create Stripe customer if one doesn't exist.
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: normalizedEmail,
        metadata: {
          userId,
          dbUserId: dbUser.id,
        },
      });

      customerId = customer.id;

      await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          stripeCustomerId: customerId,
        },
      });
    }

    const priceId = process.env.STRIPE_PRO_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: 'STRIPE_PRO_PRICE_ID is not configured' },
        { status: 500 }
      );
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',

      success_url:
        `${appUrl}/dashboard?success=true`,

      cancel_url:
        `${appUrl}/dashboard?canceled=true`,

      metadata: {
        userId,
        dbUserId: dbUser.id,
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}