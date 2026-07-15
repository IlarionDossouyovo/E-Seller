import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Using any for simplicity
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const settings: any = {
  general: { storeName: 'E-SELLER Store', email: 'contact@e-seller.com', timezone: 'UTC', language: 'English' },
  store: { maintenanceMode: false, guestCheckout: true, currencySelector: true },
  payments: { currency: 'USD', taxRate: 20, taxIncluded: true },
  notifications: { newOrder: true, lowStock: true, customerRegistration: true, paymentReceived: true },
  security: { twoFactorAuth: true, ipWhitelist: false, sessionTimeout: true },
  appearance: { theme: 'default-dark' },
  email: { smtpHost: '', smtpPort: '587', smtpUser: '', smtpPass: '' },
  api: { productionKey: 'sk_live_xxxxx', developmentKey: 'sk_test_xxxxx' }
}

export async function GET() {
  return NextResponse.json({ settings })
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { section, data } = body as { section: string; data: Record<string, unknown> }

  if (section && settings[section]) {
    settings[section] = { ...settings[section], ...data }
  }

  return NextResponse.json({ success: true, settings })
}