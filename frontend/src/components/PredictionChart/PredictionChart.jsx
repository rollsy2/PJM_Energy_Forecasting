import "./PredictionChart.css";

function buildSmoothPath(values, width, height, min, max) {
  const step = width / (values.length - 1);
  const points = values.map((v, i) => ({
    x: i * step,
    y: height - ((v - min) / (max - min)) * height,
  }));

  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    path += ` Q${curr.x},${curr.y} ${midX},${(curr.y + next.y) / 2}`;
  }
  path += ` T${points[points.length - 1].x},${points[points.length - 1].y}`;
  return path;
}

function PredictionChart({ values, prediction, animationKey }) {
  if (prediction === null) return null;

  const numericValues = values.map(Number);
  const allValues = [...numericValues, prediction];
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  const width = 600;
  const height = 120;
  const plotWidth = width * (24 / 25);

  const historicalPath = buildSmoothPath(numericValues, plotWidth, height, min, max);

  const lastX = plotWidth;
  const lastY = height - ((numericValues[23] - min) / (max - min)) * height;
  const predX = width;
  const predY = height - ((prediction - min) / (max - min)) * height;

  return (
    <div className="card prediction-chart">
      <div className="chart-header">
        <p className="card-title">Consumption timeline</p>
        <div className="chart-legend">
          <span className="legend-item"><i className="dot teal"></i>Historical</span>
          <span className="legend-item"><i className="dot amber"></i>Predicted</span>
        </div>
      </div>
      <svg key={animationKey} viewBox={`0 0 ${width} ${height}`} className="chart-svg">
        <path d={historicalPath} fill="none" stroke="#1D9E75" strokeWidth="2.5" className="fade-line" />
        <path
          d={`M${lastX},${lastY} L${predX},${predY}`}
          fill="none"
          stroke="#BA7517"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          className="fade-line-delayed"
        />
        <circle cx={predX} cy={predY} r="4" fill="#EF9F27" className="fade-dot" />
      </svg>
    </div>
  );
}

export default PredictionChart;