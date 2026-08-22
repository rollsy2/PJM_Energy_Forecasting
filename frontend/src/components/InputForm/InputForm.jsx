import "./InputForm.css";

const MIN_MW = 20000;
const MAX_MW = 45000;

function InputForm({ values, onChange, onPredict, onRandomize, loading }) {
  const handleInputChange = (index, newValue) => {
    const updated = [...values];
    updated[index] = newValue;
    onChange(updated);
  };

  return (
    <div className="card input-form">
      <div className="input-form-header">
        <p className="card-title">
          <span className="icon">📈</span>Last 24 hourly readings
        </p>
        <button type="button" className="btn-ghost" onClick={onRandomize} disabled={loading}>
          🔄 Sample
        </button>
      </div>
<p className="input-form-hint">
  Values in MW, ordered oldest → most recent. Reading 1 = 24 hours ago, reading 24 = most recent hour.
</p>

      <div className="input-grid">
        {values.map((val, index) => (
          <div key={index} className="input-cell">
            <label>{index + 1}</label>
            <input
              type="number"
              value={val}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button type="button" className="btn-primary" onClick={onPredict} disabled={loading}>
        {loading ? "Predicting..." : "Predict next hour"}
      </button>
    </div>
  );
}

export { MIN_MW, MAX_MW };
export default InputForm;