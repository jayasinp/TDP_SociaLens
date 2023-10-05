import { useState } from "react";
import Home from "../dashboardComponents/Home";
import Reports from "../dashboardComponents/Reports";

function Dashboard() {
  const [view, setView] = useState("home");

  return (
    <div className="container">
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
      <div className="mt-4">
        {view === "home" && <Home />}
        {view === "reports" && <Reports />}
      </div>
    </div>
  );
}

export default Dashboard;
