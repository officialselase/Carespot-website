@echo off
REM CareSpot Frontend Deployment Script for Windows
echo 🚀 Starting CareSpot Frontend Deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the Carespot-frontend directory.
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Run linting
echo 🔍 Running linter...
npm run lint
if %errorlevel% neq 0 (
    echo ❌ Linting failed. Please fix the issues and try again.
    exit /b 1
)

REM Build the project
echo 🏗️ Building project...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix the errors and try again.
    exit /b 1
)

echo ✅ Build successful!

REM Deploy to Vercel
echo 🌐 Deploying to Vercel...
vercel --prod
if %errorlevel% neq 0 (
    echo ❌ Deployment failed. Please check the error messages above.
    exit /b 1
)

echo 🎉 Deployment successful!
echo 📱 Your CareSpot frontend is now live!