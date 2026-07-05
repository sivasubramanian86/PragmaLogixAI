@echo off
echo Running PragmaLogixAI Test Suite...
set PYTHONPATH=%cd%\..
.venv\Scripts\pytest -v tests/
pause
