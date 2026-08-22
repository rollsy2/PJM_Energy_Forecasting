import "./ErrorMessage.css";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-box">
      <span>⚠️</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;