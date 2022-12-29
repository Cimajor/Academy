import React, { useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import FrontEndSellary from "../../components/partials/analytics/audience-overview/FrontEndSellary";
import ActiveUser from "../../components/partials/analytics/active-user/ActiveUser";
import UserMap from "../../components/partials/analytics/user-map/UserMap";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
} from "../../components/Component";

const WebDesignDashboard = () => {
  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title="FrontEnd Dashboard" />
      <Content>
        <BlockHead size="sm">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>FrontEnd</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date"></Icon>
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right"></Icon>
                        </DropdownToggle>
                        <DropdownMenu>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                Last 30 days
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                Last 6 months
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                Last 3 weeks
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports"></Icon>
                        <span>Reports</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </div>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col lg="7" xxl="6">
              <PreviewAltCard className="h-100">
                <FrontEndSellary />
              </PreviewAltCard>
            </Col>
            <Col md="6" lg="5" xxl="3">
              <PreviewAltCard className="h-100">
                <ActiveUser />
              </PreviewAltCard>
            </Col>
            <Col md="6" xxl="3">
              <PreviewAltCard className="h-100">
                <UserMap />
              </PreviewAltCard>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default WebDesignDashboard;
