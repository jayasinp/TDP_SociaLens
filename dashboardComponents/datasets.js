// Pravin Mark Jayasinghe
// 19/10/2023
// datasets.js
// allows the user to view and process datasets
import React, { useEffect, useState } from "react";

function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [dataframesData, setDataframesData] = useState([]); // State to store dataframes data
  const [cleanedDataframesNames, setCleanedDataframesNames] = useState([]);

  // Function to handle cleaning and validation
  const handleCleanValidateData = () => {
    // Extract the list of filenames from the datasets state
    const fileNames = datasets.map((dataset) => dataset);

    // Send the list of filenames to the backend for cleaning and validation
    fetch("http://localhost:5001/api/clean_validate_data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_names: fileNames }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        console.log(data);
        // You can update the state or show a success message here
      });
  };

  // Function to handle fetching cleaned dataframes names
  const handleShowCleanedDataframes = () => {
    fetch("http://localhost:5001/api/cleaned_datasets_dataframes")
      .then((response) => response.json())
      .then((data) => {
        // Store the cleaned dataframes names in the state variable
        setCleanedDataframesNames(data.cleaned_dataframes_names);
      });
  };

  // get the uploaded dataset information from the backend
  useEffect(() => {
    fetch("http://localhost:5001/api/uploaded_datasets")
      .then((response) => response.json())
      .then((data) => setDatasets(data.uploaded_datasets));
  }, []);

  // get the uploaded dataframe information from the backend
  const handleShowDataframes = () => {
    fetch("http://localhost:5001/api/uploaded_datasets_dataframes")
      .then((response) => response.json())
      .then((data) => {
        // Store the dataframes data in the state variable
        setDataframesData(data);
      });
  };

  // Visual elements on the page
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="m-3 p-3 border border-danger border-2 w-100 bg-dark">
            <h1 className="heading mb-2 text-danger">Uploaded Data Sets</h1>
            <button onClick={handleShowDataframes} className="btn btn-danger">
              Show Dataframes
            </button>
            {datasets.length > 0 &&
              datasets.map((dataset, index) => (
                <div
                  key={dataset}
                  className="card m-3 p-3 border border-danger border-2 bg-dark"
                >
                  <h5 className="text-danger">{dataset}</h5>
                </div>
              ))}
            <button
              className="btn btn-warning mt-2 text-danger"
              onClick={handleCleanValidateData}
            >
              Clean and Validate Data
            </button>

            {/* Button to show cleaned dataframes */}
            <button
              className="btn btn-danger mt-2"
              onClick={handleShowCleanedDataframes}
            >
              Show Cleaned Dataframes
            </button>
          </div>
        </div>

        {/* Display dataframes data */}
        <div className="col-md-6">
          <div className="card m-3 p-3 border border-danger rounded bg-dark">
            <div className="card-header bg-dark text-danger">
              <h2 className="card-title">Dataframes In Processor Queue</h2>
            </div>
            <div className="card-body bg-dark text-danger">
              <pre>{JSON.stringify(dataframesData, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datasets;
