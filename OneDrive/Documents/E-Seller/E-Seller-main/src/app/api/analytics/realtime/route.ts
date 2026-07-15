import { NextRequest, NextResponse } from 'next/server'

const analytics = {
  visitors: { today: 1247, yesterday: 1089, change: '+14.5%' },
  pageViews: { today: 4562, yesterday: 3890, change: '+17.3%' },
  bounceRate: { value: '32%', change: '-2.1%' },
  avgSession: { value: '4:32', change: '+8.2%' },
  topPages: [
    { path: '/store', views: 1234 }, { path: '/store/product/1', views: 856 },
    { path: '/store/cart', views: 432 }, { path: '/dashboard', views: 321 },
  ],
  topSources: [
    { source: 'Google', visits: 456, percent: 36 }, { source: 'Direct', visits: 312, percent: 25 },
    { source: 'Facebook', visits: 234, percent: 19 }, { source: 'Twitter', visits: 145, percent: 12 },
  ],
  devices: [
    { type: 'Mobile', percent: 58 }, { type: 'Desktop', percent: 35 }, { type: 'Tablet', percent: 7 },
  ],
  countries: [
    { country: 'United States', visitors: 456 }, { country: 'France', visitors: 234 },
    { country: 'Germany', visitors: 189 }, { country: 'United Kingdom', visitors: 156 },
  ],
  hourlyData: [
    { hour: '00', visitors: 45 }, { hour: '06', visitors: 56 }, { hour: '12', visitors: 234 },
    { hour: '18', visitors: 145 }, { hour: '22', visitors: 89 },
  ]
}

export async function GET() {
  return NextResponse.json({ analytics })
}