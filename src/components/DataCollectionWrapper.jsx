import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useState } from "react";
import "./DataCollectionWrapper.css";
import LevelDataCollector from "./LevelDataCollector";

function printDocument() {
  html2canvas(document.getElementById("divToPrint")).then((canvas) => {
    document.body.appendChild(canvas);
  });
}

const DataCollectionWrapper = ({level}) => {
  return (
    <div className="parent-wrapper-data-collection">
      <div id="divToPrint">
        <LevelDataCollector BoreLogNumber={level} />
      </div>
      <button
        type={`submit`}
        className="generate-report"
        onClick={printDocument}
      >
        Generate report
      </button>
    </div>
  );
};

export default DataCollectionWrapper;
