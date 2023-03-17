import { useEffect, useState } from "react";
import "./App.css";
import DataCollectionWrapper from "./components/DataCollectionWrapper";
import Heading from "./components/Heading";

function App() {
  const [levels, setLevels] = useState(1);
  // useEffect(() => {
  //   console.log(typeof levels);
  // }, [levels]);
  return (
    <div className="App">
      <Heading />
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
            <section className="level-container" key={i}>
              <p className="level-sign">Level {i + 1}</p>
              <DataCollectionWrapper level={i+1} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default App;
