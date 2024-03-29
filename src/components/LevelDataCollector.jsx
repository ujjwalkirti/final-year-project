import React, { useEffect, useState } from "react";
import {
  factorsOfSafety,
  ISCodeValues,
  meyerHoffValues,
  terzaghiValues,
} from "../data";
import "./LevelDataCollection.css";

function degreeToRadians(degree) {
  return (degree * Math.PI) / 180;
}

function roundTo(n, digits) {
  var negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(digits);
  if (negative) {
    n = (n * -1).toFixed(digits);
  }
  // console.log(parseFloat(n));
  return parseFloat(n);
}

function calculateNetBearingCapacity(
  phi,
  inclinationToVertical,
  c,
  Nc,
  sc,
  ic,
  dc,
  q,
  Nq,
  sq,
  dq,
  iq,
  y,
  Ny,
  sy,
  dy,
  iy,
  W,
  Df,
  methodOfCalculation
) {
  if (methodOfCalculation === "iscode") {
    return (
      c * Nc * sc * ic * dc +
      q * (Nq - 1) * sq * dq * iq +
      0.5 * 2 * y * Ny * sy * dy * iy * W
    );
  } else if (methodOfCalculation === "terzaghi") {
    console.log(
      // [sc, sq, sy],
      // [dc, dq, dy],
      // [ic, iq, iy],
      [Nc, Nq, Ny]
      // { c: c },
      // { Df: Df },
      // { y: y }
    );
    return 1.3 * c * Nc + y * Df * Nq + 0.4 * 2 * y * Ny;
  } else {
    // recalculating bearing capacity factors for MeyerHoff's method
    // let Nphi = Math.pow(Math.tan(Math.PI / 4 + degreeToRadians(phi) / 2), 2);
    // Nq = Nphi * Math.pow(2.71, Math.PI * Math.tan(degreeToRadians(phi)));
    // Nc = (1 / Math.tan(degreeToRadians(phi))) * (Nq - 1);
    // Ny = [Math.tan(degreeToRadians(1.4 * phi))] * (Nq - 1);
    // Shape factors for the MeyerHoff's method
    // sc = 1 + 0.2 * Nphi;
    // if (phi === 0) {
    //   sq = sy = 1;
    // } else if (phi >= 10) {
    //   sq = sy = 1 + 0.1 * Nphi;
    // }
    // Depth factors
    // dc = 1 + 0.2 * ((Df / 2) * Math.pow(Nphi, 1 / 2));
    // if (phi == 0) {
    //   dq = dy = 1;
    // } else if (phi > 10) {
    //   dq = dy = 1 + 0.1 * (Df / 2) * Math.pow(Nphi, 1 / 2);
    // }
    //inclination factor
    // ic = iq = 1 - inclinationToVertical / 90;
    // iy = Math.pow(1 - inclinationToVertical / phi, 2);
    // console.log(
    // [sc, sq, sy],
    //   [dc, dq, dy],
    //   [ic, iq, iy],
    // [Nc, Nq, Ny, "meyerhoff"]
    //   { c: c },
    //   { Df: Df },
    //   { y: y },
    //   {
    //     bearing_capacity:
    //       (c * Nc * sc * dc * ic +
    //         y * Df * Nq * sq * dq * iq +
    //         0.5 * y * 2 * Ny * sy * dy * iy) /
    //       30,
    //   }
    // );
    return c * Nc + y * Df * Nq + 0.5 * y * 2 * Ny;
  }
}

function interpolateValues(
  upperbound,
  lowerbound,
  phi,
  upperValue,
  lowerValue
) {
  return (
    ((upperValue - lowerValue) * (phi - lowerbound)) /
      (upperbound - lowerbound) +
    lowerValue
  );
}

