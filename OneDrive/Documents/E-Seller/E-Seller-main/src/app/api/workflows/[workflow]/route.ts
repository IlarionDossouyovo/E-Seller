import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ workflow: string }> }
) {
  const { workflow } = await params
  const filePath = path.join(process.cwd(), 'seller-stack/automation', `${workflow}.json`)
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // Validate it's valid JSON
    JSON.parse(content)
    
    return new Response(content, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${workflow}.json"`,
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Workflow not found', details: String(error) }, { status: 404 })
  }
}