// Pravin Mark Jayasinghe
// 16/10/2023
//uploadData.js

import React, { useState } from "react";

function IndividualUpload({ title, handleFileUpload }) {
  const [file, setFile] = useState(null);

  return (
    <div className="card m-3 p-3 border border-danger border-2 w-100 bg-dark">
      <h1 className="heading mb-2 text-danger">{title}</h1>
      <form onSubmit={(e) => handleFileUpload(e, file)}>
        <input
          type="file"
          className="mb-2 text-danger"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

function DataUpload() {
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUpload = async (e, file) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setUploadStatus(data.message);
  };

  return (
    <div className="container-fluid d-flex">
      <div className="d-flex flex-column w-50">
        <IndividualUpload
          title="Upload Dataset"
          handleFileUpload={handleFileUpload}
        />
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
}

export default DataUpload;
