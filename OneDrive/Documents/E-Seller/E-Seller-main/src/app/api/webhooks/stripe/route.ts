import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Stripe webhook handler for payment events
export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  // In production, verify webhook signature:
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  // const event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!)

  let event
  
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('💰 Payment succeeded:', event.data.object.id)
      break
    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed:', event.data.object.id)
      break
    case 'charge.refunded':
      console.log('💸 Refund processed:', event.data.object.id)
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}