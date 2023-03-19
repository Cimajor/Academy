import React from "react";
import ReactDOM from "react-dom";

import "./SkillsMap.css";

import { ForceGraph3D as FG } from "react-force-graph";
import mapData from "./miserables.json";
// import FG from "react-force-graph-ar";

const getNodeColor = (complitedStatus) => {
  if (complitedStatus) {
    return "#4caf50";
  } else {
    return "#f44336";
  }
};

const SkillsMap = (props) => {
  function genRandomTree(N = 100, reverse = false) {
    let skillsMap = {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          [reverse ? "target" : "source"]: id,
          [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
        })),
    };
    console.log(skillsMap);
    return skillsMap;
  }

  //   const rootElement = document.getElementById("test");
  //   ReactDOM.render(<App />, rootElement);

  return (
    <>
      <div className="skills-map">
        {console.log(props.skills)}
        <FG
          width={600}
          height={600}
          graphData={props.skills}
          nodeColor={(d) => (d.profetion ? "#1E6DD6" : getNodeColor(d.complited))}
          nodeVal={(i) => (i.profetion ? "40" : "4")}
          nodeLabel={(d) => d.skill}
          nodeResolution={10}
        />
        {/* <FG width={600} height={600} graphData={genRandomTree()} /> */}
      </div>
    </>
  );
};

export default SkillsMap;
