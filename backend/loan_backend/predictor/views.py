from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoanInputSerializer
from .ml_model import predict_loan

@api_view(["POST"])
def predict(request):
    serializer = LoanInputSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        prediction, probability = predict_loan(serializer.validated_data)

        return Response({
            "loan_status": "Approved" if prediction == 1 else "Rejected",
            "approval_probability": round(probability * 100, 2)
        })

    except Exception as e:
        return Response(
            {"error": "Prediction failed. Please try again."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
