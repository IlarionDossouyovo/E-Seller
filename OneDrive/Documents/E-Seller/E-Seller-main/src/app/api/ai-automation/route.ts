'use strict'

import { NextRequest, NextResponse } from 'next/server'
import { automations, moduleConnections } from '@/lib/ai-automations'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// Execute a single AI module
async function executeModule(moduleName: string, input: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/api/ai/${moduleName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: input, message: input })
    })
    
    if (!response.ok) {
      return { error: `Module ${moduleName} failed` }
    }
    
    return await response.json()
  } catch (error) {
    return { error: String(error) }
  }
}

// Run automation chain
async function runAutomation(automationId: string, initialInput: string): Promise<any> {
  const automation = automations.find(a => a.id === automationId)
  if (!automation) {
    return { error: 'Automation not found' }
  }
  
  let context: any = { originalInput: initialInput }
  let results: any[] = []
  
  for (const step of automation.steps) {
    if (!step.enabled) continue
    
    // Replace variables in input
    let input = step.input
    for (const [key, value] of Object.entries(context)) {
      input = input.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), JSON.stringify(value))
    }
    
    const result = await executeModule(step.module, input)
    context[step.output] = result
    results.push({ module: step.module, result })
  }
  
  return { automation: automation.name, context, results }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, automationId, moduleName, input, modules } = body
    
    // List available automations
    if (action === 'list') {
      return NextResponse.json({
        success: true,
        automations: automations.map(a => ({
          id: a.id,
          name: a.name,
          description: a.description,
          steps: a.steps.map(s => s.module),
          trigger: a.trigger,
          enabled: a.enabled
        })),
        connections: moduleConnections
      })
    }
    
    // Run a specific automation
    if (action === 'run' && automationId) {
      const result = await runAutomation(automationId, input || '')
      return NextResponse.json({ success: true, ...result })
    }
    
    // Run a single module
    if (action === 'single' && moduleName) {
      const result = await executeModule(moduleName, input || '')
      return NextResponse.json({ success: true, module: moduleName, result })
    }
    
    // Chain multiple modules
    if (action === 'chain' && modules && Array.isArray(modules)) {
      let context: any = { input }
      
      for (const modName of modules) {
        const result = await executeModule(modName, context.input || input)
        context[modName] = result
        context.input = result?.analysis?.name || result?.brand?.name || result?.response || result
      }
      
      return NextResponse.json({ success: true, context })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action. Use: list, run, single, or chain',
      examples: {
        list: { action: 'list' },
        run: { action: 'run', automationId: 'product-research', input: 'wireless earbuds' },
        single: { action: 'single', moduleName: 'product-intelligence', input: 'phone case' },
        chain: { action: 'chain', input: 'smart watch', modules: ['product-intelligence', 'supplier-engine'] }
      }
    }, { status: 400 })
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'AI Automation API',
    version: '1.0.0',
    description: 'Chain AI modules for automated workflows',
    actions: ['list', 'run', 'single', 'chain'],
    automations: automations.map(a => a.id),
    modules: Object.keys(moduleConnections)
  })
}