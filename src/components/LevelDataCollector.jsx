import React, { useState } from "react";
import "./LevelDataCollection.css";
const LevelDataCollector = ({ BoreLogNumber }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Site Information</p>
          <span>Bore log: {BoreLogNumber}</span>
          <span>
            D<sub>f</sub>:
            <input type={`number`} required />
          </span>
          <span>
            α (Inclination of a load to the vertical) :{" "}
            <input type={`text`} required />
          </span>
        </div>
        <div>
          <span>
            SPT Value: <input type={`number`} required />
          </span>
          <span>
            {" "}
            γ: <input type={`number`} required />
          </span>
          <span>
            G: <input type={`number`} required />
          </span>
          <span>
            e: <input type={`number`} required />
          </span>
          <span>
            γ<sup>'</sup> = γ<sub>w</sub>*(G-1)/(1+e) =
            <input type={`number`} required />
          </span>
          <span>
            Overburden Pressure (q) : (γ<sup>'</sup>*D)/100 ={" "}
          </span>
          <span>
            N: <input type={`number`} required />
          </span>
          <span>
            Φ: <input type={`number`} required />
          </span>
        </div>
        <p>Assumptions</p>
        <div>
          <div>
            Width of foundation (B) = <span>200cm</span>
          </div>
          <div>
            Depth of foundation below Ground Level (D<sub>f</sub>) ={" "}
            <span>200cm</span>
          </div>
          <div>
            Length of foundation (l) = <span>200cm</span>
          </div>
          <div>Shape of base ={">"} Square</div>
        </div>
        <div>
          <label>Is water table found?</label>
          {/* add radio button here to select yes or no and then decide value of Dw */}
          <p>
            D<sub>w</sub> (Not found) = 1.0
          </p>
        </div>
        <div>
          Factor of Safety (based on the type of soil, like for sand it is 3):
          <input type={`number`} required />
        </div>
      </form>
    </div>
  );
};

export default LevelDataCollector;
