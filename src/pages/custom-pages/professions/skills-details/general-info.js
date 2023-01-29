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

const GeneralSkillInfo = ({skillInfoData}) => {
  //   const { contextData } = useContext(UserContext)
  const [noteData, setNoteData] = useState([1, 2, 3]);
  const [skillData, setSkillData] = useState(skillInfoData);
  return (
    <React.Fragment>
      {skillData ? (
        <>
          {console.log(skillData)}
          <div className="card-inner">
            <Block>
              <BlockHead>
                <BlockTitle tag="h5">Skill Information</BlockTitle>
                <p>General information about skill</p>
              </BlockHead>
              <div className="profile-ud-list">
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">Title</span>
                    <span className="profile-ud-value">{skillData.title}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">Complexity</span>
                    <span className="profile-ud-value">{skillData.complexity}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">Hours to learn</span>
                    <span className="profile-ud-value">{skillData.hours}</span>
                  </div>
                </div>
              </div>
              <div className="profile-ud-long">
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">Description</span>
                    <span className="profile-ud-value">{skillData.description}</span>
                  </div>
                </div>
              </div>
            </Block>

            <Block>
              <BlockHead className="nk-block-head-line">
                <BlockTitle tag="h6" className="overline-title text-base">
                  Additional Hiring Information
                </BlockTitle>
              </BlockHead>
              <div className="profile-ud-list">
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">Market Needs</span>
                    <span className="profile-ud-value">Heigh</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">Trend</span>
                    <span className="profile-ud-value">Positive</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">Applications per position</span>
                    <span className="profile-ud-value">37</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">Update Date</span>
                    <span className="profile-ud-value">17.01.2023</span>
                  </div>
                </div>
              </div>
            </Block>

            <div className="nk-divider divider md"></div>

            <Block>
              <BlockHead size="sm">
                <BlockBetween>
                  <BlockTitle tag="h5">Admin Note</BlockTitle>
                  <a
                    href="#addnote"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setAddNoteModal(true);
                    }}
                    className="link link-sm"
                  >
                    + Add Note
                  </a>
                </BlockBetween>
              </BlockHead>
              <div className="bq-note">
                {noteData.map((item) => (
                  <div className="bq-note-item" key={item.id}>
                    <div className="bq-note-text">
                      <p>{item.text}</p>
                    </div>
                    <div className="bq-note-meta">
                      <span className="bq-note-added">
                        Added on <span className="date">Date</span> at <span className="time">Time PM</span>
                      </span>
                      <span className="bq-note-sep sep">|</span>
                      <span className="bq-note-by">
                        By <span>{item.company}</span>
                      </span>
                      <a
                        href="#deletenote"
                        onClick={(ev) => {
                          ev.preventDefault();
                          deleteNote(item.id);
                        }}
                        className="link link-sm link-danger"
                      >
                        Delete Note
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          </div>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
export default GeneralSkillInfo;
