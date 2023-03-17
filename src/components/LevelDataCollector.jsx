import React, { useState } from "react";
import { ISCodeValues } from "../data";
import "./LevelDataCollection.css";





const LevelDataCollector = ({ BoreLogNumber }) => {
  const [Df, setDf] = useState(0);
  const [inclinationToVertical, setInclinationToVertical] = useState(0);
  const [spt, setSpt] = useState(0);
  const [unitWeight, setUnitWeight] = useState(0);
  const [specificGravity, setSpecificGravity] = useState(0);
  const [voidRatio, setVoidRatio] = useState(0);
  const [submergedUnitWeight, setSubmergedUnitWeight] = useState(
    (unitWeight * (specificGravity - 1)) / (1 + voidRatio)
  );
  const [overBurdenPressure, setOverBurdenPressure] = useState(
    (submergedUnitWeight * Df) / 100
  );
  const [NValue, setNValue] = useState(0);
  const [phi, setPhi] = useState(0);
  const [Dw, setDw] = useState(0);
  const [Nphi, setNphi] = useState(Math.tan(Math.PI / 4 + phi / 2));
  const [bearingCapacityFactors, setBearingCapacityFactors] = useState(
    ISCodeValues.get(phi)
  );

  const [shapeFactors, setShapeFactors] = useState({
    sc: 1 + (0.2 * 200) / 200,
    sq: 1 + (0.2 * 200) / 200,
    sy: 1 + (0.4 * 200) / 200,
  });

  const [depthFactors, setDepthFactors] = useState({
    dc: 1 + 0.2 * (Df / 200) * Math.sqrt(Nphi),
    dq: phi < 10 ? 1 : 1 + 0.1 * (Df / 200) * Math.sqrt(Nphi),
    dy: phi < 10 ? 1 : 1 + 0.1 * (Df / 200) * Math.sqrt(Nphi),
  });

  const [inclinationFactors, setInclinationFactors] = useState({
    ic: Math.pow(1 - inclinationToVertical / 90, 2),
    iq: Math.pow(1 - inclinationToVertical / 90, 2),
    iy: Math.pow(1 - inclinationToVertical / phi, 2),
  });

  const [waterTableFactor, setWaterTableFactor] = useState(0);

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
        <div>
          <p>
            Calculating N<sub>Φ</sub> , using the following formula:
            <br />
            <span>
              N<sub>Φ</sub> = tan<sup>2</sup>(π/4 + Φ/2) =
            </span>
          </p>
        </div>
        {/* add div for calculating Nc,Nq and Ny */}
        <div></div>
        {/* div for caluclating shape factor */}
        <div>
          <p>
            Since we have assumed the shape of base to be square, the shape
            factors are:
          </p>
          <div>
            <span>
              s<sub>c</sub>: 1 + 0.2*B/L ={" "}
            </span>
            <span>
              s<sub>q</sub>: 1 + 0.2*B/L =
            </span>
            <span>
              s<sub>γ</sub>: 1 - 0.4*B/L =
            </span>
          </div>
        </div>
        {/* div for calculating depth factor */}
        <div>
          <span>
            d<sub>c</sub> = 1 + 0.2*(D<sub>f</sub>/B)*
            <span>&#8730;</span>
            <span style={{ borderTop: "1px solid black" }}>
              N<sub>Φ</sub>
            </span>{" "}
            =
          </span>
          <span>
            if Φ {"<"} 10<sup>o</sup>
            <br />
            &emsp; d<sub>q</sub> = d<sub>γ</sub> = 1 <br />
            if Φ {">"} 10<sup>o</sup>
            <br />
            &emsp; d<sub>q</sub> = d<sub>γ</sub> = 1 + 0.1*(D<sub>f</sub>/B)*{" "}
            <span>&#8730;</span>
            <span style={{ borderTop: "1px solid black" }}>
              N<sub>Φ</sub>
            </span>{" "}
            =
          </span>
        </div>
        {/* div for calculating inclination factor */}
        <div>
          <span>
            i<sub>c</sub> = i<sub>q</sub> = (1- α/90)<sup>2</sup> =
          </span>
          <span>
            i<sub>γ</sub> = (1 - α/Φ)<sup>2</sup> =
          </span>
        </div>
        {/* div for calculating effect of water table */}
        <div>
          <p>
            Read the following cases and choose the one which best suits your
            case:
          </p>
          {/* change the following options to radio buttons */}
          <span>
            Is water table likely to permanently remain at or below a depth of
            (D<sub>f</sub> + B) beneath the ground level surrounding the
            footing?
          </span>
          <span>
            Is water table located at a depth D<sub>f</sub> or likey to rise to
            the base of the footing or above?
          </span>

          <span>
            Is the water table likely to permanent get located at depth lying
            between D<sub>f</sub> and (D<sub>f</sub> + B)?
          </span>
        </div>
        <div>
          <p>
            Ultimate net Bearing Capacity (q<sub>d</sub>):
          </p>
          <p>We use the following formula:</p>
          <p>
            q*(N<sub>q</sub>-1)*S<sub>q</sub>*d<sub>q</sub>*i<sub>q</sub>
            +1/2*B*γ*N<sub>γ</sub>*S<sub>γ</sub>*d<sub>γ</sub>*i<sub>γ</sub>*W
            <sup>'</sup>
          </p>
        </div>
        <div>
          Net Safe Bearing Capacity (NSBC) : q<sub>d</sub>/3 ={" "}
        </div>
        <div>
          <p>Safe Bearing Capacity (SBC) : NSBC + q =</p>
        </div>
        <input type={`submit`} value="Calculate Bearing Capacity" />
      </form>
    </div>
  );
};

export default LevelDataCollector;
