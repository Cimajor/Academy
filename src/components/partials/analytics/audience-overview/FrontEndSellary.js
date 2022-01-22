import React, { useState } from "react";
import { AudienceLineChart } from "../../charts/analytics/AnalyticsCharts";
import { Icon } from "../../../Component";

const FrontEndSellary = () => {
  const [auOverview, setAuOverview] = useState("month-1");
  return (
    <React.Fragment>
      <div className="card-title-group pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">FrontEnd Salary Overview</h6>
          <p>Pay by Experience Level</p>
        </div>
        <div className="card-tools shrink-0 d-none d-sm-block">
          <ul className="nav nav-switch-s2 nav-tabs bg-white">
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "day-7" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("day-7");
                }}
              >
                7 D
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "month-1" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("month-1");
                }}
              >
                1 M
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="analytic-ov">
        <div className="analytic-data-group analytic-ov-group g-3">
          <div className="analytic-data analytic-ov-data">
            <div className="title">Entry Level</div>
            <div className="change up">
              <Icon name="arrow-long-down"></Icon> 23%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Sessions</div>
            <div className="change up">
              <Icon name="arrow-long-down"></Icon> 6%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Users</div>
            <div className="change down">
              <Icon name="arrow-long-up"></Icon> 28%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Users</div>
            <div className="change down">
              <Icon name="arrow-long-up"></Icon> 66%
            </div>
          </div>
        </div>
        <div className="analytic-ov-ck">
          <AudienceLineChart state={auOverview} />
        </div>
        <div className="chart-label-group ml-5">
          <div className="chart-label">0-2 years</div>
          <div className="chart-label d-none d-sm-block">0-5 years</div>
          <div className="chart-label">5-10 years</div>
          <div className="chart-label">10+ years</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FrontEndSellary;
