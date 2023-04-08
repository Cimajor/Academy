import React, { useContext, useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { _CreateProfession, _GetAllProfessions, _GetUser } from "../../../utils/Api";
import {
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
} from "../../../components/Component";
import { bulkActionOptions, findUpper } from "../../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { UserContext } from "./UserContext";
import { useAuth } from "../../../context/AuthContext";
import { Loader } from "semantic-ui-react";

const ProfessionsDashboard = () => {
  const [data, setData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [userSkillsID, setUserSkillsID] = useState([]);
  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    complexity: "",
    startSalary: "",
    avarageSalary: "",
    hours: "",
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const { logout, currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(1);

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
      setData([...sortedData]);
    }
  };

  // unselects the data on mount
  useEffect(() => {
    getAllProfession();
    getuserSkillsID();
    setTimeout(() => {
      setIsLoading((isLoading) => isLoading - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("isLoading", isLoading);
  }, [isLoading]);

  useEffect(() => {
    calculatePercentageSkill(data, userSkillsID);
  }, [data, userSkillsID]);

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = userData.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      // setData([...userData]);
    }
  }, [onSearchText, setData]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  const getuserSkillsID = () => {
    setIsLoading((isLoading) => isLoading + 1);
    _GetUser(currentUser.uid)
      .then((res) => {
        const listOfSkillsId = [];
        res.forEach((doc) => {
          listOfSkillsId.push(doc.data().data.learnedSkills);
        });
        setUserSkillsID(listOfSkillsId[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading((isLoading) => isLoading - 1));
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  const calculatePercentageSkill = (jobArray, skillIds) => {
    jobArray.forEach((job) => {
      let matchedSkills = 0;

      job.skills.forEach((skillId) => {
        if (skillIds.includes(skillId)) {
          matchedSkills++;
        }
      });

      const percentageSkill = (matchedSkills / job.skills.length) * 100;
      job.percentageSkill = percentageSkill.toFixed(2);
    });

    setDataToDisplay(jobArray);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      balance: "",
      phone: "",
      status: "Active",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // submit function to add a new item
  const onAddProfession = (submitData) => {
    const { name, complexity, startSalary, avarageSalary, hours } = submitData;
    let submittedData = {
      name: name,
      complexity: complexity,
      startSalary: startSalary,
      avarageSalary: avarageSalary,
      hours: hours,
      skills: [],
    };
    _CreateProfession(submittedData);
    console.log(submittedData);
    setData([submittedData, ...data]);
    resetForm();
    setModal({ edit: false }, { add: false });
  };

  const getAllProfession = async () => {
    setIsLoading((isLoading) => isLoading + 1);
    const professionsArray = [];
    await _GetAllProfessions("professions")
      .then((res) => {
        res.forEach((doc) => {
          const newProfessionObject = doc.data();
          const objectWithId = { ...newProfessionObject, id: doc.id };
          professionsArray.push(objectWithId);
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading((isLoading) => isLoading - 1));
    setData(professionsArray);
    console.log(professionsArray);
  };

  // submit function to update a new item
  // const onEditSubmit = (submitData) => {
  //   const { name, email, phone } = submitData;
  //   let submittedData;
  //   let newitems = data;
  //   newitems.forEach((item) => {
  //     if (item.id === editId) {
  //       submittedData = {
  //         id: item.id,
  //         avatarBg: item.avatarBg,
  //         name: name,
  //         image: item.image,
  //         role: item.role,
  //         email: email,
  //         balance: formData.balance,
  //         phone: "+" + phone,
  //         emailStatus: item.emailStatus,
  //         kycStatus: item.kycStatus,
  //         lastLogin: item.lastLogin,
  //         status: formData.status,
  //         country: item.country,
  //       };
  //     }
  //   });
  //   let index = newitems.findIndex((item) => item.id === editId);
  //   newitems[index] = submittedData;
  //   setModal({ edit: false });
  //   resetForm();
  // };

  // function that loads the want to editted data
  // const onEditClick = (id) => {
  //   data.forEach((item) => {
  //     if (item.id === id) {
  //       setFormData({
  //         name: item.name,
  //         email: item.email,
  //         status: item.status,
  //         phone: item.phone,
  //         balance: item.balance,
  //       });
  //       setModal({ edit: true }, { add: false });
  //       setEditedId(id);
  //     }
  //   });
  // };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Suspend";
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

  // function which fires on applying selected action
  const onActionClick = (e) => {
    if (actionText === "suspend") {
      let newData = data.map((item) => {
        if (item.checked === true) item.status = "Suspend";
        return item;
      });
      setData([...newData]);
    } else if (actionText === "delete") {
      let newData;
      newData = data.filter((item) => item.checked !== true);
      setData([...newData]);
    }
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="User List - Regular"></Head>
      {isLoading > 0 ? (
        <div className="loaderSreen">
          <div className="page-loading">
            <Loader active size="large">
              <p>Loading...</p>
            </Loader>
          </div>
        </div>
      ) : (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Professions
                </BlockTitle>
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
                      <li className="nk-block-tools-opt">
                        <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                          <Icon name="plus"></Icon>
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
              <div className="card-inner position-relative card-tools-toggle">
                <div className="card-title-group">
                  <div className="card-tools">
                    <div className="form-inline flex-nowrap gx-3">
                      <div className="form-wrap">
                        <RSelect
                          options={bulkActionOptions}
                          className="w-130px"
                          placeholder="Bulk Action"
                          onChange={(e) => onActionText(e)}
                        />
                      </div>
                      <div className="btn-wrap">
                        <span className="d-none d-md-block">
                          <Button
                            disabled={actionText !== "" ? false : true}
                            color="light"
                            outline
                            className="btn-dim"
                            onClick={(e) => onActionClick(e)}
                          >
                            Apply
                          </Button>
                        </span>
                        <span className="d-md-none">
                          <Button
                            color="light"
                            outline
                            disabled={actionText !== "" ? false : true}
                            className="btn-dim btn-icon"
                            onClick={(e) => onActionClick(e)}
                          >
                            <Icon name="arrow-right"></Icon>
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                  <div className="card-body">
                    <div className="search-content">
                      <Button
                        className="search-back btn-icon toggle-search active"
                        onClick={() => {
                          setSearchText("");
                          toggle();
                        }}
                      >
                        <Icon name="arrow-left"></Icon>
                      </Button>
                      <input
                        type="text"
                        className="border-transparent form-focus-none form-control"
                        placeholder="Search by user or email"
                        value={onSearchText}
                        onChange={(e) => onFilterChange(e)}
                      />
                      <Button className="search-submit btn-icon">
                        <Icon name="search"></Icon>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <DataTableBody>
                <DataTableHead>
                  <DataTableRow>
                    <span className="sub-text">Profession</span>
                  </DataTableRow>
                  <DataTableRow size="mb">
                    <span className="sub-text">Complexity</span>
                  </DataTableRow>
                  <DataTableRow size="md">
                    <span className="sub-text">Start Salary</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="sub-text">Avarage Salary</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="sub-text">Learned at %</span>
                  </DataTableRow>
                </DataTableHead>
                {/*Head*/}
                {dataToDisplay.length > 0
                  ? dataToDisplay.map((item) => {
                      return (
                        <DataTableItem key={item.id}>
                          <DataTableRow>
                            <Link to={`/professions/${item.id}`}>{item.name}</Link>
                          </DataTableRow>
                          <DataTableRow size="mb">
                            <span className="tb-amount">{item.complexity}</span>
                          </DataTableRow>
                          <DataTableRow size="lg">
                            <span className="currency">{item.startSalary} USD</span>
                          </DataTableRow>
                          <DataTableRow size="lg">
                            <span className="currency">{item.avarageSalary} USD</span>
                          </DataTableRow>
                          <DataTableRow className="nk-tb-col-tools">
                            <span>{item.percentageSkill}%</span>
                          </DataTableRow>
                        </DataTableItem>
                      );
                    })
                  : null}
              </DataTableBody>
              <div className="card-inner">
                {currentItems.length > 0 ? (
                  <PaginationComponent
                    itemPerPage={itemPerPage}
                    totalItems={data.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-silent">No data found</span>
                  </div>
                )}
              </div>
            </DataTable>
          </Block>
          <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
            <ModalBody>
              <a
                href="#close"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
                className="close"
              >
                <Icon name="cross-sm"></Icon>
              </a>
              <div className="p-2">
                <h5 className="title">Add Profession</h5>
                <div className="mt-4">
                  <Form className="row gy-4" noValidate onSubmit={handleSubmit(onAddProfession)}>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          defaultValue={formData.name}
                          placeholder="Enter name"
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.name && <span className="invalid">{errors.name.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label">Complexity </label>
                        <input
                          className="form-control"
                          type="text"
                          name="complexity"
                          defaultValue={formData.complexity}
                          placeholder="Complaxity"
                          ref={register({
                            required: "This field is required",
                          })}
                        />
                        {errors.complexity && <span className="invalid">{errors.complexity.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label">Start Salary</label>
                        <input
                          className="form-control"
                          type="text"
                          name="startSalary"
                          defaultValue={formData.startSalary}
                          placeholder="Start Salary"
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.startSalary && <span className="invalid">{errors.startSalary.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label">Avarage Salary</label>
                        <input
                          className="form-control"
                          type="text"
                          name="avarageSalary"
                          defaultValue={formData.avarageSalary}
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.avarageSalary && <span className="invalid">{errors.avarageSalary.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label">Hours to Start</label>
                        <input
                          className="form-control"
                          type="text"
                          name="hours"
                          defaultValue={formData.hours}
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.hours && <span className="invalid">{errors.hours.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col size="12">
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                          <Button color="primary" size="md" type="submit">
                            Add Profession
                          </Button>
                        </li>
                        <li>
                          <a
                            href="#cancel"
                            onClick={(ev) => {
                              ev.preventDefault();
                              onFormCancel();
                            }}
                            className="link link-light"
                          >
                            Cancel
                          </a>
                        </li>
                      </ul>
                    </Col>
                  </Form>
                </div>
              </div>
            </ModalBody>
          </Modal>
          {/* 
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
              <h5 className="title">Update User</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Enter email"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Balance</label>
                      <input
                        className="form-control"
                        type="number"
                        name="balance"
                        disabled
                        defaultValue={parseFloat(formData.balance.replace(/,/g, ""))}
                        placeholder="Balance"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.balance && <span className="invalid">{errors.balance.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        type="number"
                        name="phone"
                        defaultValue={Number(formData.phone)}
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Status</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatus}
                          defaultValue={{
                            value: formData.status,
                            label: formData.status,
                          }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update User
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal> */}
        </Content>
      )}
    </React.Fragment>
  );
};
export default ProfessionsDashboard;
