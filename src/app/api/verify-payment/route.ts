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
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer']
    })

    // Check if this was a subscription checkout
    if (session.mode === 'subscription' && session.subscription) {
      // Get the subscription details
      const subscription = typeof session.subscription === 'string' 
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session.subscription

      // Check if subscription is active
      if (subscription.status === 'active') {
        const now = Math.floor(Date.now() / 1000)
        const isCurrentPeriodActive = subscription.current_period_end > now

        if (isCurrentPeriodActive) {
          return NextResponse.json({
            hasActiveSubscription: true,
            paid: true,
            subscription: {
              id: subscription.id,
              status: subscription.status,
              current_period_start: subscription.current_period_start,
              current_period_end: subscription.current_period_end,
              customer_id: subscription.customer,
              plan: {
                id: subscription.items.data[0]?.price.id,
                nickname: subscription.items.data[0]?.price.nickname,
                amount: subscription.items.data[0]?.price.unit_amount,
                currency: subscription.items.data[0]?.price.currency,
                interval: subscription.items.data[0]?.price.recurring?.interval
              }
            },
            session: {
              id: session.id,
              customer_id: session.customer,
              amount_total: session.amount_total,
              currency: session.currency,
              metadata: session.metadata
            },
            cvId: cvId
          })
        } else {
          return NextResponse.json({
            hasActiveSubscription: false,
            paid: false,
            status: 'expired',
            subscription: {
              id: subscription.id,
              status: subscription.status,
              current_period_end: subscription.current_period_end
            }
          })
        }
      } else {
        // Handle other subscription statuses
        return NextResponse.json({
          hasActiveSubscription: false,
          paid: false,
          status: subscription.status,
          subscription: {
            id: subscription.id,
            status: subscription.status,
            latest_invoice: subscription.latest_invoice
          }
        })
      }
    } 
    // Fallback: Check if it was a one-time payment (for backward compatibility)
    else if (session.payment_status === 'paid') {
      // This handles one-time payments - treat as basic verification
      return NextResponse.json({
        hasActiveSubscription: false,
        paid: true,
        session: {
          id: session.id,
          amount_total: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status,
          metadata: session.metadata
        },
        cvId: cvId,
        type: 'one_time_payment'
      })
    } else {
      return NextResponse.json({
        hasActiveSubscription: false,
        paid: false,
        status: session.payment_status
      })
    }

  } catch (error) {
    console.error('Subscription verification error:', error)
    
    // Handle specific Stripe errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to verify subscription' },
      { status: 500 }
    )
  }
}

// Alternative endpoint for checking subscription by customer ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const userId = searchParams.get('userId')

    if (!customerId) {
      return NextResponse.json(
        { error: 'Missing customerId' },
        { status: 400 }
      )
    }

    // Retrieve active subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 10
    })

    // Check if customer has any active subscriptions
    const activeSubscriptions = subscriptions.data.filter(subscription => {
      const now = Math.floor(Date.now() / 1000)
      return (
        subscription.status === 'active' &&
        subscription.current_period_end > now
      )
    })

    if (activeSubscriptions.length > 0) {
      const primarySubscription = activeSubscriptions[0]
      
      return NextResponse.json({
        hasActiveSubscription: true,
        subscription: {
          id: primarySubscription.id,
          status: primarySubscription.status,
          current_period_start: primarySubscription.current_period_start,
          current_period_end: primarySubscription.current_period_end,
          plan: {
            id: primarySubscription.items.data[0]?.price.id,
            nickname: primarySubscription.items.data[0]?.price.nickname,
            amount: primarySubscription.items.data[0]?.price.unit_amount,
            currency: primarySubscription.items.data[0]?.price.currency,
            interval: primarySubscription.items.data[0]?.price.recurring?.interval
          }
        },
        customerId: customerId,
        userId: userId
      })
    } else {
      // Check for other subscription statuses
      const allSubscriptions = await stripe.subscriptions.list({
        customer: customerId,
        limit: 10
      })

      const problematicSubs = allSubscriptions.data.filter(sub => 
        sub.status === 'past_due' || 
        sub.status === 'incomplete' || 
        sub.status === 'incomplete_expired'
      )

      return NextResponse.json({
        hasActiveSubscription: false,
        status: problematicSubs.length > 0 ? 'payment_required' : 'no_subscription',
        subscriptions: problematicSubs.map(sub => ({
          id: sub.id,
          status: sub.status,
          latest_invoice: sub.latest_invoice
        }))
      })
    }

  } catch (error) {
    console.error('Subscription check error:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to check subscription' },
      { status: 500 }
    )
  }
}