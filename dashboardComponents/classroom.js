// Pravin Mark Jayasinghe
// 18/10/2023
// classroom.js
import React, { useState, useEffect } from "react";

function Classroom() {
  const [cleanedDatasets, setCleanedDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [classMetrics, setClassMetrics] = useState([]); // New state for class metrics
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' for ascending and 'desc' for descending

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

  const fetchClassMetrics = (selectedDataset) => {
    fetch("http://localhost:5001/api/class_metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected_dataset: selectedDataset }),
    })
      .then((response) => response.json())
      .then((data) => {
        setClassMetrics(data);
      })
      .catch((error) => {
        console.error("Error fetching class metrics:", error);
      });
  };

  const handleDatasetChange = (event) => {
    const selectedDataset = event.target.value;
    setSelectedDataset(selectedDataset);
    fetchClassMetrics(selectedDataset); // Call the separated fetch function
  };

  function sortData(data) {
    return data.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === "number" && typeof valB === "number") {
        return sortDirection === "asc" ? valA - valB : valB - valA;
      } else {
        return sortDirection === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });
  }

  function handleSort(field) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }
  useEffect(() => {
    fetchCleanedDatasets();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4 text-danger">
        Select a Dataset for Classroom Analysis
      </h1>
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
          <div className="col-md-12">
            <h2 className="my-3 text-danger">Selected Dataset Information</h2>
            <p>You have selected the dataset: {selectedDataset}</p>
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("House")}>House</th>
                  <th onClick={() => handleSort("Perc_Academic")}>
                    Average Perc_Academic
                  </th>
                  <th onClick={() => handleSort("CompleteYears")}>
                    Average CompleteYears
                  </th>
                  <th onClick={() => handleSort("Perc_Effort")}>
                    Average Perc_Effort
                  </th>
                  <th onClick={() => handleSort("Attendance")}>
                    Average Attendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortData(classMetrics).map((metric) => (
                  <tr key={metric.House}>
                    <td>{metric.House}</td>
                    <td>{metric.Perc_Academic.toFixed(2)}</td>{" "}
                    {/* Ensure you're using the correct fields */}
                    <td>{metric.CompleteYears.toFixed(2)}</td>
                    <td>{metric.Perc_Effort.toFixed(2)}</td>
                    <td>{metric.Attendance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Classroom;
