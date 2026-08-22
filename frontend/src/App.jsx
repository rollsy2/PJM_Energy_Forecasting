import { useState } from "react";
import Header from "./components/Header/Header";
import InputForm, { MIN_MW, MAX_MW } from "./components/InputForm/InputForm";
import PredictionResult from "./components/PredictionResult/PredictionResult";
import PredictionChart from "./components/PredictionChart/PredictionChart";
import DatasetInsights from "./components/DatasetInsights/DatasetInsights";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { predictConsumption } from "./services/api";
import "./index.css";

function App() {
  const [values, setValues] = useState(Array(24).fill(30000));
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const handleRandomize = () => {
    const random = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * (MAX_MW - MIN_MW) + MIN_MW)
    );
    setValues(random);
  };

  const handlePredict = async () => {
    setError(null);
    const numericValues = values.map(Number);
    if (numericValues.some((v) => isNaN(v))) {
      setError("Please make sure all 24 values are valid numbers.");
      return;
    }

    setLoading(true);
    try {
      const result = await predictConsumption(numericValues);
      setPrediction(result.prediction_consumption);
      setAnimationKey((prev) => prev + 1);
    } catch (err) {
      setError("Could not reach the prediction server. Is the API running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <InputForm
        values={values}
        onChange={setValues}
        onPredict={handlePredict}
        onRandomize={handleRandomize}
        loading={loading}
      />
      {loading && <LoadingSpinner />}
      <ErrorMessage message={error} />
      <PredictionResult prediction={prediction} lastValue={values[23]} />
      <PredictionChart values={values} prediction={prediction} animationKey={animationKey} />
      <DatasetInsights />
    </div>
  );
}

export default App;