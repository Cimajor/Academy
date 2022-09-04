import React, { useState } from "react";
import FrontEndDashboard from "./dashboard";
import FrontEndSkills from "../frontend/FrontEndSkills";
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  PreviewAltCard,
} from "../../components/Component";


const MainFrontEnd = () => {
  const [sm, updateSm] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeAltTab, setActiveAltTab] = useState("0")

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
            className={classnames({ active: activeAltTab === "0" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleAltTab("0");
              setActiveIndex(0)
            }}
          >
            Dashboard
          </NavLink>
        </NavItem>
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
            Skills
          </NavLink>
        </NavItem>
      </Nav>
      {activeIndex === 0 ? <FrontEndDashboard/> : ""}
      {activeIndex === 1 ? <FrontEndSkills/> : ""}
      
    </React.Fragment>
  );
};

export default MainFrontEnd;
