import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(request: Request) {
  try {
    console.log('Stripe API called');
    
    // Check if Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not found');
      return NextResponse.json(
        { error: 'Stripe configuration missing' },
        { status: 500 }
      );
    }

    // Check if base URL exists
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error('NEXT_PUBLIC_BASE_URL not found');
      return NextResponse.json(
        { error: 'Base URL configuration missing' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);
    
    const { locale, cvId } = body;

    if (!locale || !cvId) {
      console.error('Missing required parameters:', { locale, cvId });
      return NextResponse.json(
        { error: 'Missing required parameters: locale and cvId' },
        { status: 400 }
      );
    }

    console.log('Creating Stripe session...');
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Stažení životopisu',
            },
            unit_amount: 1000, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/stahni/${cvId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/platba?canceled=1&cvId=${cvId}`,
    });

    console.log('Session created successfully:', session.id);

    return NextResponse.json({ id: session.id });
    
  } catch (error) {
    console.error('Stripe API error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}