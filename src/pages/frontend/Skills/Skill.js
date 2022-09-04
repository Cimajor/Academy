import React, { useState } from "react";
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";
import { useParams } from "react-router-dom"
import classnames from "classnames";
import ListOfSources from "./ListOfSources"
import Certifications from "./Certififcations"
import Comunities from "./Comunitites";



const HtmlSkill = () => {
  const [sm, updateSm] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeAltTab, setActiveAltTab] = useState("1")
  const { skill } = useParams()

  const toggleAltTab = (alttab) => {
    if (activeAltTab !== alttab) setActiveAltTab(alttab);
  };
  
  return (
    <React.Fragment>
      <div className="header-step">Header</div>
      <Nav tabs className="nav-tabs-s2">
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeAltTab === "1" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleAltTab("1");
              setActiveIndex(1)
            }}
          >
            Resources
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeAltTab === "2" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleAltTab("2");
              setActiveIndex(2)
            }}
          >
            Certifications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeAltTab === "3" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleAltTab("3");
              setActiveIndex(3)
            }}
          >
            Communities
          </NavLink>
        </NavItem>
      </Nav>
      {activeIndex === 1 ? <ListOfSources/> : ""}
      {activeIndex === 2 ? <Certifications/> : ""}
      {activeIndex === 3 ? <Comunities/> : ""}
      
    </React.Fragment>
  );
};

export default HtmlSkill;
