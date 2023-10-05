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
import styles from "@/styles/Dashboard.module.css";

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

function Dashboard() {
  // using useState to set the current view
  const [currentView, setCurrentView] = useState("home");

  const handleViewChange = (view) => {
    console.log("Dashboard handleViewChange:", view); // debugging line
    setCurrentView(view);
  };

  return (
    <div className={styles["container-fluid"]}>
      <Header />
      <div className="row">
        <aside className={styles.sidebar}>
          <Sidebar onViewChange={handleViewChange} currentView={currentView} />
        </aside>
        <main className={`col-md-9 ms-sm-auto col-lg-10 ${styles.mainContent}`}>
          {currentView === "home" && <Home />}
          {currentView === "uploadData" && <UploadData />}
          {currentView === "individual" && <Individual />}
          {currentView === "classroom" && <Classroom />}
          {currentView === "year" && <Year />}
          {currentView === "correlations" && <Correlations />}
          {currentView === "reports" && <Reports />}
          {currentView === "feedback" && <Feedback />}
          {currentView === "support" && <Support />}
        </main>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}

export default Dashboard;
