export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(request: Request) {
  const body = await request.text();

  const requestHeaders = await headers();
  const signature = requestHeaders.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing Stripe signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Invalid webhook signature';

    console.error(
      `Stripe webhook signature verification failed: ${message}`
    );

    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session =
          event.data.object as Stripe.Checkout.Session;

        const customerId =
          typeof session.customer === 'string'
            ? session.customer
            : null;

        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : null;

        if (customerId && subscriptionId) {
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);

          const priceId =
            subscription.items.data[0]?.price?.id ?? null;

          await prisma.user.updateMany({
            where: {
              stripeCustomerId: customerId,
            },
            data: {
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              stripeStatus: subscription.status,
            },
          });
        }

        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription =
          event.data.object as Stripe.Subscription;

        const customerId =
          typeof subscription.customer === 'string'
            ? subscription.customer
            : null;

        if (customerId) {
          const priceId =
            subscription.items.data[0]?.price?.id ?? null;

          await prisma.user.updateMany({
            where: {
              stripeCustomerId: customerId,
            },
            data: {
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              stripeStatus: subscription.status,
            },
          });
        }

        break;
      }

      default:
        console.log(
          `Unhandled Stripe event type: ${event.type}`
        );
    }

    return NextResponse.json(
      { received: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Stripe webhook processing error:', error);

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}