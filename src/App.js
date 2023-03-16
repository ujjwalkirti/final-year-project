import { useEffect, useState } from "react";
import "./App.css";
import Heading from "./components/Heading";
import LevelDataCollector from "./components/LevelDataCollector";

function App() {
  const [levels, setLevels] = useState(0);
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
            setLevels(parseInt(e.target.value, 10));
          }}
        />
      </div>
      <div>
        {[...Array(levels)].map((e, i) => {
          return (
            <section key={i}>
              <p>Level {i + 1}</p>
              <LevelDataCollector BoreLogNumber={i + 1} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default App;
