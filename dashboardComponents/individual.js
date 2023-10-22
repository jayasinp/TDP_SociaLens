import React, { useEffect, useState } from "react";

function Individual() {
  const [cleanedDatasets, setCleanedDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");
  const [participantIds, setParticipantIds] = useState([]);
  const [selectedParticipantId, setSelectedParticipantId] = useState(""); // Define selectedParticipantId state
  const [individualMetrics, setIndividualMetrics] = useState(null);

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

  // Function to fetch participant IDs for the selected dataset
  const fetchParticipantIds = (selectedDataset) => {
    fetch("http://localhost:5001/api/participant_ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected_dataset: selectedDataset }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (data contains participant IDs)
        setParticipantIds(data);
      })
      .catch((error) => {
        console.error("Error fetching participant IDs:", error);
      });
  };

  // Trigger fetching cleaned datasets on component mount
  useEffect(() => {
    fetchCleanedDatasets();
  }, []);

  // Handle selecting a dataset from the dropdown
  const handleDatasetChange = (event) => {
    const selectedDataset = event.target.value;
    setSelectedDataset(selectedDataset);

    // Fetch participant IDs for the selected dataset
    fetchParticipantIds(selectedDataset);
  };

  // Define the handleParticipantChange function
  const handleParticipantChange = (event) => {
    const selectedId = event.target.value;
    setSelectedParticipantId(selectedId);
    fetchIndividualMetrics();
  };

  // fetch individual metrics
  const fetchIndividualMetrics = () => {
    if (selectedDataset && selectedParticipantId) {
      fetch("http://localhost:5001/api/individual_metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selected_dataset: selectedDataset,
          participant_id: selectedParticipantId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIndividualMetrics(data);
        })
        .catch((error) => {
          console.error("Error fetching individual metrics:", error);
        });
    }
  };

  // Helper function to get the comment based on student's metric and the average metric
  function getComment(studentMetric, averageMetric) {
    if (studentMetric > averageMetric) {
      return "Above Average";
    } else if (studentMetric < averageMetric) {
      return "Below Average";
    } else {
      return "Average";
    }
  }
  // Helper function to add conditional highlighting
  function getCommentClass(studentMetric, averageMetric) {
    if (studentMetric > averageMetric) {
      return "text-success"; // Bootstrap class for green text
    } else if (studentMetric < averageMetric) {
      return "text-danger"; // Bootstrap class for red text
    } else {
      return ""; // No additional class for "Average"
    }
  }

  return (
    <div className="container">
      <h1 className="my-4 text-danger">
        Select a Dataset for Individual Analysis
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
          <div className="col-md-6">
            <h2 className="my-3 text-danger">Selected Dataset Information</h2>
            <p>You have selected the dataset: {selectedDataset}</p>
            <div className="mb-3">
              <label htmlFor="participant-dropdown" className="form-label">
                Select Participant ID
              </label>
              <select
                id="participant-dropdown"
                className="form-select"
                onChange={handleParticipantChange}
                value={selectedParticipantId}
              >
                <option value="" disabled>
                  Choose a Participant ID
                </option>
                {participantIds.map((participantId) => (
                  <option key={participantId} value={participantId}>
                    {participantId}
                  </option>
                ))}
              </select>
              {individualMetrics && (
                <div className="row mt-5">
                  <div className="col-md-6">
                    <h2 className="my-3 text-danger">Individual Metrics</h2>
                    <table className="table table-bordered table-hover text-danger">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Perc_Effort</th>
                          <th scope="col">Perc_Academic</th>
                          <th scope="col">Attendance</th>
                          <th scope="col">CompleteYears</th>
                          <th scope="col">House</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Student</th>
                          <td>{individualMetrics.Perc_Effort}</td>
                          <td>{individualMetrics.Perc_Academic}</td>
                          <td>{individualMetrics.Attendance}</td>
                          <td>{individualMetrics.CompleteYears}</td>
                          <td>{individualMetrics.House}</td>
                        </tr>
                        <tr>
                          <th scope="row">Average (All Participants)</th>
                          <td>
                            {individualMetrics.Average_Perc_Effort.toFixed(2)}
                          </td>
                          <td>
                            {individualMetrics.Average_Perc_Academic.toFixed(2)}
                          </td>
                          <td>
                            {individualMetrics.Average_Attendance.toFixed(2)}
                          </td>
                          <td>
                            {individualMetrics.Average_CompleteYears.toFixed(2)}
                          </td>
                          <td></td> {/* Empty cell for House metric average */}
                        </tr>
                        <tr>
                          <th scope="row">Comment</th>
                          <td
                            className={getCommentClass(
                              individualMetrics.Perc_Effort,
                              individualMetrics.Average_Perc_Effort
                            )}
                          >
                            {getComment(
                              individualMetrics.Perc_Effort,
                              individualMetrics.Average_Perc_Effort
                            )}
                          </td>
                          <td
                            className={getCommentClass(
                              individualMetrics.Perc_Academic,
                              individualMetrics.Average_Perc_Academic
                            )}
                          >
                            {getComment(
                              individualMetrics.Perc_Academic,
                              individualMetrics.Average_Perc_Academic
                            )}
                          </td>
                          <td
                            className={getCommentClass(
                              individualMetrics.Attendance,
                              individualMetrics.Average_Attendance
                            )}
                          >
                            {getComment(
                              individualMetrics.Attendance,
                              individualMetrics.Average_Attendance
                            )}
                          </td>
                          <td
                            className={getCommentClass(
                              individualMetrics.CompleteYears,
                              individualMetrics.Average_CompleteYears
                            )}
                          >
                            {getComment(
                              individualMetrics.CompleteYears,
                              individualMetrics.Average_CompleteYears
                            )}
                          </td>
                          <td></td> {/* Empty cell for House metric comment */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Individual;
