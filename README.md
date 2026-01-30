<!-- # Loan Approval Prediction System

A full-stack machine learning application that predicts loan approval status based on applicant details.

## Tech Stack
- Machine Learning: scikit-learn
- Backend: Django REST Framework
- Frontend: React (Vite)
- Model Serialization: joblib

## Features
- Loan approval prediction with probability
- REST API for ML inference
- Interactive React frontend
- Input validation (frontend + backend)

## How to Run

### Backend
```bash
cd backend
python manage.py runserver

<<<<<<< HEAD
=======
## Model Files

The trained machine learning model files (`.pkl`) are intentionally not committed to GitHub 
to keep the repository lightweight and maintainable.

Before running the backend server, place the following files in the backend root directory:
- `loan_model.pkl`
- `scaler.pkl`
- `columns.pkl`
 -->

# 🚀 Loan Approval Prediction System

A production-ready Full-Stack Machine Learning web application that predicts loan approval status and approval probability based on applicant financial and demographic data.

Built using a scalable architecture with React frontend and Django REST backend.

---

## 🌐 Live Demo

### 🔹 Frontend (Vercel)
https://loan-approval-prediction-nine.vercel.app

### 🔹 Backend API (Render)
https://loan-approval-prediction-xib7.onrender.com/api/predict/

---

## 🧠 Project Overview

This system predicts whether a loan application will be:

- ✅ Approved  
- ❌ Rejected  

It also provides:

- 📊 Approval probability score

The machine learning model is trained on structured financial data and deployed via a REST API.

---

## 🏗 Architecture

            ┌──────────────────────────┐
            │        React App         │
            │   (Vercel - Frontend)    │
            └──────────────┬───────────┘
                           │
                           │ HTTPS API Call
                           ▼
            ┌──────────────────────────┐
            │     Django REST API      │
            │    (Render - Backend)    │
            └──────────────┬───────────┘
                           │
                           ▼
            ┌──────────────────────────┐
            │  ML Model (Scikit-learn)│
            │   Loan Prediction Logic  │
            └──────────────────────────┘

---

## ⚙️ Tech Stack

### 🔹 Frontend
- React (Vite)
- Tailwind CSS
- Fetch API
- Environment Variables

### 🔹 Backend
- Django 6
- Django REST Framework
- CORS Headers
- WhiteNoise
- Gunicorn

### 🔹 Machine Learning
- Scikit-learn
- Classification Model
- Probability Scoring

### 🔹 Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 🔐 Production Configuration

Environment-based configuration implemented for secure deployment.

```python
import os

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
DEBUG = os.getenv("DEBUG", "True") == "True"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")


Production Variables (Render):

DEBUG=False
SECRET_KEY=<your-secure-key>
ALLOWED_HOSTS=loan-approval-prediction-xib7.onrender.com


Frontend Variable (Vercel):

VITE_API_BASE_URL=https://loan-approval-prediction-xib7.onrender.com

📡 API Documentation
Endpoint
POST /api/predict/

Sample Request
{
  "Gender_Male": 1,
  "Married_Yes": 1,
  "Dependents_1": 0,
  "Education_Not_Graduate": 0,
  "Self_Employed_Yes": 0,
  "ApplicantIncome": 5000,
  "CoapplicantIncome": 2000,
  "LoanAmount": 150,
  "Loan_Amount_Term": 360,
  "Credit_History": 1,
  "Property_Area_Urban": 0,
  "Property_Area_Semiurban": 1
}

Sample Response
{
  "loan_status": "Approved",
  "approval_probability": 85.18
}

💻 Local Setup
🔹 Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py runserver


Backend runs at:

http://127.0.0.1:8000/

🔹 Frontend Setup
cd frontend/loan-ui
npm install
npm run dev


Frontend runs at:

http://localhost:5173/


Create .env file:

VITE_API_BASE_URL=http://127.0.0.1:8000

📦 Deployment Guide
🔹 Backend (Render)

Connect GitHub repository

Create Web Service

Add environment variables

Start Command:

gunicorn loan_backend.wsgi:application

🔹 Frontend (Vercel)

Import GitHub repository

Set Root Directory:

frontend/loan-ui


Add Environment Variable:

VITE_API_BASE_URL=https://loan-approval-prediction-xib7.onrender.com


Deploy

📁 Project Structure
loan-approval-prediction/
│
├── backend/
│   ├── loan_backend/
│   ├── predictor/
│   ├── requirements.txt
│   └── manage.py
│
├── frontend/
│   └── loan-ui/
│       ├── src/
│       ├── public/
│       ├── .env
│       └── vite.config.js
│
└── README.md

✨ Key Features

Full-stack ML integration

Production-ready deployment

Secure environment variable management

Clean responsive UI

Probability-based prediction

REST API architecture

Cloud deployment on two platforms

🎯 What This Project Demonstrates

End-to-end Machine Learning deployment

API development using Django REST

Frontend-backend integration

Cloud deployment experience

Environment-based production configuration

Real-world financial prediction system

👨‍💻 Author

Vogulam Nandi Vardhan Reddy
B.Tech – Computer Science Engineering
Machine Learning & AI Enthusiast