function Navbar({ view, setView }) {
  return (
    <div className="btn-group" role="group">
      <button
        type="button"
        className={`btn btn-secondary ${view === "home" ? "active" : ""}`}
        onClick={() => setView("home")}
      >
        Home
      </button>
      <button
        type="button"
        className={`btn btn-secondary ${view === "reports" ? "active" : ""}`}
        onClick={() => setView("reports")}
      >
        Reports
      </button>
    </div>
  );
}

export default Navbar;
