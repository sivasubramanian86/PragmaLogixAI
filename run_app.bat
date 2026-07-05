@echo off
title PragmaLogixAI Launcher
echo ==============================================================
echo           PragmaLogixAI — Life Decision Intelligence OS
echo ==============================================================
echo.

echo [1/3] Checking and freeing ports 8080 (backend) and 3000 (frontend)...
powershell -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue).OwningProcess -Force -ErrorAction SilentlyContinue"
powershell -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess -Force -ErrorAction SilentlyContinue"
echo      Ports cleared successfully.
echo.

echo [2/3] Launching FastAPI Backend (Port 8080) in a new window...
set PYTHONPATH=%cd%\..
start "PragmaLogixAI Backend API" cmd /c "set PYTHONPATH=%cd%\..&& .venv\Scripts\python.exe -m uvicorn PragmaLogixAI.backend.app.main:app --host 0.0.0.0 --port 8080 --reload"

echo [3/3] Launching Next.js Frontend (Port 3000) in a new window...
start "PragmaLogixAI Frontend UI" cmd /c "cd frontend && npm run dev"

echo.
echo ==============================================================
echo Launcher Complete! Both backend and frontend are starting...
echo.
echo   - Backend Swagger Docs : http://localhost:8080/docs
echo   - Frontend Interface    : http://localhost:3000
echo.
echo Leave this launcher window open, or close it once confirmed.
echo ==============================================================
pause
