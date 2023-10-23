// Pravin Mark Jayasinghe
// 8/10/2023
// reports.js

import React, { useState, useEffect } from "react";

function Reports() {
  const [cleanedDatasets, setCleanedDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/cleaned_datasets_list")
      .then((response) => response.json())
      .then((data) => {
        setCleanedDatasets(data.cleaned_datasets_list);
      })
      .catch((error) => {
        console.error("Error fetching cleaned datasets:", error);
      });
  }, []);

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const handleGenerateReportClick = () => {
    fetch("http://localhost:5001/api/report_generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected_dataset: selectedDataset }),
    })
      .then((response) => {
        response.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "report.pdf";
          a.click();
        });
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card m-3 border border-danger bg-dark">
            <div className="card-body">
              <h1 className="heading mb-3 text-danger text-center">
                Generate Report
              </h1>

              <div className="mb-3">
                <label htmlFor="dataset-dropdown-report" className="form-label">
                  Choose a Dataset
                </label>
                <select
                  id="dataset-dropdown-report"
                  className="form-select"
                  onChange={handleDatasetChange}
                  value={selectedDataset}
                >
                  <option value="" disabled>
                    Select a dataset
                  </option>
                  {cleanedDatasets.map((dataset) => (
                    <option key={dataset} value={dataset}>
                      {dataset}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn btn-danger mb-3 d-block mx-auto"
                onClick={handleGenerateReportClick}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
