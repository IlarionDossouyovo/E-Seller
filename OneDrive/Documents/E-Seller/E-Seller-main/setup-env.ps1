# Creer automatiquement le fichier .env.local
$content = @"
NEXT_PUBLIC_SUPABASE_URL=https://bauggttibriqdkfnlfhh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kYW5lYSIsInJlZiI6ImJh,dWdndHRpYnJpcWRrZm5sZmhoIiwicm9vbSI6Im9ubHkiLCJpbnQiOjIxLCJzY29wZSI6WyJwdWJsaWMiXSwiaWF0IjoxNjQyODQwODc5fQ.tVOIDM3SokDpqeGRANDANg0vKfW22M3SokDpqeGRA
GROQ_API_KEY=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
NEXTAUTH_SECRET=e-seller-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
"@

# Ecrit le fichier
Set-Content -Path ".env.local" -Value $content -Encoding UTF8

Write-Host "✅ .env.local cree!" -ForegroundColor Green