import { NextRequest, NextResponse } from 'next/server'

function generateMockProducts(query: string) {
  return JSON.stringify([
    { name: "Test Product 1", score: 95 },
    { name: "Test Product 2", score: 88 }
  ])
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: generateMockProducts("test"),
    provider: "test"
  })
}
