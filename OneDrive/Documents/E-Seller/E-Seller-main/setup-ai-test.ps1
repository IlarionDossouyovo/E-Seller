# ============================================
# E-Seller - Setup AI Test en UN SEUL script
# ============================================

Write-Host "🤖 Setup AI Test pour E-Seller..." -ForegroundColor Cyan

# 1. Creer le dossier
$appDir = "src\app\ai-test"
if (!(Test-Path $appDir)) {
    New-Item -ItemType Directory -Path $appDir -Force | Out-Null
    Write-Host "✅ Dossier cree" -ForegroundColor Green
}

# 2. Creer le fichier page.tsx
$pageContent = @'
"use client"

import { useState } from "react"

export default function AiTestPage() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const askAi = async () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer("")
    
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      })
      const data = await res.json()
      setAnswer(data.message || "Pas de reponse")
    } catch (err) {
      setAnswer("Erreur: " + err.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🤖 E-Seller AI Test</h1>
        
        <div className="bg-white/10 backdrop-blur rounded-xl p-6">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Pose ta question ici..."
            className="w-full h-32 bg-black/30 text-white rounded-lg p-4 border border-white/20"
          />
          
          <button
            onClick={askAi}
            disabled={loading || !question.trim()}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg"
          >
            {loading ? "Chargement..." : "Envoyer"}
          </button>
        </div>

        {answer && (
          <div className="mt-6 bg-green-500/20 rounded-xl p-4">
            <p className="text-white">{answer}</p>
          </div>
        )}
      </div>
    </div>
  )
}
'@

Set-Content -Path "$appDir\page.tsx" -Value $pageContent -Encoding UTF8
Write-Host "✅ Fichier cree" -ForegroundColor Green

# 3. Message final
Write-Host ""
Write-Host "=======================================" -ForegroundColor Yellow
Write-Host "🎉 Setup termine!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Yellow
Write-Host "Va sur: http://localhost:3000/api/ai-test" -ForegroundColor Cyan
Write-Host ""

