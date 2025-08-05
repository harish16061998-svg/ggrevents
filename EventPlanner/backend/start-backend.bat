@echo off
cd backend
echo Installing dependencies...
npm install express mysql2 cors body-parser
echo Starting backend server...
node server.js

