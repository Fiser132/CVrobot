import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(request: Request) {
  try {
    const { sessionId, cvId } = await request.json()

    if (!sessionId || !cvId) {
      return NextResponse.json(
        { error: 'Missing sessionId or cvId' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Check if payment was successful
    if (session.payment_status === 'paid') {
      // You can also store this in your database
      // await markCvAsPaid(cvId, sessionId)
      
      return NextResponse.json({
        paid: true,
        sessionId: session.id,
        amount: session.amount_total,
        currency: session.currency
      })
    } else {
      return NextResponse.json({
        paid: false,
        status: session.payment_status
      })
    }

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}