import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useState } from "react";
import "./DataCollectionWrapper.css";
import LevelDataCollector from "./LevelDataCollector";

function printDocument() {
  const pdfHolder = document.getElementById("pdfHolder");
  html2canvas(document.getElementById("divToPrint")).then((canvas) => {
    pdfHolder.appendChild(canvas);
  });
}

const DataCollectionWrapper = ({ level }) => {
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
      <div id="pdfHolder"></div>
    </div>
  );
};

export default DataCollectionWrapper;
