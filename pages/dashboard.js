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
import Home from "../dashboardComponents/home";
import UploadData from "../dashboardComponents/uploadData";
import Individual from "../dashboardComponents/individual";
import Classroom from "../dashboardComponents/classroom";
import Year from "../dashboardComponents/year";
import Correlations from "../dashboardComponents/correlations";
import Reports from "../dashboardComponents/reports";
import Feedback from "../dashboardComponents/feedback";
import Support from "../dashboardComponents/support";
import Datasets from "../dashboardComponents/datasets";
import Sna from "../dashboardComponents/sna";
import Survey from "../dashboardComponents/classroomSNA";
import Deidentify from "../dashboardComponents/deidentify";
import NetworkxProcessor from "../dashboardComponents/NetworkxProcessor";

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
          {view === "datasets" && <Datasets />}
          {view === "sna" && <Sna />}
          {view === "survey" && <Survey />}
          {view === "deidentify" && <Deidentify />}
          {view === "networkxProcessor" && <NetworkxProcessor />}
        </main>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Dashboard;
