// Pravin Mark Jayasinghe
// 8/10/2023
// reports.js

import React, { useState } from "react";

function Reports() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selectedDataset, setSelectedDataset] = useState("");
  const [overallSchoolOptions, setOverallSchoolOptions] = useState({
    wellbeing: false,
    sentiment: false,
    statistics: false,
    metrics: false,
  });
  const [comparativeAnalysisOptions, setComparativeAnalysisOptions] = useState({
    academics: false,
    wellbeing: false,
    analytics: false,
  });

  const handleGenerateReport = () => {
    // This is where you'd integrate with your backend service
    // that uses ReportLab to generate the PDF.
    console.log("Generating report with:", {
      title,
      subtitle,
      selectedDataset,
      overallSchoolOptions,
      comparativeAnalysisOptions,
    });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">PDF Report Generator</div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="reportTitle" className="form-label">
                Report Title
              </label>
              <input
                type="text"
                className="form-control"
                id="reportTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reportSubtitle" className="form-label">
                Report Subtitle
              </label>
              <input
                type="text"
                className="form-control"
                id="reportSubtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Data Set</label>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="dataset"
                    id="dataset1"
                    value="Dataset 1"
                    checked={selectedDataset === "Dataset 1"}
                    onChange={() => setSelectedDataset("Dataset 1")}
                  />
                  <label className="form-check-label" htmlFor="dataset1">
                    Data Set 1
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="dataset"
                    id="dataset2"
                    value="Dataset 2"
                    checked={selectedDataset === "Dataset 2"}
                    onChange={() => setSelectedDataset("Dataset 2")}
                  />
                  <label className="form-check-label" htmlFor="dataset2">
                    Data Set 2
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label>Overall School</label>
              <div>
                {["wellbeing", "sentiment", "statistics", "metrics"].map(
                  (option) => (
                    <div key={option} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={option}
                        checked={overallSchoolOptions[option]}
                        onChange={() =>
                          setOverallSchoolOptions((prev) => ({
                            ...prev,
                            [option]: !prev[option],
                          }))
                        }
                      />
                      <label className="form-check-label" htmlFor={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="mb-3">
              <label>Comparative Analysis</label>
              <div>
                {["academics", "wellbeing", "analytics"].map((option) => (
                  <div key={option} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={option}
                      checked={comparativeAnalysisOptions[option]}
                      onChange={() =>
                        setComparativeAnalysisOptions((prev) => ({
                          ...prev,
                          [option]: !prev[option],
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateReport}
            >
              Generate Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reports;
