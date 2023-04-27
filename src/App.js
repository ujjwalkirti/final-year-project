import { useEffect, useState } from "react";
import "./App.css";
import DataCollectionWrapper from "./components/DataCollectionWrapper";
import Heading from "./components/Heading";

function App() {
  const [levels, setLevels] = useState(1);
  const [location, setLocation] = useState("");
  const [appendix, setAppendix] = useState(0);
  // useEffect(() => {
  //   console.log(typeof levels);
  // }, [levels]);
  return (
    <div className="App">
      {appendix !== 0 && (
        <div className="appendix">
          <p>Annexure: {appendix}</p>
          <p>Site details: {location}</p>
        </div>
      )}
      {/* <Heading /> */}
      <div className="levels">
        <label htmlFor="Appendix-number">Enter Annexure No.</label>
        <input
          type={`number`}
          value={appendix}
          required
          className="levels-input"
          id="Appendix-number"
          onChange={(e) => {
            const annexure_value = e.target.value;
            if (annexure_value > 0) {
              setAppendix(annexure_value);
            }
          }}
        />
      </div>
      <div className="levels">
        <label htmlFor="location-name">Enter the name for location</label>
        <input
          type={`text`}
          value={location}
          required
          className="levels-input"
          id="location-name"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </div>
      {location.length !== 0 && (
        <>
          <div className="levels">
            <p className="levels-text">Enter the number of levels:</p>

            <input
              className="levels-input"
              value={levels}
              type="number"
              onChange={(e) => {
                let set_level = parseInt(e.target.value, 10);
                if (set_level > 0) {
                  setLevels(set_level);
                } else {
                  alert("Be careful about what are you entering!");
                }
              }}
            />
          </div>
          <div>
            {[...Array(levels)].map((e, i) => {
              return (
                <section
                  className="level-container"
                  style={{ fontSize: "16px" }}
                  key={i}
                >
                  <hr />
                  <p className="level-sign">Level {i + 1}</p>
                  <DataCollectionWrapper location={location} level={i + 1} />
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
