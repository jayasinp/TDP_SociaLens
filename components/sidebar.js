// Pravin Mark Jayasinghe
// 5/10/2023
// Charan Prakash and Pravin Jayasinghe
// 8/10/2023
// sidebar.js
// This is the dashboard component for SociaLens.
// It is a bootstrap sidebar with links that set the current view.
// Priya (CSS) and Pravin Jayasinghe (icons)
// 9/10/2023
// added css and image, added bootstrap icons

import "bootstrap-icons/font/bootstrap-icons.css";

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
              <i className="bi bi-house-fill me-2"></i>
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
              <i class="bi bi-cloud-arrow-up-fill me-2"></i>
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
              <i class="bi bi-database-fill me-2"></i>
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
              <i class="bi bi-person-raised-hand me-2"></i> Individual
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
              <i class="bi bi-file-earmark-person-fill me-2"></i>
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
              <i class="bi bi-people-fill me-2"></i>
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
              <i class="bi bi-clipboard-data-fill me-2"></i>
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
              <i class="bi bi-file-earmark-text-fill me-2"></i>
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
              <i class="bi bi-chat-square-dots-fill me-2"></i>
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
              <i class="bi bi-question-circle-fill me-2"></i>
              Support
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
