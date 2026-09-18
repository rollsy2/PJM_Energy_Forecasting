import tensorflow as tf
import joblib
import numpy as np


# Load the trained LSTM model
model = tf.keras.models.load_model(
    "model/pjme_lstm_model.keras"
)

# Load the scaler that was used during model training
scaler = joblib.load(
    "model/pjme_scaler.pkl"
)

def predict_energy(features):

    # Convert the input list into a NumPy array
    input_data = np.array(features).reshape(-1, 1)

    # Scale the input data
    scaled_data = scaler.transform(input_data)

    # Reshape into the format expected by the LSTM
    sequence = scaled_data.reshape(1, 24, 1)

    # Generate prediction
    prediction = model.predict(sequence)

    # Convert prediction back to original scale
    prediction = scaler.inverse_transform(prediction)

    return float(prediction[0][0])