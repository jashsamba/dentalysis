@echo off
REM Test installation script for Dentalysis

REM Print banner
echo ====================================
echo DENTALYSIS TEST INSTALLATION SCRIPT
echo ====================================
echo.

REM Run clean installation
echo Step 1: Running clean installation...
call setup.bat
if %ERRORLEVEL% neq 0 (
    echo ❌ Clean installation failed
    exit /b 1
) else (
    echo ✅ Clean installation succeeded
)

REM Build the application
echo.
echo Step 2: Building the application...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed
    exit /b 1
) else (
    echo ✅ Build succeeded
)

REM Run linting
echo.
echo Step 3: Running linting...
call npm run lint
if %ERRORLEVEL% neq 0 (
    echo ❌ Linting failed (some errors may be expected)
    echo    Review errors to determine if they're critical
) else (
    echo ✅ Linting succeeded
)

REM Start dev server
echo.
echo Step 4: Starting development server...
echo    Press Ctrl+C after confirming server starts correctly
call npm run dev 