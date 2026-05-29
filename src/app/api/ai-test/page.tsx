'use client'

import { useState } from 'react'

export default function AiTestPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const askAi = async () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')
    
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question })
      })
      const data = await res.json()
      setAnswer(data.message || 'Pas de réponse')
    } catch (err) {
      setAnswer('Erreur: ' + err.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">🤖 E-Seller AI</h1>
        
        <div className="bg-white/10 backdrop-blur rounded-xl p-6">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Pose ta question ici..."
            className="w-full h-32 bg-black/30 text-white rounded-lg p-4 text-lg border border-white/20 focus:border-purple-500 outline-none resize-none"
          />
          
          <button
            onClick={askAi}
            disabled={loading || !question.trim()}
            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all disabled:opacity-50"
          >
            {loading ? '⏳ Chargement...' : '🚀 Poser la question'}
          </button>
        </div>

        {answer && (
          <div className="mt-8 bg-green-500/20 border border-green-500/50 rounded-xl p-6">
            <h2 className="text-green-400 font-bold mb-2">💬 Réponse:</h2>
            <p className="text-white whitespace-pre-wrap">{answer}</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button onClick={() => setQuestion("quel produit est rentable?")} className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition">
            🔍 Produits rentables
          </button>
          <button onClick={() => setQuestion("comment vendre sur Amazon?")} className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition">
            🛒 Vendre sur Amazon
          </button>
          <button onClick={() => setQuestion("marketing gratuit")} className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition">
            📢 Marketing Gratuit
          </button>
          <button onClick={() => setQuestion("comment trouver un fournisseur?")} className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition">
            📦 Trouver Fournisseur
          </button>
        </div>
      </div>
    </div>
  )
}