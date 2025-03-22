from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import xgboost as xgb

# Load Model
model = pickle.load(open("model.pkl", "rb"))

# Initialize Flask App
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Phishing Detection API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        prediction = model.predict(df)
        return jsonify({"prediction": int(prediction[0])})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
