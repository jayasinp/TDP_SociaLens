// correlations.js
import DropDown from "@/hoc/dropDown";
import React from "react";
import '../styles/Dashboard.module.css'

function Correlations() {
  return (
    <div className="container-fluid d-flex">
    <div className="d-flex flex-column w-50">
    <div className="card m-3 p-3 border border-danger border-2 w-100">
      <h1 className="heading mb-2 text-danger">Select Class</h1>
      <div className="mb-2 mt-2"><DropDown/></div>
      <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
      <label class="form-check-label text-danger" for="flexCheckDefault">
      Compare Data
      </label>
    </div>
    </div>
    <div className="d-flex m-3 flex-column">
    <div className="card m-3 p-3 border border-danger border-2 w-100 correlations-matrix-container">
      Correlation matrix of factors
    </div>
    </div>
    </div>
  </div>
  );
}

export default Correlations;
