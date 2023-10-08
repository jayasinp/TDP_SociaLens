// Pravin Mark Jayasinghe
// 8/10/2023
// Support.js

import React from "react";

function Support() {
  return (
    <div className="container-fluid d-flex">
      <div className="d-flex flex-column w-50">
        <div className="card m-3 p-3 border border-danger border-2 w-100 bg-dark">
          <h1 className="heading mb-2 text-danger">Support</h1>

          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-dark">
              <a
                href="https://link-to-documentation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-danger"
              >
                Documentation
              </a>
            </li>
            <li className="list-group-item bg-dark">
              <a
                href="https://link-to-user-guide.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-danger"
              >
                User Guide
              </a>
            </li>
            <li className="list-group-item bg-dark">
              <a
                href="https://github.com/your-repo-link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-danger"
              >
                GitHub Repo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Support;
