import React from "react";
import './Heading.css'

const Heading = () => {
  return (
    <div className="heading-parent">
      <p className="heading-title">
        Comparative Study of Bearing Capacity of Soil by different methods from
        different zones of Surat City
      </p>
      <div className="heading-made-by">
        <p>mady by:</p>
        <div className="made-by-name">
          <div>
            <p>Kumar Sundaram</p>
            <p>U19CE005</p>
          </div>

          <div>
            <p>Himanshu Raj</p>
            <p>U19CE007</p>
          </div>

          <div>
            <p>Ujjwal Kirti</p>
            <p>U19CE070</p>
          </div>
        </div>
      </div>
      <div className="heading-guidance">
        <p>under the guidance of:</p>
        <div className="guidance-name">
          <p>Shruti J Shukla Ma'am</p>
          <p>Associate Professor</p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
