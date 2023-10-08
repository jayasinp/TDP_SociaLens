// Pravin Mark Jayasinghe
// 5/10/2023
// dashboard.js
// This is the dashboard page for SociaLens.
// It is a complex page with a sidenav bar that allows you to switch between view components

import React, { useState } from "react";
import Link from "next/link";
// import components
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

// import view components from dashboardComponents folder
import Home from "../dashboardComponents/Home";
import UploadData from "../dashboardComponents/UploadData";
import Individual from "../dashboardComponents/Individual";
import Classroom from "../dashboardComponents/Classroom";
import Year from "../dashboardComponents/Year";
import Correlations from "../dashboardComponents/Correlations";
import Reports from "../dashboardComponents/Reports";
import Feedback from "../dashboardComponents/Feedback";
import Support from "../dashboardComponents/Support";

function Dashboard() {
  // using useState to set the current view
  const [view, setView] = useState("home");

  return (
    //addded classname for dashboard for min height
    <div className="container-fluid dashboard"> 
      <Header />
      <div className="d-flex">
        <aside className="sidebar col-2">
          <Sidebar view={view} setView={setView} />
        </aside>
        <main className="col-md-9 ms-sm-auto col-lg-10">
          {view === "home" && <Home />}
          {view === "uploadData" && <UploadData />}
          {view === "individual" && <Individual />}
          {view === "classroom" && <Classroom />}
          {view === "year" && <Year />}
          {view === "correlations" && <Correlations />}
          {view === "reports" && <Reports />}
          {view === "feedback" && <Feedback />}
          {view === "support" && <Support />}
        </main>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Dashboard;
