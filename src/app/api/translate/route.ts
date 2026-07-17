import { NextRequest, NextResponse } from 'next/server'

// Ollama Configuration for translations
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2'

// Language names mapping
const languageNames: Record<string, string> = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  zh: 'Chinese',
  ja: 'Japanese',
}

// Translate text using Ollama
async function translateWithOllama(text: string, targetLang: string): Promise<string> {
  const targetName = languageNames[targetLang] || targetLang
  
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the following text to ${targetName}. Only return the translation, nothing else.`
          },
          { role: 'user', content: text }
        ],
        stream: false
      })
    })
    
    if (!response.ok) {
      throw new Error('Ollama translation failed')
    }
    
    const data = await response.json() as { message?: { content?: string } }
    return data.message?.content || ''
  } catch (error) {
    console.error('Translation error:', error)
    return ''
  }
}

// Batch translate multiple texts
async function batchTranslate(texts: string[], targetLang: string): Promise<string[]> {
  const translations = await Promise.all(
    texts.map(text => translateWithOllama(text, targetLang))
  )
  return translations
}

export async function POST(req: NextRequest) {
  try {
    const { texts, targetLang, sourceLang = 'en' } = await req.json() as {
      texts: string[]
      targetLang: string
      sourceLang?: string
    }
    
    if (!texts || !targetLang) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: texts, targetLang' },
        { status: 400 }
      )
    }
    
    // Translate each text
    const translations = await batchTranslate(texts, targetLang)
    
    return NextResponse.json({
      success: true,
      translations,
      targetLang,
      sourceLang,
      count: translations.length,
      provider: 'ollama',
      model: OLLAMA_MODEL
    })
    
  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { success: false, error: 'Translation failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'E-Seller Translation API',
    available: true,
    supportedLanguages: Object.keys(languageNames),
    languages: languageNames,
    provider: 'ollama',
    model: OLLAMA_MODEL,
    usage: 'POST with { texts: ["text1", "text2"], targetLang: "fr" }'
  })
}
