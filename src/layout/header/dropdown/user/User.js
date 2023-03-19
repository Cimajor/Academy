import React, { useState, useEffect } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { useAuth } from "../../../../context/AuthContext";
import { _GetUser } from "../../../../utils/Api";
import { useAuthContext, setUserRole, useUserDispatch, setUserId } from "../../../../context/AuthContextProvider";

const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const { logout, currentUser } = useAuth();
  const userDispatch = useUserDispatch();
  const { roles } = useAuthContext();
  const [userFirstName, setUserFirestName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [userRoles, setUserRoles] = useState(roles);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    _GetUser(currentUser.uid)
      .then((res) => {
        const listOfRoles = [];
        res.forEach((doc) => {
          listOfRoles.push(doc.data().data.userData.role);
          setUserFirestName(doc.data().data.userData.firstName);
          setUserLastName(doc.data().data.userData.lastName);
          setUserEmail(doc.data().data.userData.email);
        });
        setUserRole(userDispatch, listOfRoles);
        setUserId(userDispatch, res.docs[0].id);
        // setUserRoles(listOfRoles);
      })
      .catch((err) => console.log(err));
  };

  const handleSignout = () => {
    logout();
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">{roles ? roles.map((item) => item) : "nima"}</div>
            <div className="user-name dropdown-indicator">
              {userFirstName} {userLastName}
            </div>
          </div>
        </div>
      </DropdownToggle>
      {console.log(roles)}
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">
                {userFirstName} {userLastName}
              </span>
              <span className="sub-text">{userEmail}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
