import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Mock reports data
const reports = [
  { id: '1', name: 'Monthly Sales Report', type: 'sales', period: 'March 2024', generatedAt: '2024-04-01', downloadUrl: '/reports/sales-march.pdf' },
  { id: '2', name: 'Inventory Status', type: 'inventory', period: 'April 2024', generatedAt: '2024-04-10', downloadUrl: '/reports/inventory-apr.pdf' },
  { id: '3', name: 'Customer Analytics', type: 'customers', period: 'Q1 2024', generatedAt: '2024-04-05', downloadUrl: '/reports/customers-q1.pdf' },
  { id: '4', name: 'Tax Summary', type: 'tax', period: 'Q1 2024', generatedAt: '2024-04-15', downloadUrl: '/reports/tax-q1.pdf' },
  { id: '5', name: 'Profit & Loss', type: 'financial', period: 'March 2024', generatedAt: '2024-04-01', downloadUrl: '/reports/pnl-march.pdf' },
]

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  let filtered = [...reports]
  if (type) filtered = filtered.filter(r => r.type === type)

  return NextResponse.json({ reports: filtered })
}

// POST - Generate new report
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { name, type, period } = body

  const newReport = {
    id: String(reports.length + 1),
    name,
    type,
    period,
    generatedAt: new Date().toISOString(),
    downloadUrl: `/reports/${type}-${Date.now()}.pdf`
  }

  reports.push(newReport)

  return NextResponse.json({ report: newReport }, { status: 201 })
}