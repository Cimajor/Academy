import React, { useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import { projectData } from "../../pre-built/projects/ProjectData";
import { ProjectCard } from "../../../components/partials/project-card/ProjectCard";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../../../utils/Utils";
import { Link } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Progress } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Row,
  UserAvatar,
  Col,
  PaginationComponent,
} from "../../../components/Component";
import { useForm } from "react-hook-form";
import { _GetUser, _getUserAppliedSkillsData } from "../../../utils/Api";
import { useAuth } from "../../../context/AuthContext";

const UserDashboard = () => {
  const [data, setData] = useState(projectData);
  const [userData, setUserData] = useState();
  const [userProfessions, setUserProfessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(8);
  const [editId, setEditedId] = useState();
  const [appliedProfessionsData, setAppliedProfessionsData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: {},
    totalTask: 0,
    date: new Date(),
  });
  const [modal, setModal] = useState({
    add: false,
    edit: false,
  });
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const userEmptyUserProfessions = [];

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setFormData({
          title: item.title,
          subtitle: item.subtitle,
          description: item.desc,
          lead: item.lead,
          team: item.team,
          tasks: item.tasks,
          totalTask: item.totalTask,
          date: item.deadline,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  const getUserData = () => {
    setIsLoading(true);
    _GetUser(currentUser.uid)
      .then((res) => {
        setUserData(res.docs[0].data().data);
        console.log(res.docs[0].data().appliedProfessions);
        setUserProfessions(res.docs[0].data().appliedProfessions);
        console.log(res.docs[0].data().appliedProfessions);
        _getUserAppliedSkillsData(res.docs[0].data().appliedProfessions)
          .then((res) =>
            res.docs.map((doc) =>
              setAppliedProfessionsData((appliedProfessionsData) => [...appliedProfessionsData, doc.data()])
            )
          )
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // function to change the complete a project property
  const completeProject = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].deadline = setDeadline(0);
    setData([...newData]);
  };

  // Get current list, pagination
  // Get current list, pagination

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  const [sm, updateSm] = useState(false);
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      {isLoading ? (
        <div className="loaderSreen">
          <div className="page-loading">
            <Loader active size="large">
              <p>Loading...</p>
            </Loader>
          </div>
        </div>
      ) : (
        <>
          <Content>
            <BlockHead size="sm">
              <BlockBetween>
                <BlockHeadContent>
                  <BlockTitle page tag="h3">
                    Dashboard
                  </BlockTitle>
                  <BlockDes className="text-soft">
                    <p>Welcome to Schoolless </p>
                  </BlockDes>
                </BlockHeadContent>
              </BlockBetween>
            </BlockHead>
            <Block>
              <Row className="g-gs">
                {appliedProfessionsData.length > 0 ? (
                  <>
                    {appliedProfessionsData.length > 0 &&
                      appliedProfessionsData.map((item, idx) => {
                        console.log(item);
                        var days = setDeadline(94);
                        return (
                          <Col sm="6" lg="4" xxl="3" key={item.id}>
                            <ProjectCard>
                              <div className="project-head">
                                <a
                                  href="#title"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                  className="project-title"
                                >
                                  <UserAvatar className="sq" theme="purple" text={findUpper(item.name)} />
                                  <div className="project-info">
                                    <Link to={`/applied-profession/frontend`}>
                                      <h6 className="title">{item.name}</h6>
                                    </Link>
                                    <span className="sub-text">{item.description}</span>
                                  </div>
                                </a>
                              </div>
                              <div className="project-details">
                                {item.description.length > 90
                                  ? item.description.substring(0, 89) + "... "
                                  : item.description}
                              </div>
                              <div className="project-progress">
                                <div className="project-progress-details">
                                  <div className="project-progress-task">
                                    <Icon name="check-round-cut"></Icon>
                                    <span>{item.skills.length} Skills</span>
                                  </div>
                                  <div className="project-progress-percent">
                                    {days === 0 ? 100 : calcPercentage("8", "6")}%
                                  </div>
                                </div>
                                <Progress
                                  className="progress-pill progress-md bg-light"
                                  value={days === 0 ? 100 : calcPercentage("4", "10")}
                                ></Progress>
                              </div>
                              <div className="project-meta">
                                <span
                                  className={`badge badge-dim badge-${
                                    days > 10
                                      ? "light"
                                      : days <= 10 && days >= 2
                                      ? "light"
                                      : days === 1
                                      ? "light"
                                      : days <= 0 && "success"
                                  }`}
                                >
                                  <Icon name="clock"></Icon>
                                  <span>{"Aproximetly 46 hours of learning left"}</span>
                                </span>
                              </div>
                            </ProjectCard>
                          </Col>
                        );
                      })}{" "}
                  </>
                ) : (
                  <div>
                    {" "}
                    <Link to={`${process.env.PUBLIC_URL}/professions`} className="nav-link">
                      Please visit Professions you want to get
                    </Link>
                  </div>
                )}
              </Row>
            </Block>
          </Content>
        </>
      )}
    </React.Fragment>
  );
};
export default UserDashboard;
