import React, { useContext, useEffect, useState } from "react";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { _CreateProfession, _GetAllProfessions, _getSkillProfessionsData } from "../../../../utils/Api";
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
} from "../../../../components/Component";
import { bulkActionOptions, findUpper } from "../../../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// import { UserContext } from "./UserContext";

const SkillProfessions = ({ skillTitle, skills }) => {
  const [data, setData] = useState([]);
  const { id } = useParams();

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
    title: "",
    complexity: "",
    startSalary: "",
    avarageSalary: "",
    hours: "",
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const [relatedProfessionsData, setRelatedProfessionsData] = useState([]);

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
    // getAllProfession();
    // let newData;
    // newData = userData.map((item) => {
    //   item.checked = false;
    //   return item;
    // });
    // setData([...newData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  // const onAddProfession = (submitData) => {
  //   const { name, complexity, startSalary, avarageSalary, hours } = submitData;
  //   let submittedData = {
  //     name: name,
  //     complexity: complexity,
  //     startSalary: startSalary,
  //     avarageSalary: avarageSalary,
  //     hours: hours,
  //     skills: [],
  //   };
  //   _CreateProfession(submittedData);
  //   console.log(submittedData);
  //   setData([submittedData, ...data]);
  //   resetForm();
  //   setModal({ edit: false }, { add: false });
  // };

  //   const getAllProfession = async () => {
  //     const professionsArray = [];
  //     await _getSkillProfessionsData(id)
  //       .then((res) => {
  //         console.log(res);
  //         res.forEach((doc) => {
  //           console.log("doc", doc);
  //           const newProfessionObject = doc.data();
  //           const objectWithId = { ...newProfessionObject, id: doc.id };
  //           console.log(objectWithId);
  //           professionsArray.push(objectWithId);
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //     setRelatedProfessionsData(professionsArray);
  //     console.log(professionsArray);
  //   };

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
      {console.log(skills)}
      <Head title="User List - Regular"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockDes className="text-soft">
                <p>Where {skillTitle} can be useful</p>
              </BlockDes>
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
                  <span className="sub-text">Hours to learn</span>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {skills.length > 0
                ? skills.map((item) => {
                    return (
                      <DataTableItem key={item.id}>
                        <DataTableRow>
                          <Link to={`/skills/${item.id}`}>{item.title}</Link>
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
                          <span>{item.hours}</span>
                        </DataTableRow>
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
                <Form className="row gy-4" noValidate>
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
      </Content>
    </React.Fragment>
  );
};
export default SkillProfessions;
