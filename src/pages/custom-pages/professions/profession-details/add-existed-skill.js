import React, { useContext, useEffect, useState } from "react";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { _CreateProfession, _GetAllProfessions, _GetAllSkills, _AddSkillToProfession } from "../../../../utils/Api";
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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// import { UserContext } from "./UserContext";

const AddExistedSkill = ({ skillTitle, skills, professionId, getAllSkils }) => {
  const [data, setData] = useState(skills);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);

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
    console.log("Changed", selectedRows);
    selectedRowsHandler();
  }, [selectedRows]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedRowsHandler = () => {
    //@ts-ignore
    setSelectedRows(selectedRows);
  };

  // Changing state value when searching name

  const setTextToSearch = (textToSearch) => {
    setSearchText(textToSearch);
  };

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    console.log(skills);
    console.log(e);
    console.log(id);
    let newData = skills;
    let index = newData.findIndex((item) => item.id === id);
    console.log(index);
    // newData[index].checked = e.currentTarget.checked;
    console.log(newData);
    // setData([...newData]);
  };

  const handleSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedRows((selectedRows) => [...selectedRows, id]);
    } else {
      const array = selectedRows.filter((element) => element !== id);
      setSelectedRows(array);
    }
  };

  const addSkillToProfession = () => {
    selectedRows.map((item) => {
      _AddSkillToProfession(professionId, "skills", item)
        .then((res) => {
          getAllSkils();
        })
        .catch((err) => console.log(err));
    });
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
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockDes className="text-soft">
                <p>Please select skill to add</p>
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
                      <Button color="primary" className="btn-icon" onClick={() => addSkillToProfession()}>
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
                      <input
                        className="form-control"
                        type="text"
                        name="search"
                        placeholder="Search..."
                        onChange={(e) => setTextToSearch(e.target.value)}
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
                  <span className="sub-text"></span>
                </DataTableRow>
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
                        <DataTableRow className="nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input
                              type="checkbox"
                              className="custom-control-input form-control"
                              checked={selectedRows.includes(item.id)}
                              id={item.id}
                              onChange={(event) => handleSelect(event, item.id)}
                            />
                            <label className="custom-control-label" htmlFor={item.id}></label>
                          </div>
                        </DataTableRow>
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
      </Content>
    </React.Fragment>
  );
};
export default AddExistedSkill;
