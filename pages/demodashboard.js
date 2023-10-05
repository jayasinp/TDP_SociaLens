import { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "../dashboardComponents/Home";
import Reports from "../dashboardComponents/Reports";

function Dashboard() {
  const [view, setView] = useState("home");

  return (
    <div className="container">
      <Navbar view={view} setView={setView} />
      <div className="mt-4">
        {view === "home" && <Home />}
        {view === "reports" && <Reports />}
      </div>
    </div>
  );
}

export default Dashboard;