function calculateBearingCapacityFactors(phi, typeOfCalculation) {
  let upperbound = 0;
  let lowerbound = 0;
  let multipleOfTen = parseInt(phi / 10, 10);
  lowerbound = multipleOfTen * 10;
  upperbound = lowerbound + 5;
  if (
    upperbound % 5 === 0 &&
    lowerbound % 5 === 0 &&
    lowerbound <= 50 &&
    upperbound <= 50
  ) {
    let lowerValues = { Nc: 0, Nq: 0, Ny: 0 };
    let higherValues = { Nc: 0, Nq: 0, Ny: 0 };
    if (typeOfCalculation === "iscode") {
      lowerValues = ISCodeValues.get(lowerbound);
      higherValues = ISCodeValues.get(upperbound);
    } else if (typeOfCalculation === "terzaghi") {
      lowerValues = terzaghiValues.get(lowerbound);
      higherValues = terzaghiValues.get(upperbound);
    } else {
      lowerValues = meyerHoffValues.get(lowerbound);
      higherValues = meyerHoffValues.get(upperbound);
    }
    // console.log(lowerValues, higherValues, phi, multipleOfTen);
    const Nc = interpolateValues(
      upperbound,
      lowerbound,
      phi,
      higherValues.Nc,
      lowerValues.Nc
    );
    const Nq = interpolateValues(
      upperbound,
      lowerbound,
      phi,
      higherValues.Nq,
      lowerValues.Nq
    );
    const Ny = interpolateValues(
      upperbound,
      lowerbound,
      phi,
      higherValues.Ny,
      lowerValues.Ny
    );
    return { Nc, Nq, Ny };
  } else {
    return { Nc: 0, Nq: 0, Ny: 0 };
  }
}

