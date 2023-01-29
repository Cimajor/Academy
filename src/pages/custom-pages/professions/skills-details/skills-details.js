import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { Card, Modal, ModalBody } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  OverlineTitle,
  Sidebar,
  UserAvatar,
} from "../../../../components/Component";
import { useHistory } from "react-router";
import { currentTime, findUpper, monthNames, todaysDate } from "../../../../utils/Utils";
import { _GetSkillById } from "../../../../utils/Api";
import GeneralSkillInfo from "./general-info";
import SkillProfessions from "./skill-profession";

const SkillDetails = ({ match }) => {
  const { id } = useParams();
  //   const { contextData } = useContext(UserContext);
  const data = [];

  const [sideBar, setSidebar] = useState(false);
  const [user, setUser] = useState([1, 2, 3]);

  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");
  const [skillDetails, setSkillDetails] = useState();
  const [activeTab, setActiveTab] = useState({
    general: true,
    professions: false,
    source: false,
    news: false,
    statistic: false,
  });
  const history = useHistory();

  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    getSkillData();
  }, []);

  // function to toggle sidebar
  const toggle = () => {
    setSidebar(!sideBar);
  };

  const getSkillData = () => {
    _GetSkillById(id)
      .then((res) => {
        console.log(res.data());
        setSkillDetails(res.data());
      })
      .catch((err) => console.log(err));
  };

  // delete a note
  const deleteNote = (id) => {
    let defaultNote = noteData;
    defaultNote = defaultNote.filter((item) => item.id !== id);
    setNoteData(defaultNote);
  };

  const submitNote = () => {
    let submitData = {
      id: Math.random(),
      text: addNoteText,
      date: `${monthNames[todaysDate.getMonth()]} ${todaysDate.getDate()}, ${todaysDate.getFullYear()}`,
      time: `${currentTime()}`,
      company: "Softnio",
    };
    setNoteData([...noteData, submitData]);
    setAddNoteModal(false);
    setAddNoteText("");
  };

  return (
    <React.Fragment>
      <div>Skills Details</div>
      <Head title="User Details - Regular"></Head>
      {skillDetails && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Users / <strong className="text-primary small">User</strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      User ID: <span className="text-base">UD003054</span>
                    </li>
                    <li>
                      Last Login: <span className="text-base">Uer 01:02 PM</span>
                    </li>
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Button
                  color="light"
                  outline
                  className="bg-white d-none d-sm-inline-flex"
                  onClick={() => history.goBack()}
                >
                  <Icon name="arrow-left"></Icon>
                  <span>Back</span>
                </Button>
                <a
                  href="#back"
                  onClick={(ev) => {
                    ev.preventDefault();
                    history.goBack();
                  }}
                  className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
                >
                  <Icon name="arrow-left"></Icon>
                </a>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Card className="card-bordered">
              <div className="card-aside-wrap" id="user-detail-block">
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab.general ? "active" : ""}`}
                        href="#personal"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setActiveTab({
                            general: true,
                            professions: false,
                            source: false,
                            news: false,
                            statistic: false,
                          });
                        }}
                      >
                        <Icon name="user-circle"></Icon>
                        <span>Personal</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab.professions ? "active" : ""}`}
                        href="#transactions"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setActiveTab({
                            general: false,
                            professions: true,
                            source: false,
                            news: false,
                            statistic: false,
                          });
                        }}
                      >
                        <Icon name="repeat"></Icon>
                        <span>Related Professions</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab.source ? "active" : ""}`}
                        href="#documents"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setActiveTab({
                            general: false,
                            professions: false,
                            source: true,
                            news: false,
                            statistic: false,
                          });
                        }}
                      >
                        <Icon name="file-text"></Icon>
                        <span>Source of Knowledge</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab.news ? "active" : ""}`}
                        href="#notifications"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setActiveTab({
                            general: false,
                            professions: false,
                            source: false,
                            news: true,
                            statistic: false,
                          });
                        }}
                      >
                        <Icon name="bell"></Icon>
                        <span>News</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab.statistic ? "active" : ""}`}
                        href="#activities"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setActiveTab({
                            general: false,
                            professions: false,
                            source: false,
                            news: false,
                            statistic: true,
                          });
                        }}
                      >
                        <Icon name="activity"></Icon>
                        <span>Statistic</span>
                      </a>
                    </li>
                    <li className="nav-item nav-item-trigger d-xxl-none">
                      <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`} onClick={toggle}>
                        <Icon name="user-list-fill"></Icon>
                      </Button>
                    </li>
                  </ul>
                  {skillDetails && activeTab.general ? <GeneralSkillInfo skillInfoData={skillDetails} /> : ""}
                  {skillDetails && activeTab.professions ? <SkillProfessions /> : ""}
                </div>

                <Modal
                  isOpen={addNoteModal}
                  toggle={() => setAddNoteModal(false)}
                  className="modal-dialog-centered"
                  size="lg"
                >
                  <ModalBody>
                    <a
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setAddNoteModal(false);
                        setAddNoteText("");
                      }}
                      className="close"
                    >
                      <Icon name="cross-sm"></Icon>
                    </a>
                    <div className="p-2">
                      <h5 className="title">Add Admin Note</h5>
                      <div className="mt-4 mb-4">
                        <textarea
                          defaultValue={addNoteText}
                          className="form-control no-resize"
                          onChange={(e) => setAddNoteText(e.target.value)}
                        />
                      </div>
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <Button color="primary" size="md" type="submit" onClick={submitNote}>
                            Add Note
                          </Button>
                        </li>
                        <li>
                          <Button onClick={() => setAddNoteModal(false)} className="link link-light">
                            Cancel
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </ModalBody>
                </Modal>

                <Sidebar toggleState={sideBar}>
                  <div className="card-inner">
                    <div className="user-card user-card-s2 mt-5 mt-xxl-0">
                      {/* <UserAvatar className="lg" theme="primary" text={findUpper(user.name)} /> */}
                      <div className="user-info">
                        <div className="badge badge-outline-light badge-pill ucap">Role</div>
                        <h5>{user.name}</h5>
                        <span className="sub-text">Email</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-inner card-inner-sm">
                    <ul className="btn-toolbar justify-center gx-1">
                      <li>
                        <Button
                          href="#tool"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon"
                        >
                          <Icon name="shield-off"></Icon>
                        </Button>
                      </li>
                      <li>
                        <Button
                          href="#mail"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon"
                        >
                          <Icon name="mail"></Icon>
                        </Button>
                      </li>
                      <li>
                        <Button
                          href="#download"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon"
                        >
                          <Icon name="download-cloud"></Icon>
                        </Button>
                      </li>
                      <li>
                        <Button
                          href="#bookmark"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon"
                        >
                          <Icon name="bookmark"></Icon>
                        </Button>
                      </li>
                      <li>
                        <Button
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="btn-trigger btn-icon text-danger"
                        >
                          <Icon name="na"></Icon>
                        </Button>
                      </li>
                    </ul>
                  </div>
                  <div className="card-inner">
                    <div className="overline-title-alt mb-2">In Account</div>
                    <div className="profile-balance">
                      <div className="profile-balance-group gx-4">
                        <div className="profile-balance-sub">
                          <div className="profile-balance-amount">
                            <div className="number">
                              2,500.00 <small className="currency currency-usd">USD</small>
                            </div>
                          </div>
                          <div className="profile-balance-subtitle">Invested Amount</div>
                        </div>
                        <div className="profile-balance-sub">
                          <span className="profile-balance-plus text-soft">
                            <Icon className="ni-plus"></Icon>
                          </span>
                          <div className="profile-balance-amount">
                            <div className="number">1,643.76</div>
                          </div>
                          <div className="profile-balance-subtitle">Profit Earned</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-inner">
                    <Row className="text-center">
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">Order</span>
                          <span className="sub-text">Total Order</span>
                        </div>
                      </Col>
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">Project</span>
                          <span className="sub-text">Complete</span>
                        </div>
                      </Col>
                      <Col size="4">
                        <div className="profile-stats">
                          <span className="amount">Performed</span>
                          <span className="sub-text">Progress</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-inner">
                    <h6 className="overline-title-alt mb-2">Additional</h6>
                    <Row className="g-3">
                      <Col size="6">
                        <span className="sub-text">User ID:</span>
                        <span>UD003054</span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">Last Login:</span>
                        <span>User Last Login 01:02 PM</span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">KYC Status:</span>
                        <span className={`lead-text text-success`}>KYC</span>
                      </Col>
                      <Col size="6">
                        <span className="sub-text">Register At:</span>
                        <span>Nov 24, 2019</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-inner">
                    <OverlineTitle tag="h6" className="mb-3">
                      Groups
                    </OverlineTitle>
                    <ul className="g-1">
                      <li className="btn-group">
                        <Button
                          color="light"
                          size="xs"
                          className="btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          investor
                        </Button>
                        <Button
                          color="light"
                          size="xs"
                          className="btn-icon btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          <Icon className="ni-cross"></Icon>
                        </Button>
                      </li>
                      <li className="btn-group">
                        <Button
                          color="light"
                          size="xs"
                          className="btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          support
                        </Button>
                        <Button
                          color="light"
                          size="xs"
                          className="btn-icon btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          <Icon className="ni-cross"></Icon>
                        </Button>
                      </li>
                      <li className="btn-group">
                        <Button
                          color="light"
                          size="xs"
                          className="btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          another tag
                        </Button>
                        <Button
                          color="light"
                          size="xs"
                          className="btn-icon btn-dim"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                        >
                          <Icon className="ni-cross"></Icon>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </Sidebar>
                {sideBar && <div className="toggle-overlay" onClick={() => toggle()}></div>}
              </div>
            </Card>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};
export default SkillDetails;
