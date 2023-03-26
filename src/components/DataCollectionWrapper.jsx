import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useState } from "react";
import "./DataCollectionWrapper.css";
import LevelDataCollector from "./LevelDataCollector";

const DataCollectionWrapper = ({ location, level }) => {
  function printDocument() {
    const pdfHolder = document.getElementById("pdfHolder" + level);
    html2canvas(document.getElementById("divToPrint" + level)).then(
      (canvas) => {
        pdfHolder.appendChild(canvas);
      }
    );
  }
  return (
    <div className="parent-wrapper-data-collection">
      <div id={"divToPrint" + level}>
        <LevelDataCollector location={location} BoreLogNumber={level} />
      </div>
      {/* <button
        type={`submit`}
        className="generate-report"
        onClick={printDocument}
        // disabled
      >
        Generate Report
      </button> */}
      <div id={"pdfHolder" + level}></div>
    </div>
  );
};

export default DataCollectionWrapper;
