from fastapi import FastAPI

from app.middleware.cors import setup_cors
from app.schemas.prediction import PredictRequest
from app.services.prediction_service import predict_energy

# Create the FastAPI application
app = FastAPI(title="LSTM Inference API")

# Add CORS middleware
setup_cors(app)

@app.get("/")
def root():
    return {"message": "Welcome to PJM Energy Forecasting API!"}

# Create the prediction endpoint
@app.post("/predict")
def predict(request: PredictRequest):

    prediction = predict_energy(request.features)

    return {
        "prediction_consumption": prediction
    }