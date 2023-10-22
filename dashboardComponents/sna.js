// Pravin Mark Jayasinghe
// 23/10/2023
// Sna.js
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function Sna() {
  const [selectedDataset, setSelectedDataset] = useState("");
  const [availableJsonFiles, setAvailableJsonFiles] = useState([]);
  const [selectedJsonFile, setSelectedJsonFile] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const svgRef = useRef(null); // Reference for D3 rendering

  const baseUrl = "http://localhost:5002/jan_graphs";

  const fetchAvailableJsonFiles = async () => {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        const files = await response.json();
        setAvailableJsonFiles(files);
      } else {
        console.error("Error fetching JSON files:", response.status);
      }
    } catch (error) {
      console.error("Error fetching JSON files:", error);
    }
  };

  const fetchJsonData = async () => {
    if (!selectedJsonFile) {
      return;
    }

    const jsonUrl = `${baseUrl}/${selectedJsonFile}`;

    try {
      const response = await fetch(jsonUrl);
      if (response.ok) {
        const data = await response.json();
        console.log("Loaded JSON Data:", data); // Log the loaded JSON data
        setJsonData(data);
      } else {
        console.error("Error fetching JSON data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };

  useEffect(() => {
    if (jsonData && svgRef.current) {
      const svg = d3.select(svgRef.current).style("background-color", "#333");
      const width = +svg.attr("width");
      const height = +svg.attr("height");

      // Create a map of node ids to degrees
      const degree = {};
      jsonData.edges.forEach((edge) => {
        degree[edge.source.id] = (degree[edge.source.id] || 0) + 1;
        degree[edge.target.id] = (degree[edge.target.id] || 0) + 1;
      });

      const simulation = d3
        .forceSimulation(jsonData.nodes)
        .force(
          "link",
          d3.forceLink(jsonData.edges).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2));

      svg.selectAll("*").remove();

      const container = svg.append("g");

      const link = container
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(jsonData.edges)
        .join("line");

      const node = container
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(jsonData.nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", (d) => (degree[d.id] > 5 ? "#ff5733" : "#69b3a2")) // Change color based on degree
        .call(drag(simulation));

      node.append("title").text((d) => d.name);

      const labels = container
        .append("g")
        .selectAll("text")
        .data(jsonData.nodes)
        .join("text")
        .attr("dx", 10)
        .attr("dy", ".35em")
        .text((d) => d.name)
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "#fff");

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
      });

      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 10])
        .on("zoom", (event) => container.attr("transform", event.transform));

      svg.call(zoom);
    }
  }, [jsonData]);

  const drag = (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  useEffect(() => {
    fetchAvailableJsonFiles();
  }, []);

  useEffect(() => {
    fetchJsonData();
  }, [selectedJsonFile]);

  return (
    <div className="container">
      <h1 className="my-4 text-danger">Social Network Analysis</h1>

      <div className="mb-3">
        <label htmlFor="dataset-dropdown" className="form-label">
          Select a Dataset
        </label>
        <select
          id="dataset-dropdown"
          className="form-select"
          onChange={(e) => setSelectedDataset(e.target.value)}
          value={selectedDataset}
        >
          <option value="">Select a dataset</option>
          <option value="january">January</option>
          <option value="july">July</option>
        </select>
      </div>

      {selectedDataset === "january" && (
        <div className="mb-3">
          <label htmlFor="json-dropdown" className="form-label">
            Select a JSON File
          </label>
          <select
            id="json-dropdown"
            className="form-select"
            onChange={(e) => setSelectedJsonFile(e.target.value)}
            value={selectedJsonFile}
          >
            <option value="">Select a JSON file</option>
            {availableJsonFiles.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </div>
      )}

      {jsonData && (
        <div className="row mt-4">
          <div className="col-md-12">
            {/* Render the D3 visualization using jsonData */}
            <svg ref={svgRef} width="800" height="600"></svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sna;