const LevelDataCollector = ({ location, BoreLogNumber }) => {
  const [Df, setDf] = useState(0);
  const [inclinationToVertical, setInclinationToVertical] = useState(0);
  const [spt, setSpt] = useState(0);
  const [unitWeight, setUnitWeight] = useState(0);
  const [specificGravity, setSpecificGravity] = useState(0);
  const [voidRatio, setVoidRatio] = useState(0);
  const [submergedUnitWeight, setSubmergedUnitWeight] = useState(
    specificGravity !== 0
      ? roundTo((9.81 * (specificGravity - 1)) / (1 + voidRatio), 3)
      : 0
  );
  const [overBurdenPressure, setOverBurdenPressure] = useState(
    submergedUnitWeight * Df
  );
  const [NValue, setNValue] = useState(0);
  const [phi, setPhi] = useState(0);
  const [cohesion, setCohesion] = useState(0);
  const [FOS, setFOS] = useState(factorsOfSafety.get("sandy"));
  const [Nphi, setNphi] = useState(
    Math.pow(Math.tan(Math.PI / 4 + degreeToRadians(phi) / 2), 2)
  );
  const [bearingCapacityFactors, setBearingCapacityFactors] = useState(
    calculateBearingCapacityFactors(phi, "iscode")
  );

  const [shapeFactors, setShapeFactors] = useState({
    sc: 1.3,
    sq: 1.2,
    sy: 0.8,
  });

  const [depthFactors, setDepthFactors] = useState({
    dc: 1 + 0.2 * (Df / 2) * Math.sqrt(Nphi),
    dq: phi < 10 ? 1 : 1 + 0.1 * (Df / 2) * Math.sqrt(Nphi),
    dy: phi < 10 ? 1 : 1 + 0.1 * (Df / 2) * Math.sqrt(Nphi),
  });

  const [inclinationFactors, setInclinationFactors] = useState({
    ic: Math.pow(1 - inclinationToVertical / 90, 2),
    iq: Math.pow(1 - inclinationToVertical / 90, 2),
    iy: Math.pow(1 - inclinationToVertical / phi, 2),
  });

  const [waterTableFactor, setWaterTableFactor] = useState(1);
  const [additionalInputFactor, setAdditionalInputFactor] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [changedOnce, setChangedOnce] = useState(false);
  const [terzaghiFactors, setTerzaghiFactors] = useState(
    calculateBearingCapacityFactors(phi, "terzaghi")
  );
  const [meyerHoffFactors, setMeyerHoffFactors] = useState(
    calculateBearingCapacityFactors(phi, "meyerhoff")
  );

  useEffect(() => {
    if (changedOnce) {
      setSubmergedUnitWeight(
        specificGravity !== 0
          ? roundTo((9.81 * (specificGravity - 1)) / (1 + voidRatio), 3)
          : 0
      );
      setOverBurdenPressure(submergedUnitWeight * Df);
      setNphi(Math.pow(Math.tan(Math.PI / 4 + degreeToRadians(phi) / 2), 2));
      setBearingCapacityFactors(calculateBearingCapacityFactors(phi, "iscode"));
      setTerzaghiFactors(calculateBearingCapacityFactors(phi, "terzaghi"));
      setMeyerHoffFactors(calculateBearingCapacityFactors(phi, "meyerhoff"));
      // console.log(bearingCapacityFactors);
      setDepthFactors({
        dc: 1 + 0.2 * (Df / 2) * Math.sqrt(Nphi),
        dq: phi < 10 ? 1 : 1 + 0.1 * (Df / 2) * Math.sqrt(Nphi),
        dy: phi < 10 ? 1 : 1 + 0.1 * (Df / 2) * Math.sqrt(Nphi),
      });
      setInclinationFactors({
        ic: Math.pow(1 - inclinationToVertical / 90, 2),
        iq: Math.pow(1 - inclinationToVertical / 90, 2),
        iy: Math.pow(1 - inclinationToVertical / phi, 2),
      });
    } else {
      setChangedOnce(true);
    }
  }, [
    Df,
    inclinationToVertical,
    spt,
    unitWeight,
    specificGravity,
    voidRatio,
    NValue,
    phi,
    cohesion,
  ]);

  return (
    <div className="parent">
      <form onSubmit={handleSubmit}>
        <div className="site-info">
          <p className="info-title">{location} - Site Information</p>
          <p className="info-title">Using IS:6403, 1981 Code Methdod</p>
          {/* <span>Bore log: {BoreLogNumber}</span> */}
          <span>
            D<sub>f</sub>:
            <input
              type={`number`}
              required
              value={Df}
              onChange={(e) => {
                setDf(parseFloat(e.target.value));
              }}
            />
          </span>
          <span>
            α (Inclination of a load to the vertical) :{" "}
            <input
              type={`number`}
              required
              // value={inclinationToVertical}
              onChange={(e) => {
                setInclinationToVertical(
                  degreeToRadians(parseFloat(e.target.value))
                );
              }}
            />
          </span>
        </div>
        <div className="site-info">
          <span>
            SPT Value:{" "}
            <input
              type={`number`}
              required
              value={spt}
              onChange={(e) => {
                setSpt(parseFloat(e.target.value));
              }}
            />
          </span>
          <span>
            {" "}
            γ (Unit Weight of soil):{" "}
            <input
              type={`number`}
              required
              placeholder="Please enter the value in kg/m^3"
              onChange={(e) => {
                setUnitWeight(parseFloat(e.target.value));
              }}
            />
          </span>
          <span>
            G (Specific Gravity for soil):{" "}
            <input
              type={`number`}
              required
              value={specificGravity}
              onChange={(e) => {
                setSpecificGravity(parseFloat(e.target.value));
              }}
            />
          </span>
          <span>
            e (void ration of soil):{" "}
            <input
              type={`number`}
              required
              value={voidRatio}
              onChange={(e) => {
                // console.log(voidRatio);
                setVoidRatio(parseFloat(e.target.value));
              }}
            />
          </span>
          <span className="">
            γ<sup>'</sup> (submerged unit weight of soil) = γ<sub>w</sub>
            *(G-1)/(1+e) = {submergedUnitWeight} KN/m<sup>3</sup>
          </span>
          <span>
            Overburden Pressure (q) : (γ<sup>'</sup>*D) ={" "}
            {roundTo(overBurdenPressure, 3)} KN/m<sup>2</sup>
          </span>
          <span>
            N:{" "}
            <input
              type={`number`}
              required
              value={NValue}
              onChange={(e) => setNValue(parseFloat(e.target.value))}
            />
          </span>
          <span>
            Φ (Angle of cohesion):{" "}
            <input
              type={`number`}
              required
              value={phi}
              placeholder="Enter the value in degrees"
              onChange={(e) => setPhi(parseInt(e.target.value))}
            />
          </span>
          <span>
            C (Cohesion):
            <input
              type={`number`}
              required
              placeholder="Please enter the unit as KN/m^2"
              onChange={(e) => {
                setCohesion(parseFloat(e.target.value));
              }}
            />
          </span>
        </div>
        <p className="info-title">Assumptions</p>
        <div className="site-info">
          <div>
            Width of foundation (B) = <span>2 m</span>
          </div>
          <div>
            Depth of foundation below Ground Level (D<sub>f</sub>) ={" "}
            <span>{Df} m</span>
          </div>
          <div>
            Length of foundation (l) = <span>2 m</span>
          </div>
          <div>Shape of base ={">"} Square</div>
        </div>

        <div className="site-fos-selection">
          <strong>Factor of Safety</strong> (based on the type of soil, like for
          sand it is 3):
          <select
            name="soil-type"
            id="soilType"
            placeholder="Select soil type"
            onChange={(e) => {
              switch (e.target.value) {
                case "sandy":
                  setFOS(factorsOfSafety.get("sandy"));
                  break;
                case "silty":
                  setFOS(factorsOfSafety.get("silty"));
                  break;
                case "clayey":
                  setFOS(factorsOfSafety.get("clayey"));
                  break;
              }
            }}
          >
            <option value="sandy">Sandy</option>
            <option value="silty">Silty</option>
            <option value="clayey">Clayey</option>
          </select>
        </div>
        <div className="site-info">
          <p>
            Calculating N<sub>Φ</sub> , using the following formula:
            <br />
          </p>
          <span className="nphi-formula bearing-capacity-formula">
            N<sub>Φ</sub> = tan<sup>2</sup>(π/4 + Φ/2) = {roundTo(Nphi, 3)}
          </span>
        </div>
        {/* add div for calculating Nc,Nq and Ny */}
        <div className="site-info">
          <span className="shear-params">
            &emsp; N<sub>c</sub> = {roundTo(bearingCapacityFactors.Nc, 3)}
            <br />
            &emsp; N<sub>q</sub> = {roundTo(bearingCapacityFactors.Nq, 3)}
            <br />
            &emsp; N<sub>γ</sub> = {roundTo(bearingCapacityFactors.Ny, 3)}
          </span>
        </div>
        {/* div for caluclating shape factor */}
        <div className="site-info shape-factors">
          <p>
            Since we have assumed the shape of base to be square, the shape
            factors are:
          </p>
          <div>
            <span>
              s<sub>c</sub>: 1 + 0.2*B/L = {shapeFactors.sc}
            </span>
            <span>
              s<sub>q</sub>: 1 + 0.2*B/L = {shapeFactors.sq}
            </span>
            <span>
              s<sub>γ</sub>: 1 - 0.4*B/L = {shapeFactors.sy}
            </span>
          </div>
        </div>
        {/* div for calculating depth factor */}
        <div className="site-info depth-factor">
          <p>For calculating the depth factor</p>
          <span className="formula">
            d<sub>c</sub> = 1 + 0.2*(D<sub>f</sub>/B)*
            <span>&#8730;</span>
            <span style={{ borderTop: "1px solid black" }}>
              N<sub>Φ</sub>
            </span>{" "}
            = {depthFactors.dc}
          </span>
          <span className="">
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
            = {depthFactors.dq}
          </span>
        </div>
        {/* div for calculating inclination factor */}
        <div className="site-info inclination-factor">
          <p>For Calculating inclination Factor,</p>
          <span className="formula">
            i<sub>c</sub> = i<sub>q</sub> = (1- α/90)<sup>2</sup> ={" "}
            {inclinationFactors.ic}
          </span>
          {isNaN(inclinationFactors.iy) ? (
            <span className="formula">
              i<sub>γ</sub> will be calcuated automatically if there is valid
              vale of Φ.
            </span>
          ) : (
            <span className="formula">
              i<sub>γ</sub> = (1 - α/Φ)<sup>2</sup> = {inclinationFactors.iy}
            </span>
          )}
        </div>
        {/* div for calculating effect of water table */}
        <div className="water-table-factor">
          <p>
            Read the following cases and choose the one which best suits your
            case:
          </p>
          {/* change the following options to radio buttons */}
          <span>
            <input
              type={`checkbox`}
              checked={waterTableFactor === 1}
              id="option1"
              onChange={(e) => {
                if (e.target.checked) {
                  setWaterTableFactor(1);
                  setAdditionalInputFactor(false);
                }
              }}
            />
            <label htmlFor="option1">
              Is water table likely to permanently remain at or below a depth of{" "}
              {Df + 2} mts (D<sub>f</sub> + B) beneath the ground level
              surrounding the footing?
            </label>
          </span>
          <span>
            <input
              type={`checkbox`}
              id="option2"
              checked={waterTableFactor === 0.5}
              onChange={(e) => {
                if (e.target.checked) {
                  setWaterTableFactor(0.5);
                  setAdditionalInputFactor(false);
                }
              }}
            />
            <label htmlFor="option2">
              Is water table located at a depth {Df} mts (D<sub>f</sub>) or
              likey to rise to the base of the footing or above?
            </label>
          </span>
          <span className="additional-input-factor">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type={`checkbox`}
                id="option3"
                checked={waterTableFactor !== 1 && waterTableFactor !== 0.5}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAdditionalInputFactor(true);
                    setWaterTableFactor(NaN);
                  }
                }}
              />
              <label htmlFor="option3">
                Is the water table likely to permanent get located at depth
                lying between {Df} (D<sub>f</sub>) and {Df + 2} mts (D
                <sub>f</sub> + B)?
              </label>
            </div>
            <div>
              {additionalInputFactor && (
                <input
                  type={`number`}
                  required
                  style={{ width: "80%" }}
                  placeholder="Please enter the depth in centimetres"
                  onChange={(e) => {
                    let local_water_table_factor = 0;
                    local_water_table_factor =
                      (Df - parseInt(e.target.value, 10)) / 4 + 1;
                    setWaterTableFactor(local_water_table_factor);
                  }}
                />
              )}
            </div>
          </span>
          {!isNaN(waterTableFactor) && (
            <div className="water-table-factor-value">
              W<sup>'</sup>= {waterTableFactor}
            </div>
          )}
        </div>
        <div className="site-info">
          <p>
            Ultimate net Bearing Capacity (q<sub>d</sub>):
          </p>
          <p>We use the following formula:</p>
          <p className="bearing-capacity-formula">
            q<sub>d</sub> = C*N<sub>c</sub>*s<sub>c</sub>*d<sub>c</sub>*i
            <sub>c</sub>+q*(N
            <sub>q</sub>-1)*S<sub>q</sub>*d<sub>q</sub>*i<sub>q</sub>
            +1/2*B*γ*N<sub>γ</sub>*S<sub>γ</sub>*d<sub>γ</sub>*i<sub>γ</sub>*W
            <sup>'</sup>{" "}
            {isNaN(
              calculateNetBearingCapacity(
                phi,
                inclinationToVertical,
                cohesion,
                bearingCapacityFactors.Nc,
                shapeFactors.sc,
                inclinationFactors.ic,
                depthFactors.dc,
                overBurdenPressure,
                bearingCapacityFactors.Nq,
                shapeFactors.sq,
                depthFactors.dq,
                inclinationFactors.iq,
                unitWeight,
                bearingCapacityFactors.Ny,
                shapeFactors.sy,
                depthFactors.dy,
                inclinationFactors.iq,
                waterTableFactor,
                Df,
                "iscode"
              )
            )
              ? ""
              : "= " +
                roundTo(
                  calculateNetBearingCapacity(
                    phi,
                    inclinationToVertical,
                    cohesion,
                    bearingCapacityFactors.Nc,
                    shapeFactors.sc,
                    inclinationFactors.ic,
                    depthFactors.dc,
                    overBurdenPressure,
                    bearingCapacityFactors.Nq,
                    shapeFactors.sq,
                    depthFactors.dq,
                    inclinationFactors.iq,
                    unitWeight,
                    bearingCapacityFactors.Ny,
                    shapeFactors.sy,
                    depthFactors.dy,
                    inclinationFactors.iq,
                    waterTableFactor,
                    Df,
                    "iscode"
                  ) / 10,
                  3
                )}{" "}
            ton/m<sup>2</sup>
          </p>
        </div>
        {isNaN(
          calculateNetBearingCapacity(
            phi,
            inclinationToVertical,
            cohesion,
            bearingCapacityFactors.Nc,
            shapeFactors.sc,
            inclinationFactors.ic,
            depthFactors.dc,
            overBurdenPressure,
            bearingCapacityFactors.Nq,
            shapeFactors.sq,
            depthFactors.dq,
            inclinationFactors.iq,
            unitWeight,
            bearingCapacityFactors.Ny,
            shapeFactors.sy,
            depthFactors.dy,
            inclinationFactors.iq,
            waterTableFactor,
            Df,
            "iscode"
          )
        ) ? (
          ""
        ) : (
          <div className="site-info">
            <div>
              <strong>Net Safe Bearing Capacity (NSBC)</strong> : q<sub>d</sub>/
              {FOS} ={" "}
              <strong>
                {roundTo(
                  calculateNetBearingCapacity(
                    phi,
                    inclinationToVertical,
                    cohesion,
                    bearingCapacityFactors.Nc,
                    shapeFactors.sc,
                    inclinationFactors.ic,
                    depthFactors.dc,
                    overBurdenPressure,
                    bearingCapacityFactors.Nq,
                    shapeFactors.sq,
                    depthFactors.dq,
                    inclinationFactors.iq,
                    unitWeight,
                    bearingCapacityFactors.Ny,
                    shapeFactors.sy,
                    depthFactors.dy,
                    inclinationFactors.iq,
                    waterTableFactor,
                    Df,
                    "iscode"
                  ) /
                    (10 * FOS),
                  3
                )}{" "}
                ton/m<sup>2</sup>
              </strong>
            </div>
            {/* <div>
              <p>
                <strong>Safe Bearing Capacity (SBC)</strong> : NSBC + q ={" "}
                <strong>
                  {roundTo(
                    calculateNetBearingCapacity(
                      phi,
                      inclinationToVertical,
                      cohesion,
                      bearingCapacityFactors.Nc,
                      shapeFactors.sc,
                      inclinationFactors.ic,
                      depthFactors.dc,
                      overBurdenPressure,
                      bearingCapacityFactors.Nq,
                      shapeFactors.sq,
                      depthFactors.dq,
                      inclinationFactors.iq,
                      unitWeight,
                      bearingCapacityFactors.Ny,
                      shapeFactors.sy,
                      depthFactors.dy,
                      inclinationFactors.iq,
                      waterTableFactor,
                      Df,
                      "iscode"
                    ) /
                      (10 * FOS),
                    3
                  )}{" "}
                  ton/m<sup>2</sup>
                </strong>
              </p>
            </div> */}
          </div>
        )}
      </form>
      <div className="site-info">
        <p
          style={{
            // fontSize: "20px",
            textDecoration: "underline",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Comparison between values calculated using IS Code, Terzaghi and
          MeyerHoff's methods.
        </p>
        <table>
          <thead>
            <tr>
              <th>C</th>
              <th>Φ</th>
              <th>IS Code</th>
              <th>Terzaghi's</th>
              <th>MeyerHoff's</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{cohesion}</td>
              <td>{phi}</td>
              <td>
                {roundTo(
                  calculateNetBearingCapacity(
                    phi,
                    inclinationToVertical,
                    cohesion,
                    bearingCapacityFactors.Nc,
                    shapeFactors.sc,
                    inclinationFactors.ic,
                    depthFactors.dc,
                    overBurdenPressure,
                    bearingCapacityFactors.Nq,
                    shapeFactors.sq,
                    depthFactors.dq,
                    inclinationFactors.iq,
                    unitWeight,
                    bearingCapacityFactors.Ny,
                    shapeFactors.sy,
                    depthFactors.dy,
                    inclinationFactors.iq,
                    waterTableFactor,
                    Df,
                    "iscode"
                  ) /
                    (10 * FOS),
                  3
                )}{" "}
                ton/m<sup>2</sup>
              </td>
              <td>
                {roundTo(
                  calculateNetBearingCapacity(
                    phi,
                    inclinationToVertical,
                    cohesion,
                    bearingCapacityFactors.Nc,
                    shapeFactors.sc,
                    inclinationFactors.ic,
                    depthFactors.dc,
                    overBurdenPressure,
                    bearingCapacityFactors.Nq,
                    shapeFactors.sq,
                    depthFactors.dq,
                    inclinationFactors.iq,
                    unitWeight,
                    bearingCapacityFactors.Ny,
                    shapeFactors.sy,
                    depthFactors.dy,
                    inclinationFactors.iq,
                    waterTableFactor,
                    Df,
                    "terzaghi"
                  ) /
                    (3 * 10),
                  3
                )}{" "}
                ton/m<sup>2</sup>
              </td>
              <td>
                {!isNaN(
                  calculateNetBearingCapacity(
                    phi,
                    inclinationToVertical,
                    cohesion,
                    bearingCapacityFactors.Nc,
                    shapeFactors.sc,
                    inclinationFactors.ic,
                    depthFactors.dc,
                    overBurdenPressure,
                    bearingCapacityFactors.Nq,
                    shapeFactors.sq,
                    depthFactors.dq,
                    inclinationFactors.iq,
                    unitWeight,
                    bearingCapacityFactors.Ny,
                    shapeFactors.sy,
                    depthFactors.dy,
                    inclinationFactors.iq,
                    waterTableFactor,
                    Df,
                    "meyerhoff"
                  )
                )
                  ? roundTo(
                      calculateNetBearingCapacity(
                        phi,
                        inclinationToVertical,
                        cohesion,
                        bearingCapacityFactors.Nc,
                        shapeFactors.sc,
                        inclinationFactors.ic,
                        depthFactors.dc,
                        overBurdenPressure,
                        bearingCapacityFactors.Nq,
                        shapeFactors.sq,
                        depthFactors.dq,
                        inclinationFactors.iq,
                        unitWeight,
                        bearingCapacityFactors.Ny,
                        shapeFactors.sy,
                        depthFactors.dy,
                        inclinationFactors.iq,
                        waterTableFactor,
                        Df,
                        "meyerhoff"
                      ) / 30,
                      3
                    )
                  : "0"}{" "}
                ton/m<sup>2</sup>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LevelDataCollector;
