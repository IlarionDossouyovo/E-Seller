import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for webhooks (in production, use a database)
let webhooks: Webhook[] = [
  {
    id: '1',
    name: 'Notifications Commandes',
    url: 'https://api.example.com/webhooks/orders',
    events: ['order.created', 'order.updated', 'order.completed'],
    status: 'active',
    secret: 'whsec_example_secret',
    createdAt: new Date().toISOString(),
    lastTriggered: new Date().toISOString(),
    successRate: 99.5,
    totalRequests: 3450,
  },
  {
    id: '2',
    name: 'Synchronisation Inventaire',
    url: 'https://api.example.com/webhooks/inventory',
    events: ['product.stock_changed'],
    status: 'active',
    secret: 'whsec_example_secret',
    createdAt: new Date().toISOString(),
    lastTriggered: new Date(Date.now() - 900000).toISOString(),
    successRate: 98.2,
    totalRequests: 2100,
  },
  {
    id: '3',
    name: 'CRM Clients',
    url: 'https://api.example.com/webhooks/customers',
    events: ['customer.created', 'customer.updated'],
    status: 'active',
    secret: 'whsec_example_secret',
    createdAt: new Date().toISOString(),
    lastTriggered: new Date(Date.now() - 3600000).toISOString(),
    successRate: 100,
    totalRequests: 1200,
  },
  {
    id: '4',
    name: 'Alertes Paiement',
    url: 'https://api.example.com/webhooks/payments',
    events: ['payment.success', 'payment.failed'],
    status: 'inactive',
    secret: 'whsec_example_secret',
    createdAt: new Date().toISOString(),
    lastTriggered: new Date(Date.now() - 172800000).toISOString(),
    successRate: 97.8,
    totalRequests: 5700,
  },
]

interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  status: 'active' | 'inactive'
  secret: string
  createdAt: string
  lastTriggered: string
  successRate: number
  totalRequests: number
}

// Available events that can be subscribed to
const availableEvents = [
  { category: 'Commandes', events: ['order.created', 'order.updated', 'order.completed', 'order.cancelled'] },
  { category: 'Produits', events: ['product.created', 'product.updated', 'product.deleted', 'product.stock_changed'] },
  { category: 'Clients', events: ['customer.created', 'customer.updated', 'customer.deleted'] },
  { category: 'Paiements', events: ['payment.success', 'payment.failed', 'payment.refunded'] },
]

// GET - List all webhooks
export async function GET() {
  const stats = {
    activeWebhooks: webhooks.filter(w => w.status === 'active').length,
    totalRequests: webhooks.reduce((sum, w) => sum + w.totalRequests, 0),
    averageSuccessRate: webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length,
    averageResponseTime: 245, // ms
  }

  return NextResponse.json({
    webhooks,
    stats,
    availableEvents,
  })
}

// POST - Create a new webhook
export async function POST(req: NextRequest) {
  try {
    const { name, url, events } = await req.json()

    if (!name || !url || !events || events.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: name, url, events' },
        { status: 400 }
      )
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    const newWebhook: Webhook = {
      id: String(Date.now()),
      name,
      url,
      events,
      status: 'active',
      secret: `whsec_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
      lastTriggered: new Date().toISOString(),
      successRate: 100,
      totalRequests: 0,
    }

    webhooks.push(newWebhook)

    return NextResponse.json({
      success: true,
      webhook: newWebhook,
    })
  } catch (error) {
    console.error('Webhook creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create webhook' },
      { status: 500 }
    )
  }
}

// PUT - Update a webhook
export async function PUT(req: NextRequest) {
  try {
    const { id, name, url, events, status } = await req.json()

    const webhookIndex = webhooks.findIndex(w => w.id === id)
    if (webhookIndex === -1) {
      return NextResponse.json(
        { error: 'Webhook not found' },
        { status: 404 }
      )
    }

    if (name) webhooks[webhookIndex].name = name
    if (url) {
      try {
        new URL(url)
        webhooks[webhookIndex].url = url
      } catch {
        return NextResponse.json(
          { error: 'Invalid URL format' },
          { status: 400 }
        )
      }
    }
    if (events) webhooks[webhookIndex].events = events
    if (status) webhooks[webhookIndex].status = status

    return NextResponse.json({
      success: true,
      webhook: webhooks[webhookIndex],
    })
  } catch (error) {
    console.error('Webhook update error:', error)
    return NextResponse.json(
      { error: 'Failed to update webhook' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a webhook
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing webhook ID' },
        { status: 400 }
      )
    }

    const webhookIndex = webhooks.findIndex(w => w.id === id)
    if (webhookIndex === -1) {
      return NextResponse.json(
        { error: 'Webhook not found' },
        { status: 404 }
      )
    }

    webhooks.splice(webhookIndex, 1)

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Webhook deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete webhook' },
      { status: 500 }
    )
  }
}
