from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_model import predict_loan

@api_view(["POST"])
def predict(request):
    prediction, probability = predict_loan(request.data)

    return Response({
        "loan_status": "Approved" if prediction == 1 else "Rejected",
        "approval_probability": round(probability * 100, 2)
    })
