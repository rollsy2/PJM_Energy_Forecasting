import "./DatasetInsights.css";

// ⚠️ Replace with your actual EDA numbers from the notebook
const stats = {
  records: "145,366",
  dateRange: "2002-2018",
  average: "32,080 MW",
  maxMin: "62,009 / 14,544",
};

const hourlyAvg = [
  45, 40, 36, 34, 38, 50, 65, 80, 85, 82, 80, 78,
  80, 83, 88, 93, 100, 96, 90, 80, 70, 60, 53, 47,
];

function DatasetInsights() {
  return (
    <div className="card dataset-insights">
      <p className="card-title">
        <span className="icon">🗄️</span>Dataset overview
      </p>
      <p className="insights-subtitle">PJME hourly consumption</p>

      <div className="stats-grid">
        <div className="stat-box">
          <p className="stat-label">Records</p>
          <p className="stat-value">{stats.records}</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Date range</p>
          <p className="stat-value">{stats.dateRange}</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Average</p>
          <p className="stat-value">{stats.average}</p>
        </div>
        <div className="stat-box">
          <p className="stat-label">Max / Min</p>
          <p className="stat-value">{stats.maxMin}</p>
        </div>
      </div>

      <p className="chart-label">Average load by hour of day</p>
      <div className="hourly-bars">
        {hourlyAvg.map((h, i) => (
          <div key={i} className="hourly-bar" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export default DatasetInsights;