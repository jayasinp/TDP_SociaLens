// Pravin Mark Jayasinghe
// 23/10/2023
// NetworkxProcessor component for the dashboard
import React, { useState, useEffect } from "react";

function NetworkxProcessor() {
  const [cleanedDatasets, setCleanedDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [centralityData, setCentralityData] = useState({});
  const [activeTab, setActiveTab] = useState(""); // Added this state to manage the active tab

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

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const handleProcessClick = () => {
    fetch("http://localhost:5001/api/networkx_processor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected_dataset: selectedDataset }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCentralityData(data);
        // Automatically set the active tab to the first sheet when data is loaded
        setActiveTab(Object.keys(data)[0]);
      })
      .catch((error) => {
        console.error("Error processing networkx data:", error);
      });
  };

  useEffect(() => {
    fetchCleanedDatasets();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card m-3 border border-danger bg-dark">
            <div className="card-body">
              <h1 className="heading mb-3 text-danger text-center">
                NetworkX Processor
              </h1>

              <div className="mb-3">
                <label
                  htmlFor="dataset-dropdown-networkx"
                  className="form-label"
                >
                  Choose a Dataset
                </label>
                <select
                  id="dataset-dropdown-networkx"
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
                onClick={handleProcessClick}
              >
                Process with NetworkX
              </button>

              {/* Tabbed component for each sheet */}
              <ul className="nav nav-tabs">
                {Object.keys(centralityData).map((sheet) => (
                  <li className="nav-item" key={`tab-${sheet}`}>
                    <button
                      className={`nav-link ${
                        sheet === activeTab ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(sheet)}
                    >
                      {sheet}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content">
                {Object.entries(centralityData).map(([sheet, values]) => (
                  <div
                    className={`tab-pane ${
                      sheet === activeTab ? "active" : ""
                    }`}
                    id={sheet}
                    key={`content-${sheet}`}
                  >
                    <table className="table table-bordered table-hover text-danger mt-3">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">Node</th>
                          <th scope="col">Centrality</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(values)
                          .sort((a, b) => b[1] - a[1]) // Sorting in descending order
                          .map(([node, centrality]) => (
                            <tr key={`${sheet}-${node}`}>
                              <td>{node}</td>
                              <td>{centrality.toFixed(2)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkxProcessor;
