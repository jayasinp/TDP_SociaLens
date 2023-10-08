// individual.js
import DropDown from "@/hoc/dropDown";
import React from "react";

function Individual() {
  return (
    <div className="container-fluid d-flex">
      <div className="d-flex flex-column w-50">
      <div className="card m-3 p-3 border border-danger border-2 w-100">
        <h1 className="heading mb-2 text-danger">Select Node</h1>
        <div className="mb-2 mt-2"><DropDown/></div>
      </div>
      <div className="d-flex m-3 flex-column">
        <div className="h3 mb-4">STUDENT NAME OR PARTICIPANT ID HOUSE</div><br/><br/>
        <div className="h5">Academic Performance:x%</div>
        <div className="h5">Psychological well being:x%</div>
        <div className="h5">Sociability:x%</div>
        <div className="h5">Number of Friends:5</div>
        <div className="h5">Extra-Curriculars:x%</div>
      </div>
      </div>
      <div className="graph-container p-3 mx-3">
        <div className="apache-graph-holder card border border-danger border-2">apache graph display</div>
      </div>
    </div>
  );
}

export default Individual;
