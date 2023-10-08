//Pravin Mark Jayasinghe
// 8/10/2023
// datasets.js
// this views shows the user the data sets they have already uploaded.
// if we have time this will also show the user the analysis status.

import React from "react";

function Datasets() {
  return (
    <div className="container-fluid d-flex">
      <div className="d-flex flex-column w-50">
        <div className="card m-3 p-3 border border-danger border-2 w-100 bg-dark">
          <h1 className="heading mb-2 text-danger">Your Data Sets</h1>
          <p className="text-danger">No data sets uploaded</p>
        </div>
      </div>
    </div>
  );
}

export default Datasets;
