import React, { useState } from "react";
import SkillsList from './Components/SkillsList'
import './FrontEndSkills.scss';


const FrontEndSkills = () => {

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
      <div className="header-step">Skills</div>
        <div className="skills-instruments">
          <SkillsList/>
            <div className="skill-map">
              {/* <img alt="Skills" style={style} src={ require('../../images/star6.png').default } />
              <img alt="Skills" style={venera} src={ require('../../images/venera.jpg').default } />
              <img alt="Skills" style={mars} src={ require('../../images/mars.jfif').default } />
              <img alt="Skills" style={moon} src={ require('../../images/moon.jpg').default } /> */}
            </div>
        </div>
    </React.Fragment>
  );
};

export default FrontEndSkills;
