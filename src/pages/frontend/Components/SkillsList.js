import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Card, Badge, DropdownItem } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PaginationComponent,
} from "../../../components/Component";
import { Link } from "react-router-dom";
import { invoiceData } from "../../../pages/pre-built/invoice/Invoice";
import SkillsMap from "./SkillsMap"


const SkillsTable = () => {
    const [data, setData] = useState(invoiceData);
    const [onSearch, setonSearch] = useState(true);
    const [onSearchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [sort, setSortState] = useState("asc");

    let defaultData = data;


  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  
  // Sorting data
  const sortFunc = () => {
    let defaultData = data;
    if (sort === "dsc") {
      let sortedData = defaultData.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
      setData([...sortedData]);
    } else if (sort === "asc") {
      let sortedData = defaultData.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
      setData([...sortedData]);
    }
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);


    return (
    <Card className="card-bordered card-stretch skills-table">
    <div className="card-inner-group">
      <div className="card-inner">
        <div className="card-title-group">
          <div className="card-title">
            <h5 className="title">Skills List</h5>
          </div>

          <div className="card-tools mr-n1">
            <ul className="btn-toolbar">
              <li>
                <Button onClick={toggle} className="btn-icon search-toggle toggle-search">
                  <Icon name="search"></Icon>
                </Button>
              </li>
              <li className="btn-toolbar-sep"></li>
              <li>
                <UncontrolledDropdown>
                  <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                    <Icon name="setting"></Icon>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <ul className="link-check">
                      <li>
                        <span>Show</span>
                      </li>
                      <li className={itemPerPage === 10 ? "active" : ""}>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setItemPerPage(10);
                          }}
                        >
                          10
                        </DropdownItem>
                      </li>
                      <li className={itemPerPage === 15 ? "active" : ""}>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setItemPerPage(15);
                          }}
                        >
                          15
                        </DropdownItem>
                      </li>
                    </ul>
                    <ul className="link-check">
                      <li>
                        <span>Order</span>
                      </li>
                      <li className={sort === "dsc" ? "active" : ""}>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setSortState("dsc");
                            sortFunc("dsc");
                          }}
                        >
                          DESC
                        </DropdownItem>
                      </li>
                      <li className={sort === "asc" ? "active" : ""}>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setSortState("asc");
                            sortFunc("asc");
                          }}
                        >
                          ASC
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </div>
          <div className={`card-search search-wrap ${!onSearch ? "active" : ""}`}>
            <div className="search-content">
              <Button
                className="search-back btn-icon toggle-search"
                onClick={() => {
                  setSearchText("");
                  toggle();
                }}
              >
                <Icon name="arrow-left"></Icon>
              </Button>
              <input
                type="text"
                className="form-control border-transparent form-focus-none"
                placeholder="Search by Order Id"
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
      <div className="card-inner p-0">
        <table className="table table-orders">
          <thead className="tb-odr-head">
            <tr className="tb-odr-item">
              <th className="tb-odr-info">
                <span className="tb-odr-id">Skill</span>
              </th>
              <th className="tb-odr-amount">
                <span className="tb-odr-status d-none d-md-inline-block">Status</span>
              </th>
              <th className="tb-odr-action">&nbsp;</th>
            </tr>
          </thead>
          <tbody className="tb-odr-body">
            {currentItems.length > 0
              ? currentItems.map((item) => {
                  return (
                    <tr className={`tb-odr-item ${
                      item.status === "Complete"
                    ? "done-background"
                    : item.status === "Certificated"
                    ? "certificated-background"
                    : "to-do-background"}`} key={item.id}>
                      <td className="tb-odr-info">
                        <span className="tb-odr-id">
                          <Link to={`${process.env.PUBLIC_URL}/skill-details/${item.orderId}`}>
                            {item.orderId}
                          </Link>
                        </span>
                      </td>
                      <td className="tb-odr-amount">
                        <span className="tb-odr-status">
                          <Badge
                            color={
                              item.status === "Complete"
                                ? "success"
                                : item.status === "Certificated"
                                ? "warning"
                                : "danger"
                            }
                            className="badge-dot"
                          >
                            {item.status}
                          </Badge>
                        </span>
                      </td>
                      <td>
                         
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      <div className="card-inner">
        {currentItems.length > 0 ? (
          <PaginationComponent
            noDown
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
    </div>
    </Card>)
}


export default SkillsTable

