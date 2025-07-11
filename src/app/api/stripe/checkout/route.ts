// src/app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuth } from "@clerk/nextjs/server"; // adjust import if needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription", // or "subscription" if recurring
    line_items: [
      {
        price: "price_1RgmI7D1uKWQF2UMTNJdersu", // <-- your Stripe Price ID
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    client_reference_id: userId, // Pass Clerk user ID
  });

  return NextResponse.json({ url: session.url });
}