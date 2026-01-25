import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = joblib.load(os.path.join(BASE_DIR, "loan_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))
columns = joblib.load(os.path.join(BASE_DIR, "columns.pkl"))

def predict_loan(data):
    df = pd.DataFrame([data])
    df = df.reindex(columns=columns, fill_value=0)
    df_scaled = scaler.transform(df)

    prediction = int(model.predict(df_scaled)[0])
    probability = float(model.predict_proba(df_scaled)[0][1])

    return prediction, probability
