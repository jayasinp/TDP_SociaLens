import React, { useState } from "react";

function Deidentify() {
  const [message, setMessage] = useState("");

  const handleDeidentify = () => {
    fetch("http://localhost:5001/api/deidentify_data", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error deidentifying data:", error);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="container-fluid d-flex">
      <div className="d-flex flex-column w-50">
        <div className="card m-3 p-3 border border-danger border-2 w-100 bg-dark">
          <h1 className="heading mb-2 text-danger">Deidentify Data</h1>

          <button className="btn btn-danger" onClick={handleDeidentify}>
            Deidentify Data
          </button>
          {message && <p className="mt-3 text-danger">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Deidentify;
