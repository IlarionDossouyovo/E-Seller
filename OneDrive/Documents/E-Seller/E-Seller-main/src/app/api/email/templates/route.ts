import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const templates = [
  { id: '1', name: 'Welcome', subject: 'Welcome to E-SELLER!', category: 'onboarding', active: true },
  { id: '2', name: 'Order Confirmation', subject: 'Your Order Confirmation', category: 'order', active: true },
  { id: '3', name: 'Shipping Update', subject: 'Shipping Update - Order #{{order_id}}', category: 'order', active: true },
  { id: '4', name: 'Payment Received', subject: 'Payment Confirmed', category: 'payment', active: true },
  { id: '5', name: 'Password Reset', subject: 'Reset your password', category: 'security', active: true },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  let filtered = [...templates]
  if (category) filtered = filtered.filter(t => t.category === category)
  return NextResponse.json({ templates: filtered })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  console.log(`📧 Sending email to ${body.to} with template ${body.templateId}`)
  return NextResponse.json({ success: true, message: `Email sent to ${body.to}` })
}