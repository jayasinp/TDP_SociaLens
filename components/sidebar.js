// Pravin Mark Jayasinghe
// 5/10/2023
// Charan Prakash and Pravin Jayasinghe
// 8/10/2023
// sidebar.js
// This is the dashboard component for SociaLens.
// It is a bootstrap sidebar with links that set the current view.
// Priya (CSS)
// 9/10/2023
// added css and image

function Sidebar({ view, setView }) {
  return (
    <nav id="sidebar" className=" bg-danger sidebar">
      <div className="d-flex flex-column align-items-center position-sticky">
        <ul className="nav flex-column text-center">
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 pl-2 ${
                view === "home" ? "active" : ""
              }`}
              onClick={() => setView("home")}
            >
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "uploadData" ? "active" : ""
              }`}
              onClick={() => setView("uploadData")}
            >
              Upload Data
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "datasets" ? "active" : ""
              }`}
              onClick={() => setView("datasets")}
            >
              Datasets
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "individual" ? "active" : ""
              }`}
              onClick={() => setView("individual")}
            >
              Individual
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "classroom" ? "active" : ""
              }`}
              onClick={() => setView("classroom")}
            >
              Classroom
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "year" ? "active" : ""
              }`}
              onClick={() => setView("year")}
            >
              Year
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "correlations" ? "active" : ""
              }`}
              onClick={() => setView("correlations")}
            >
              Correlations
            </button>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "reports" ? "active" : ""
              }`}
              onClick={() => setView("reports")}
            >
              Reports
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "feedback" ? "active" : ""
              }`}
              onClick={() => setView("feedback")}
            >
              Feedback
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`btn btn-danger mb-3 ${
                view === "support" ? "active" : ""
              }`}
              onClick={() => setView("support")}
            >
              Support
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
