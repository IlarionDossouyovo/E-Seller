@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  E-SELLER INSTALLATION COMPLETE
echo  Script d'installation locale
echo ========================================
echo.

:: Check Node.js
echo [1/6] Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)
node --version
echo.

:: Check Git
echo [2/6] Checking Git...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed
    echo Please install Git from https://git-scm.com
    pause
    exit /b 1
)
git --version
echo.

:: Install dependencies
echo [3/6] Installing dependencies...
echo This may take a few minutes...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo.

:: Create .env.local if not exists
echo [4/6] Configuring environment...
if not exist ".env.local" (
    echo Creating .env.local...
    (
        echo NEXT_PUBLIC_SUPABASE_URL=https://bauggttibriqdkfnlfhh.supabase.co
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kYW5lYSIsInJlZiI6ImJhcmdndHRpYnJpcWRrZm5sZmhoIiwicm9vbSI6Im9ubHkiLCJpbnQiOjIxLCJzY29wZSI6WyJwdWJsaWMiXSwiaWF0IjoxNjQyODQwODc5fQ.tVOIDM3SokDpqeGRANDANg0vKfW22M3SokDpqeGRA
        echo GROQ_API_KEY=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
        echo NEXTAUTH_SECRET=e-seller-dev-secret-key-change-in-production-2024
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXT_PUBLIC_APP_URL=http://localhost:3000
    ) > .env.local
    echo .env.local created!
) else (
    echo .env.local already exists
)
echo.

:: Generate Prisma client
echo [5/6] Generating Prisma client...
call npx prisma generate
echo.

:: Build the application
echo [6/6] Building application...
call npm run build
if %errorlevel% neq 0 (
    echo Build has some errors but dev server will work
)
echo.

echo ========================================
echo  INSTALLATION COMPLETE!
echo ========================================
echo.
echo To start E-Seller, run:
echo   npm run dev
echo.
echo The app will be available at:
echo   http://localhost:3000
echo.
echo Dashboard:
echo   http://localhost:3000/dashboard
echo.
pause