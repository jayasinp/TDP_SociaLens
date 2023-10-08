// Pravin Mark Jayasinghe
// 8/10/2023
//uploadData.js

import React from "react";

function Individual() {
  return (
    <div className="container-fluid d-flex">
      <div className="d-flex flex-column w-50">
        <div className="card m-3 p-3 border border-danger border-2 w-100 bg-dark">
          <h1 className="heading mb-2 text-danger">Upload Data Set</h1>
          <input type="file" className="mb-2" />
        </div>
      </div>
    </div>
  );
}

export default Individual;
