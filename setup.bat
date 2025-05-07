@echo off
REM Clean installation
rd /s /q node_modules
if exist package-lock.json del package-lock.json

REM Install with legacy peer deps
npm install --legacy-peer-deps 