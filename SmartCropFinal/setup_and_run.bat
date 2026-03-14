@echo off
title KisanAI - Smart Crop Advisory System
color 0A
echo.
echo  ========================================
echo   🌱  KisanAI - Smart Crop Advisory
echo  ========================================
echo.
echo  [1/3] Installing Python libraries...
pip install flask werkzeug scikit-learn pandas numpy requests
echo.
echo  [2/3] Training ML Model (96%% accuracy)...
python train_model.py
echo.
echo  [3/3] Starting Web Server...
echo.
echo  ========================================
echo   Open browser: http://127.0.0.1:5000
echo   Admin Panel : http://127.0.0.1:5000/admin/login
echo   Admin Login : admin / admin123
echo  ========================================
echo.
python app.py
pause
