// src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "../../../../lib/mongodb"; // 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;

    if (userId) {
      const { db } = await connectToDatabase();
      const paidUntil = new Date();
      paidUntil.setMonth(paidUntil.getMonth() + 1);

      await db.collection("users").updateOne(
        { userId },
        { $set: { paidUntil } },
        { upsert: true }
      );
    }
  }

  return NextResponse.json({ received: true });
}