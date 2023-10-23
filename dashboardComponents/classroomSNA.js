// Pravin Mark Jayasinghe
// 23/10/2023
// classroomSNA.js
// show more information from the survey

import React, { useState, useEffect } from "react";

function Survey() {
  const [cleanedDatasets, setCleanedDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [surveyMetrics, setSurveyMetrics] = useState({}); // State to store survey metrics

  // Function to fetch the list of cleaned datasets
  const fetchCleanedDatasets = () => {
    fetch("http://localhost:5001/api/cleaned_datasets_list")
      .then((response) => response.json())
      .then((data) => {
        setCleanedDatasets(data.cleaned_datasets_list);
      })
      .catch((error) => {
        console.error("Error fetching cleaned datasets:", error);
      });
  };

  const fetchSurveyMetrics = (dataset) => {
    fetch("http://localhost:5001/api/process_survey_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected_dataset: dataset }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSurveyMetrics(data);
      })
      .catch((error) => {
        console.error("Error fetching survey metrics:", error);
      });
  };

  const handleDatasetChange = (event) => {
    const selectedDataset = event.target.value;
    setSelectedDataset(selectedDataset);
    fetchSurveyMetrics(selectedDataset); // Fetch the survey metrics for the selected dataset
  };

  useEffect(() => {
    fetchCleanedDatasets();
  }, []);

  return (
    <div className="container-fluid d-flex">
      <div className="d-flex flex-column w-50">
        <div className="card m-3 p-3 border border-danger border-2 w-100 bg-dark">
          <h1 className="heading mb-2 text-danger">Survey Data</h1>

          <div className="mb-3">
            <label htmlFor="dataset-dropdown-sna" className="form-label">
              Choose a Dataset
            </label>
            <select
              id="dataset-dropdown-sna"
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

          {/* Render survey metrics in a table if they exist */}
          {Object.keys(surveyMetrics).length > 0 && (
            <table className="table table-bordered table-hover text-danger">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">Average Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(surveyMetrics).map(([metric, value]) => (
                  <tr key={metric}>
                    <th scope="row">{metric}</th>
                    <td>{value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Survey;
