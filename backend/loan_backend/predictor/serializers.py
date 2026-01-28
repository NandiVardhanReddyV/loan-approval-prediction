from rest_framework import serializers

class LoanInputSerializer(serializers.Serializer):
    ApplicantIncome = serializers.FloatField(min_value=0)
    CoapplicantIncome = serializers.FloatField(min_value=0)
    LoanAmount = serializers.FloatField(min_value=0)
    Loan_Amount_Term = serializers.IntegerField(min_value=12)
    Credit_History = serializers.IntegerField()

    Gender_Male = serializers.IntegerField()
    Married_Yes = serializers.IntegerField()
    Education_Not_Graduate = serializers.IntegerField(required=False, default=0)
    Self_Employed_Yes = serializers.IntegerField()

    

    Dependents_1 = serializers.IntegerField(required=False, default=0)
    Dependents_2 = serializers.IntegerField(required=False, default=0)
    Dependents_3 = serializers.IntegerField(required=False, default=0)


    Property_Area_Urban = serializers.IntegerField()
    Property_Area_Semiurban = serializers.IntegerField()

    # 🔥 BUSINESS RULE VALIDATION
    def validate(self, data):
        total_income = data["ApplicantIncome"] + data["CoapplicantIncome"]

        if total_income == 0:
            raise serializers.ValidationError(
                "Total income cannot be zero."
            )

        if data["LoanAmount"] > total_income * 10:
            raise serializers.ValidationError(
                "Loan amount is too high compared to income."
            )

        if data["Credit_History"] not in [0, 1]:
            raise serializers.ValidationError(
                "Credit history must be 0 or 1."
            )

        return data
