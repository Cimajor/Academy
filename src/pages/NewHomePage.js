import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import { projectData} from './pre-built/projects/ProjectData';
import { ProjectCard} from "../components/partials/project-card/ProjectCard";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../utils/Utils";
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
} from "../components/Component";
import { useForm } from "react-hook-form";



const NewHomepage = () => {
    const [data, setData] = useState(projectData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(8);
    const [editId, setEditedId] = useState();
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
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
              Dashboard
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome Seldon's Academy  </p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            {currentItems &&
              currentItems.map((item, idx) => {
                var days = setDeadlineDays(item.deadline);
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
                          <UserAvatar className="sq" theme={item.avatarClass} text={findUpper(item.title)} />
                          <div className="project-info">
                            <h6 className="title">{item.title}</h6>
                            <span className="sub-text">{item.subtitle}</span>
                          </div>
                        </a>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="a"
                            className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1"
                          >
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <ul className="link-list-opt no-bdr">
                              <li onClick={() => onEditClick(item.id)}>
                                <DropdownItem
                                  tag="a"
                                  href="#edit"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                >
                                  <Icon name="edit"></Icon>
                                  <span>Edit Project</span>
                                </DropdownItem>
                              </li>
                              {days >= 0 && (
                                <li onClick={() => completeProject(item.id)}>
                                  <DropdownItem
                                    tag="a"
                                    href="#markasdone"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                    }}
                                  >
                                    <Icon name="check-round-cut"></Icon>
                                    <span>Mark As Done</span>
                                  </DropdownItem>
                                </li>
                              )}
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="project-details">
                        {item.desc.length > 90 ? item.desc.substring(0, 89) + "... " : item.desc}
                      </div>
                      <div className="project-progress">
                        <div className="project-progress-details">
                          <div className="project-progress-task">
                            <Icon name="check-round-cut"></Icon>
                            <span>{item.tasks} Tasks</span>
                          </div>
                          <div className="project-progress-percent">
                            {days === 0 ? 100 : calcPercentage(item.totalTask, item.tasks)}%
                          </div>
                        </div>
                        <Progress
                          className="progress-pill progress-md bg-light"
                          value={days === 0 ? 100 : calcPercentage(item.totalTask, item.tasks)}
                        ></Progress>
                      </div>
                      <div className="project-meta">
                        <ul className="project-users g-1">
                          {item.team.slice(0, 2).map((item, idx) => {
                            return (
                              <li key={idx}>
                                <UserAvatar
                                  className="sm"
                                  text={findUpper(item.label)}
                                  theme={item.theme}
                                  image={item.image}
                                />
                              </li>
                            );
                          })}
                          {item.team.length > 2 && (
                            <li>
                              <UserAvatar theme="light" className="sm" text={`+${item.team.length - 2}`} />
                            </li>
                          )}
                        </ul>
                        <span
                          className={`badge badge-dim badge-${
                            days > 10
                              ? "light"
                              : days <= 10 && days >= 2
                              ? "warning"
                              : days === 1
                              ? "danger"
                              : days <= 0 && "success"
                          }`}
                        >
                          <Icon name="clock"></Icon>
                          <span>{days <= 0 ? "Done" : days === 1 ? "Due Tomorrow" : days + " Days Left"}</span>
                        </span>
                      </div>
                    </ProjectCard>
                  </Col>
                );
              })}
          </Row>
          <div className="mt-3">
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </Block>
        
      </Content>
    </React.Fragment>
  );
};
export default NewHomepage;
