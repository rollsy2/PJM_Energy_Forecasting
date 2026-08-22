from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import joblib
import numpy as np
from pydantic import BaseModel, Field


# Create the FastAPI application
app = FastAPI(title="LSTM Inference API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained LSTM model
model = tf.keras.models.load_model("model/pjme_lstm_model.keras")

# Load the scaler that was used during model training
scaler = joblib.load("model/pjme_scaler.pkl")


@app.get("/")
def root():
    return {"message": "Welcome to PJM Energy Forecasting API!"}

# Define the expected structure of the prediction request
class PredictRequest(BaseModel):
    # The API expects exactly 24 electricity consumption values
    features: list[float] = Field(
        ...,
        min_length=24,
        max_length=24,
        description="List of 24 float values representing the electricity consumption for prediction."
    )


# Create the prediction endpoint
@app.post("/predict")
def predict(request: PredictRequest):

    # Convert the input list into a NumPy array
    # and reshape it into 24 rows and 1 feature
    input_data = np.array(request.features).reshape(-1, 1)

    # Scale the input data using the same scaler used during training
    scaled_data = scaler.transform(input_data)

    # Reshape the data into the format expected by the LSTM model:
    # (samples, timesteps, features) = (1, 24, 1)
    sequence = scaled_data.reshape(1, 24, 1)

    # Generate the next-hour electricity consumption prediction
    prediction = model.predict(sequence)

    # Convert the prediction back to the original electricity
    # consumption scale
    prediction = scaler.inverse_transform(prediction)

    # Return the predicted electricity consumption as a JSON response
    return {
        "prediction_consumption": float(prediction[0][0])
    }