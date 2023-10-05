// Pravin Mark Jayasinghe
// 5/10/2023
// sidebar.js
// This is the dashboard component for SociaLens.
// It is a bootstrap sidebar with links that set the current view.
function Sidebar({ onViewChange, currentView }) {
  const handleClick = (event, view) => {
    event.preventDefault();
    console.log("Sidebar handleClick:", view); // debugging line
    onViewChange(view);
  };

  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className={`nav-link ${currentView === "home" ? "active" : ""}`}
              href="#"
              onClick={(event) => handleClick(event, "home")}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentView === "uploadData" ? "active" : ""
              }`}
              href="#"
              onClick={(event) => handleClick(event, "uploadData")}
            >
              Upload Data
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentView === "individual" ? "active" : ""
              }`}
              href="#"
              onClick={(event) => handleClick(event, "individual")}
            >
              Individual
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentView === "classroom" ? "active" : ""
              }`}
              href="#"
              onClick={(event) => handleClick(event, "classroom")}
            >
              Classroom
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${currentView === "year" ? "active" : ""}`}
              href="#"
              onClick={(event) => handleClick(event, "year")}
            >
              Year
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentView === "correlations" ? "active" : ""
              }`}
              href="#"
              onClick={(event) => handleClick(event, "correlations")}
            >
              Correlations
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentView === "reports" ? "active" : ""
              }`}
              href="#"
              onClick={(event) => handleClick(event, "reports")}
            >
              Reports
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentView === "feedback" ? "active" : ""
              }`}
              href="#"
              onClick={(event) => handleClick(event, "feedback")}
            >
              Feedback
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentView === "support" ? "active" : ""
              }`}
              href="#"
              onClick={(event) => handleClick(event, "support")}
            >
              Support
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
