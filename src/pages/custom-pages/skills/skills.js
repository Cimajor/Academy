import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
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
} from "../../../components/Component";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../../../utils/Utils";
import { useForm } from "react-hook-form";
import {
  _AddSkillToProfession,
  _CreateSkill,
  _GetAllSkills,
  _getProfessionById,
  _getProfessionSkillsData,
} from "../../../utils/Api";

export const Skills = () => {
  useEffect(() => {
    listAllProfessionSkills();
    getProfessionSkillsData();
    getAllSkills();
  }, []);

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

  const { id } = useParams();

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        const array = res.data().skills;
        if (array.length > 0) {
          getProfessionSkillsData(res.data().skills);
          setSkills(res.data().skills);
        }
      })
      .catch((err) => console.log(err));
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
    const newArray = allSkills.filter((el) => !skills.includes(el));
    setAvailableSkills(newArray);
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
      .catch((err) => console.log(err))
      .then(() => setModal({ add: false }))
    

    // let submittedData = {
    //   id: data.length + 1,
    //   avatarClass: "pink",
    //   title: title,
    //   subtitle: subtitle,
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

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      {console.log("skills", skills)}
      {console.log("Allskills", allSkills)}
      <Head title="Project List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Skills</BlockTitle>
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
        {/* <Block>
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
              {allSkills.length > 0
                ? allSkills.map((item) => {
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
              {allSkills.length > 0 ? (
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
        </Block>

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

export default Skills;
