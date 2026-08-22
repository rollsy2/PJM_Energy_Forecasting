import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-icon">⚡</div>
        <div>
          <p className="logo-title">PJM forecasting</p>
          <p className="logo-subtitle">LSTM load forecasting</p>
        </div>
      </div>
      <nav className="header-nav">
        <span>Dashboard</span>
        <span>Model</span>
        <span>Dataset</span>
      </nav>
    </header>
  );
}

export default Header;