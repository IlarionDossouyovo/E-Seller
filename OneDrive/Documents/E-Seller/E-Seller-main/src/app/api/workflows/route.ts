import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const workflowsDir = path.join(process.cwd(), 'seller-stack/automation')
  
  try {
    const files = fs.readdirSync(workflowsDir)
    const workflows = files
      .filter(f => f.endsWith('.json'))
      .map(f => ({
        name: f.replace('.json', ''),
        url: `/api/workflows/${f.replace('.json', '')}`
      }))
    
    return NextResponse.json({ workflows })
  } catch {
    return NextResponse.json({ error: 'No workflows found' }, { status: 404 })
  }
}