import { NextRequest, NextResponse } from 'next/server'

// Test webhook delivery endpoint
export async function POST(req: NextRequest) {
  try {
    const { webhookId, eventType, payload } = await req.json()

    if (!webhookId || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields: webhookId, eventType' },
        { status: 400 }
      )
    }

    // Simulate webhook delivery
    const success = Math.random() > 0.05 // 95% success rate simulation
    const responseTime = Math.floor(Math.random() * 300) + 50 // 50-350ms

    const result = {
      success,
      webhookId,
      eventType,
      payload: payload || { test: true },
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
      statusCode: success ? 200 : 500,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Webhook test error:', error)
    return NextResponse.json(
      { error: 'Failed to test webhook' },
      { status: 500 }
    )
  }
}

// GET - Get webhook test history
export async function GET() {
  // Mock test history
  const testHistory = [
    { event: 'order.created', timestamp: new Date().toISOString(), status: 'success', duration: '245ms' },
    { event: 'product.stock_changed', timestamp: new Date(Date.now() - 120000).toISOString(), status: 'success', duration: '180ms' },
    { event: 'customer.created', timestamp: new Date(Date.now() - 300000).toISOString(), status: 'success', duration: '320ms' },
    { event: 'payment.failed', timestamp: new Date(Date.now() - 600000).toISOString(), status: 'failed', duration: '45ms' },
  ]

  return NextResponse.json({
    history: testHistory,
  })
}
