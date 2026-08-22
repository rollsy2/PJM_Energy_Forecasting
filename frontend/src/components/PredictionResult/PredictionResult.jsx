import "./PredictionResult.css";

function PredictionResult({ prediction, lastValue }) {
  if (prediction === null) return null;

  const diff = lastValue ? (((prediction - lastValue) / lastValue) * 100).toFixed(1) : null;
  const isDown = diff !== null && diff < 0;

  return (
    <div className="card prediction-result">
      <p className="card-title" style={{ justifyContent: "center" }}>
        <span className="icon">🎯</span>Predicted next hour
      </p>
      <p className="prediction-value">{Math.round(prediction).toLocaleString()} MW</p>
      {diff !== null && (
        <p className={`prediction-diff ${isDown ? "down" : "up"}`}>
          {isDown ? "▼" : "▲"} {Math.abs(diff)}% vs last reading ({Math.round(lastValue).toLocaleString()} MW)
        </p>
      )}
    </div>
  );
}

export default PredictionResult;