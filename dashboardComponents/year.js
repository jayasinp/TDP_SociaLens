// Pravin Mark Jayasinghe
// 18/10/2023
// year.js
// allows user to view statistics and SNA for the whole dataset

import React, { useState, useEffect } from "react";

function Year() {
  const [cleanedDatasets, setCleanedDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(""); // Define selectedDataset state
  const [yearMetrics, setYearMetrics] = useState(null); // State to store year metrics

  // Function to fetch the list of cleaned datasets
  const fetchCleanedDatasets = () => {
    fetch("http://localhost:5001/api/cleaned_datasets_list")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (data contains a list of cleaned datasets)
        setCleanedDatasets(data.cleaned_datasets_list);
      })
      .catch((error) => {
        console.error("Error fetching cleaned datasets:", error);
      });
  };

  const fetchYearMetrics = (dataset) => {
    fetch("http://localhost:5001/api/year_metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected_dataset: dataset }),
    })
      .then((response) => response.json())
      .then((data) => {
        setYearMetrics(data);
      })
      .catch((error) => {
        console.error("Error fetching year metrics:", error);
      });
  };

  const handleDatasetChange = (event) => {
    const selectedDataset = event.target.value;
    setSelectedDataset(selectedDataset);
    fetchYearMetrics(selectedDataset); // Fetch year metrics upon dataset selection
  };

  useEffect(() => {
    fetchCleanedDatasets();
  }, []);
  return (
    <div className="container">
      <h1 className="my-4 text-danger">Select a Dataset for Year Analysis</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="dataset-dropdown" className="form-label">
              Choose a Dataset
            </label>
            <select
              id="dataset-dropdown"
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
        </div>
      </div>
      {selectedDataset && (
        <div className="row">
          <div className="col-md-6">
            <h2 className="my-3 text-danger">Selected Dataset Information</h2>
            <p>You have selected the dataset: {selectedDataset}</p>
          </div>
        </div>
      )}
      {selectedDataset && yearMetrics && (
        <div className="row mt-4">
          <div className="col-md-6">
            <h3 className="text-danger">Metrics</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Number of Students</td>
                  <td>{yearMetrics.num_students}</td>
                </tr>
                <tr>
                  <td>Average Perc_Effort</td>
                  <td>{yearMetrics.avg_perc_effort.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Average Attendance</td>
                  <td>{yearMetrics.avg_attendance.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Average Perc_Academic</td>
                  <td>{yearMetrics.avg_perc_academic.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Average CompleteYears</td>
                  <td>{yearMetrics.avg_complete_years.toFixed(2)}</td>
                </tr>
                {/* You can add more rows here if you have other metrics to display */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Year;
