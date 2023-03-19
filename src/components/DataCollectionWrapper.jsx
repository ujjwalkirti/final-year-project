import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useState } from "react";
import "./DataCollectionWrapper.css";
import LevelDataCollector from "./LevelDataCollector";

const DataCollectionWrapper = ({ level }) => {
  function printDocument() {
    const pdfHolder = document.getElementById("pdfHolder" + level);
    html2canvas(document.getElementById("divToPrint")).then((canvas) => {
      pdfHolder.appendChild(canvas);
    });
  }
  return (
    <div className="parent-wrapper-data-collection">
      <div id="divToPrint">
        <LevelDataCollector BoreLogNumber={level} />
      </div>
      <button
        type={`submit`}
        className="generate-report"
        onClick={printDocument}
        // disabled
      >
        Generate report
      </button>
      <div id={"pdfHolder" + level}></div>
    </div>
  );
};

export default DataCollectionWrapper;
