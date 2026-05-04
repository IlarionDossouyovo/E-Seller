'use strict'

import { NextRequest, NextResponse } from 'next/server'

// Voice Audit API - Audio transcription and analysis
// Uses OpenAI Whisper for transcription

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File | null
    
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'API key not configured',
        message: 'Please add OPENAI_API_KEY to environment variables'
      }, { status: 500 })
    }

    if (!audioFile) {
      return NextResponse.json({
        success: false,
        error: 'No audio file provided',
        message: 'Please upload an audio file'
      }, { status: 400 })
    }

    // Convert File to Buffer
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Transcribe using OpenAI Whisper API
    const formDataRequest = new FormData()
    formDataRequest.append('file', new Blob([buffer], { type: audioFile.type }), audioFile.name)
    formDataRequest.append('model', 'whisper-1')
    formDataRequest.append('language', 'en')

    const whisperResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: formDataRequest
    })

    const transcriptData = await whisperResponse.json()

    if (!whisperResponse.ok) {
      return NextResponse.json({
        success: false,
        error: 'Transcription failed',
        details: transcriptData
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      transcript: transcriptData.text,
      audio: {
        name: audioFile.name,
        size: audioFile.size,
        type: audioFile.type
      },
      word_count: transcriptData.text?.split(/\s+/).length || 0
    })

  } catch (error) {
    console.error('Voice Audit Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process audio'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'E-Seller Voice Audit',
    features: ['Audio Transcription', 'Speech-to-Text', 'Voice Analysis'],
    provider: 'OpenAI Whisper',
    required_env: ['OPENAI_API_KEY'],
    usage: 'POST audio file to /api/voice-audit'
  })
}