from pydantic import BaseModel, Field


# Define the expected structure of the prediction request
class PredictRequest(BaseModel):

    # The API expects exactly 24 electricity consumption values
    features: list[float] = Field(
        ...,
        min_length=24,
        max_length=24,
        description="List of 24 float values representing the electricity consumption for prediction."
    )