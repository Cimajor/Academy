import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import DatePicker from "react-datepicker";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Progress,
  FormGroup,
  ModalBody,
  Modal,
  DropdownItem,
  Form,
  Card,
} from "reactstrap";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Col,
  UserAvatar,
  PaginationComponent,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  RSelect,
  Sidebar,
  Row,
  OverlineTitle,
} from "../../../../components/Component";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../../../../utils/Utils";
import { useForm } from "react-hook-form";
import {
  _AddSkillToProfession,
  _CreateSkill,
  _GetAllSkills,
  _getProfessionById,
  _getProfessionSkillsData,
  _ApplyForProfession,
} from "../../../../utils/Api";
import ProfessionInfo from "./general-profession-info";
import ProfessionSkills from "./profession-skills";
import AddExistedSkill from "./add-existed-skill";
import { useAuth } from "../../../../context/AuthContext";
import { useAuthContext } from "../../../../context/AuthContextProvider";

export const ProjectListPage = () => {
  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [data, setData] = useState([]);
  const [skills, setSkills] = useState([]);

  const [allSkills, setAllSKills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [skillData, setSkillData] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [professionDetils, setProfessionDetails] = useState();
  const [activeTab, setActiveTab] = useState({
    general: true,
    professions: false,
    existedSkill: false,
    source: false,
    news: false,
    statistic: false,
  });
  const [sideBar, setSidebar] = useState(false);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addNoteText, setAddNoteText] = useState("");
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { roles, uid } = useAuthContext();

  useEffect(() => {
    listAllProfessionSkills();
    getProfessionSkillsData();
    getAllSkills();
  }, []);

  useEffect(() => {
    if (skills && allSkills) {
      excludeAddedSkills();
    }
  }, [skills, allSkills]);

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggle = () => {
    setSidebar(!sideBar);
  };

  const applyForProfession = () => {
    const professionId = id;
    console.log(professionId, uid); 
    _ApplyForProfession(uid, professionId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      lead: "",
      tasks: 0,
      totalTask: 0,
      team: {},
      date: new Date(),
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  const listAllProfessionSkills = () => {
    _getProfessionById(id)
      .then((res) => {
        setProfessionDetails(res.data());
        const array = res.data().skills;
        if (array.length > 0) {
          getProfessionSkillsData(res.data().skills);
          // setListOfSkillsId(res.data().skills);
        }
      })
      .catch((err) => console.log(err));
  };

  const getFilteredArray = () => {
    const myArrayFiltered = allSkills.filter((el) => {
      return skills.some((f) => {
        return f.title !== el.title && f.description !== el.description;
      });
    });
    return myArrayFiltered;
  };

  const getAllSkills = () => {
    const arrayOfSkills = [];
    _GetAllSkills()
      .then((res) => {
        res.forEach((doc) => {
          const newProfessionObject = doc.data();
          const objectWithId = { ...newProfessionObject, id: doc.id };
          arrayOfSkills.push(objectWithId);
        });

        setAllSKills(arrayOfSkills);
        console.log(arrayOfSkills);
      })
      .catch((err) => console.log(err));
  };

  const getProfessionSkillsData = (arrayOfSkillsId) => {
    _getProfessionSkillsData(arrayOfSkillsId)
      .then((res) => {
        const listOfSkills = [];
        res.forEach((doc) => {
          const newProfessionObject = doc.data();
          const objectWithId = { ...newProfessionObject, id: doc.id };
          listOfSkills.push(objectWithId);
        });
        setSkills(listOfSkills);
      })
      .catch((err) => console.log(err));
  };
  const excludeAddedSkills = () => {
    console.log("arrayOfAvailab", skills);
    const arrayOfAvailableSkills = allSkills.filter((skill) => {
      return !skills.find((userSkill) => {
        return userSkill.id === skill.id;
      });
    });
    setAvailableSkills(arrayOfAvailableSkills);
  };

  // submit function to add a new item
  const onFormSubmit = (sData) => {
    console.log("SUBMITED");
    const { title, complexity, description, hours } = sData;
    const buildSkillBody = {
      title: title,
      complexity: complexity,
      description: description,
      hours: hours,
    };
    _CreateSkill(buildSkillBody)
      .then((res) => {
        _AddSkillToProfession(id, "skills", res.id).then((res) => {
          setModal({ add: false });
          listAllProfessionSkills();
        });
        console.log(res.id);
      })
      .catch((err) => console.log(err));

    // let submittedData = {
    //   id: data.length + 1,
    //   avatarClass: "pink",
    //   title: title,
    //   subtitle: subtitle,
    //   desc: description,
    //   lead: formData.lead,
    //   team: formData.team,
    //   tasks: tasks,
    //   totalTask: totalTask,
    //   deadline: new Date(`${formData.date}`), // Format ** mm/dd/yyyy
    // };
    // setData((data) => [submittedData, ...data]);
    // resetForm();
    // setModal({ add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarClass: item.avatarClass,
          title: title,
          subtitle: subtitle,
          desc: description,
          lead: formData.lead,
          tasks: tasks,
          totalTask: totalTask,
          deadline: new Date(`${formData.date}`), // Format ** mm/dd/yyyy
          team: formData.team,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    resetForm();
    setModal({ edit: false });
  };

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

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorCompleteProject = () => {
    let newData;
    newData = data.map((item) => {
      if (item.checked === true) item.deadline = setDeadline(0);
      return item;
    });
    setData([...newData]);
  };

  // function to delete the seletected item
  const selectorDeleteProject = () => {
    let newData;
    newData = data.filter((item) => item.checked !== true);
    setData([...newData]);
  };

  // function to change the check property of selected item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
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

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <React.Fragment>
        <Head title="User Details - Regular"></Head>
        {professionDetils && (
          <Content>
            <BlockHead size="sm">
              <BlockBetween>
                <BlockHeadContent>
                  <BlockTitle tag="h3" page>
                    Profession / <strong className="text-primary small">{professionDetils.name}</strong>
                  </BlockTitle>
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
                              existedSkill: false,
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
                              existedSkill: false,
                              news: false,
                              statistic: false,
                            });
                          }}
                        >
                          <Icon name="repeat"></Icon>
                          <span>Skills</span>
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
                              existedSkill: true,
                              source: false,
                              news: false,
                              statistic: false,
                            });
                          }}
                        >
                          <Icon name="file-text"></Icon>
                          <span>Add Skill</span>
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
                              existedSkill: false,
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
                              existedSkill: false,
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
                    {professionDetils && activeTab.general ? <ProfessionInfo professionData={professionDetils} /> : ""}
                    {skills && activeTab.professions ? (
                      <ProfessionSkills skillTitle={professionDetils.title} skills={skills} />
                    ) : (
                      ""
                    )}
                    {activeTab.existedSkill ? (
                      <AddExistedSkill
                        skillTitle={professionDetils.title}
                        skills={availableSkills}
                        professionId={id}
                        getAllSkills={() => getAllSkills()}
                      />
                    ) : (
                      ""
                    )}
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
                        <div className="user-info">
                          <Button color="primary" onClick={applyForProfession}>
                            <Icon name="plus"></Icon>
                            <span>Apply</span>
                          </Button>

                          <span className="sub-text">{professionDetils.name}</span>
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

      <Head title="Project List"></Head>
      <Content>
        {/* <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> List of Needed Skills</BlockTitle>
              <BlockDes className="text-soft">You have total {data.length} projects</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon name="filter-alt" className="d-none d-sm-inline"></Icon>
                          <span>Filtered By</span>
                          <Icon name="chevron-right" className="dd-indc"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>Open</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>Closed</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>Onhold</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt" onClick={() => setModal({ add: true })}>
                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>Add New Skill</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <DataTable className="card-stretch">
            <DataTableBody>
              <DataTableHead className="nk-tb-item nk-tb-head">
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control"
                      id="pid-all"
                      onChange={(e) => selectorCheck(e)}
                    />
                    <label className="custom-control-label" htmlFor="pid-all"></label>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">Title</span>
                </DataTableRow>
                <DataTableRow size="sub-text">
                  <span className="sub-text">Complexity</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text">Hours to learn</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="btn btn-xs btn-trigger btn-icon dropdown-toggle mr-n1">
                      <Icon name="more-h"></Icon>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <ul className="link-list-opt no-bdr">
                        <li onClick={() => selectorCompleteProject()}>
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
                        <li onClick={() => selectorDeleteProject()}>
                          <DropdownItem
                            tag="a"
                            href="#remove"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                          >
                            <Icon name="trash"></Icon>
                            <span>Remove Skill</span>
                          </DropdownItem>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </DataTableRow>
              </DataTableHead>
              {skills.length > 0
                ? skills.map((item) => {
                    return (
                      <DataTableItem key={item.id}>
                        <DataTableRow className="nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input
                              type="checkbox"
                              className="custom-control-input form-control"
                              // defaultChecked={item.checked}
                              id={item.id + "pid-all"}
                              key={Math.random()}
                              onChange={(e) => onSelectChange(e, item.id)}
                            />
                            <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label>
                          </div>
                        </DataTableRow>
                        <DataTableRow>
                          <a
                            href="#title"
                            onClick={(ev) => {
                              ev.preventDefault();
                            }}
                            className="project-title"
                          >
                            <div className="project-info">
                              <Link to={`/skills/${item.id}`}>{item.title}</Link>
                            </div>
                          </a>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span>{item.complexity}</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span>{item.hours}</span>
                        </DataTableRow>
                        <DataTableRow size="lg"></DataTableRow>
                      </DataTableItem>
                    );
                  })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {skills.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No skills found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block> */}

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add New Skill</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={formData.title}
                        placeholder="Enter Title"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Complexity</label>
                      <input
                        type="text"
                        name="complexity"
                        defaultValue={formData.subtitle}
                        placeholder="Enter client name"
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.subtitle && <span className="invalid">{errors.subtitle.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        onChange={(e) => onInputChange(e)}
                        className="form-control-xl form-control no-resize"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Hours To Learn</label>
                      <input
                        type="number"
                        name="hours"
                        defaultValue={formData.tasks}
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                    </FormGroup>
                  </Col>
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Total Tasks</label>
                      <input
                        type="number"
                        name="totalTask"
                        defaultValue={formData.totalTask}
                        onChange={(e) => onInputChange(e)}
                        className="form-control"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.totalTask && <span className="invalid">{errors.totalTask.message}</span>}
                    </FormGroup>
                  </Col> */}
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Deadline Date</label>
                      <DatePicker
                        selected={formData.date}
                        className="form-control"
                        onChange={(date) => setFormData({ ...formData, date: date })}
                        minDate={new Date()}
                      />
                    </FormGroup>
                  </Col> */}
                  <Col md="6">
                    {/* <FormGroup>
                      <label className="form-label">Team Members</label>
                      <RSelect options={teamList} isMulti onChange={(e) => setFormData({ ...formData, team: e })} />
                    </FormGroup> */}
                  </Col>
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Lead</label>
                      <RSelect options={formData.team} onChange={(e) => setFormData({ ...formData, lead: e.value })} />
                    </FormGroup>
                  </Col> */}
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Add New Skill
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Project</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={formData.title}
                        placeholder="Enter Title"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control"
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Client</label>
                      <input
                        type="text"
                        name="subtitle"
                        defaultValue={formData.subtitle}
                        placeholder="Enter client Name"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control"
                      />
                      {errors.subtitle && <span className="invalid">{errors.subtitle.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        defaultValue={formData.description}
                        placeholder="Your description"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control no-resize"
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Number of Tasks</label>
                      <input
                        type="number"
                        name="tasks"
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        defaultValue={formData.tasks}
                        className="form-control"
                      />
                      {errors.tasks && <span className="invalid">{errors.tasks.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Total Tasks</label>
                      <input
                        type="number"
                        name="totalTask"
                        min={formData.totalTask}
                        defaultValue={formData.totalTask}
                        onChange={(e) => onInputChange(e)}
                        ref={register({
                          required: "This field is required",
                        })}
                        className="form-control"
                      />
                      {errors.totalTask && <span className="invalid">{errors.totalTask.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Deadline Date</label>
                      <DatePicker
                        selected={formData.date}
                        className="form-control"
                        onChange={(date) => setFormData({ ...formData, date: date })}
                        minDate={new Date()}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Team Members</label>
                      {/* <RSelect
                        options={teamList}
                        isMulti
                        defaultValue={formData.team}
                        onChange={(e) => setFormData({ ...formData, team: e })}
                      /> */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Lead</label>
                      <RSelect
                        options={formData.team}
                        defaultValue={[{ value: formData.lead, label: formData.lead }]}
                        onChange={(e) => setFormData({ ...formData, lead: e.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update Project
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default ProjectListPage;
