import React, { useState } from "react";
import SkillsList from './Components/SkillsList'
import './FrontEndSkills.scss';
import SkillsMap from "../frontend/Components/SkillsMap"
import classnames from "classnames";
import mapData from "./Components/miserables.json"
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";


const FrontEndSkills = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeAltTab, setActiveAltTab] = useState("0")
  const toggleAltTab = (alttab) => {
    if (activeAltTab !== alttab) setActiveAltTab(alttab);
  };

    const style = {
        position: "relative",
        left:"835px",
        top: "727px",
        height: "30px",
      };
      
    const venera = {
        position: "relative",
        left:"735px",
        top: "627px",
        height: "30px",
        "border-radius": "50%",
      };
      
    const mars = {
        position: "relative",
        left:"645px",
        top: "727px",
        height: "30px",
        "border-radius": "50%",
      };
      
    const moon = {
        position: "relative",
        left:"435px",
        top: "527px",
        height: "30px",
        "border-radius": "50%",
      };


  return (
    <React.Fragment>
      <div className="header-step">FrontEnd Skills</div>
      <Nav tabs className="nav-tabs-s2 skills">
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            // to={`${process.env.PUBLIC_URL + "/frontend/dashboard"}`}
            className={classnames({ active: activeAltTab === "0" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleAltTab("0");
              setActiveIndex(0)
            }}
          >
            Entry Level
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            //  to={`${process.env.PUBLIC_URL + "/frontend/skills"}`}
            className={classnames({ active: activeAltTab === "1" })}
            onClick={(event) => {
              event.preventDefault();
              toggleAltTab("1");
              setActiveIndex(1)
            }}
          >
            Advance Level
          </NavLink>
        </NavItem>
      </Nav>
      {activeIndex === 0 ? 
        <div className="skills-instruments">
          <SkillsList/>
          <SkillsMap skills={mapData}/>
        </div>
        : ""}
        {activeIndex === 1 ? 
                <div className="skills-instruments">
                <SkillsList/>
                <SkillsMap skills={mapData}/>
              </div> : ""}
    </React.Fragment>
  );
};

export default FrontEndSkills;
